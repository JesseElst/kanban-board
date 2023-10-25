import { useCallback, useEffect, useReducer, useState } from "react";
import "./App.css";
import { Header } from "./components/header/header";
import { Login } from "./components/login/login";
import { auth, db } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  Firestore,
  collection,
  collectionGroup,
  getDoc,
  getDocs,
  query,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { Row } from "./components/row/row";
import { Action, TestContext } from "./Context";

export interface IBacklog {
  title: string;
  description: string;
  order: number;
}

export interface dataProps {
  backlog: IBacklog[];
  progress: IBacklog[];
}

const pathType = {
  backlog: ["backlog", "OROfVJt1uvtTBvcQKGqw", "item"],
  progress: ["progress", "BxSd6mnLDTSRIKmHDXL6", "item"],
};

function reducer(state: dataProps, action: Action) {
  let newState; // Declare newState variable outside the switch\
  let oldItem; // Declare newState variable outside the switch
  switch (action.type) {
    case "SET_DATA":
      return { ...state, backlog: action.backlog, progress: action.progress };
    case "ADD_TASK":
      try {
        setDoc(
          doc(
            db,
            "kanban",
            "jhk8rPxBj9X8WbzNkBfA",
            ...pathType[action.row],
            action.title
          ),
          {
            title: action.title,
            description: action.description,
            timestamp: new Date(),
          }
        );
        return {
          ...state,
          [action.row]: [
            ...state[action.row],
            { title: action.title, description: action.description },
          ],
        };
      } catch (e) {
        console.log(e);
      }
      return state;
    case "REMOVE_TASK":
      try {
        deleteDoc(
          doc(
            db,
            "kanban",
            "jhk8rPxBj9X8WbzNkBfA",
            ...pathType[action.row],
            action.title
          )
        );
      } catch (e) {
        console.log(e);
      }
      return {
        ...state,
        [action.row]: state[action.row].filter(
          (item) => item.title !== action.title
        ),
      };
    case "MOVE_TASK":
      newState = [...state[action.row]];
      oldItem = newState.splice(action.oldIndex, 1)[0];
      newState.splice(action.newIndex, 0, oldItem);
      newState = newState.map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      newState.forEach(async (item, index) => {
        try {
          await setDoc(
            doc(
              db,
              "kanban",
              "jhk8rPxBj9X8WbzNkBfA",
              ...pathType[action.row],
              item.title
            ),
            { ...item, order: index + 1 }
          );
        } catch (e) {
          console.log(e);
        }
      });

      return { ...state, [action.row]: newState };

    default:
      console.log("default");
      return state;
  }
}
const getData = async (pathLine: string[]) => {
  console.log("getData");
  const path = collection(db, "kanban", "jhk8rPxBj9X8WbzNkBfA", ...pathLine);
  const items = await getDocs(path);
  const itemCollection: IBacklog[] = items.docs.map(
    (doc) => doc.data() as IBacklog
  );
  const sortedCollection = itemCollection.sort((a, b) => a.order - b.order);
  return sortedCollection;
};

function App() {
  // const [data, setData] = useState<dataProps>({ backlog: [], progress: [] });
  const [state, dispatch] = useReducer(reducer, { backlog: [], progress: [] });
  useEffect(() => {
    console.log("useEffect");
    onAuthStateChanged(auth, (user) => {
      console.log("auth change");
      if (user?.email) {
        setUser(user.email);
      } else {
        setUser("");
      }
    });
    const fetchAll = async () => {
      const backlogPromise = getData([
        "backlog",
        "OROfVJt1uvtTBvcQKGqw",
        "item",
      ]);
      const progressPromise = getData([
        "progress",
        "BxSd6mnLDTSRIKmHDXL6",
        "item",
      ]);
      const [backlogData, progressData] = await Promise.all([
        backlogPromise,
        progressPromise,
      ]);
      dispatch({
        type: "SET_DATA",
        backlog: backlogData,
        progress: progressData,
      });
    };
    fetchAll();
  }, []);

  const [user, setUser] = useState<string>("");

  return (
    <div className="container">
      <Header email={user} />
      {!user && <Login />}

      {/* <DataContext.Provider value={{ state, dispatch }}> */}
      <TestContext.Provider value={{ dispatch }}>
        <main className="rows-container">
          <Row header="backlog" items={state.backlog} />
          <Row header="progress" items={state.progress} />
        </main>
      </TestContext.Provider>
      {/* </DataContext.Provider> */}
    </div>
  );
}

export default App;

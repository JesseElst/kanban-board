import React, { Dispatch, createContext } from "react";
import { IBacklog, dataProps } from "./App";

// export const Dispatches = {
//   setImageName: action,
//   setUser: actionPayload,
// };

export type RowTypes = "backlog" | "progress";

// Define the action types
export type Action =
  | { type: "SET_DATA"; backlog: IBacklog[]; progress: IBacklog[] }
  | { type: "ADD_TASK"; title: string; description: string; row: RowTypes }
  | { type: "TOGGLE_TASK"; id: number }
  | { type: "REMOVE_TASK"; title: string; row: RowTypes }
  | { type: "MOVE_TASK"; row: RowTypes; oldIndex: number; newIndex: number };

// Define the type for the dispatch function
// type DataDispatch = Dispatch<Action> | null;

// export const DataContext = createContext<
//   | {
//       state: dataProps;
//       dispatch: DataDispatch;
//     }
//   | undefined
// >(undefined);

export const TestContext = createContext<{
  dispatch: React.Dispatch<Action>;
}>({
  dispatch: () => null,
});

// export const DataDispatchContext = createContext(null);

import { useContext, useState } from "react";
import { DataContext, RowTypes, TestContext } from "../../Context";
import "./add-item.scss";

export const AddItem = (props: { row: RowTypes }) => {
  const { dispatch } = useContext(TestContext);
  const [title, setTitle] = useState("");
  const [addItem, setAddItem] = useState(false);
  const [description, setDescription] = useState("");

  return (
    <>
      {addItem ? (
        <div className="add-container">
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              value={title}
              placeholder="Example Title"
              onChange={(e) => setTitle(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              id="description"
              value={description}
              placeholder="Example Description"
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div>
            <button
              onClick={() => {
                // data?.dispatch({ type: "ADD_TASK", row: "testa", text: "test" })
                dispatch({
                  type: "ADD_TASK",
                  title: title,
                  description: description,
                  row: props.row,
                });
                setDescription("");
                setTitle("");
              }}
            >
              Add
            </button>
            <button onClick={() => setAddItem(false)}>Cancel</button>
          </div>
        </div>
      ) : (
        <button className="add-button" onClick={() => setAddItem(true)}>
          + Add Item
        </button>
      )}
    </>
  );
};

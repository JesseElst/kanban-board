import { useContext } from "react";
import { IBacklog } from "../../App";
import { DataContext, RowTypes, TestContext } from "../../Context";
import "./item.scss";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

interface ItemProps extends IBacklog {
  row: RowTypes;
  id: number;
}

export const Item = (props: ItemProps) => {
  const { dispatch } = useContext(TestContext);
  const { listeners, attributes, setNodeRef, transform, transition } =
    useSortable({ id: props.title, animateLayoutChanges: () => false });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div
      className="item"
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <h4> {props.title}</h4>
      <p>{props.description}</p>
      <button data-no-dnd="true">Edit</button>
      <button
        data-no-dnd="true"
        onClick={() =>
          dispatch({ type: "REMOVE_TASK", row: props.row, title: props.title })
        }
      >
        Delete
      </button>
    </div>
  );
};

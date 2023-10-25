import {
  DndContext,
  MouseSensor as LibMouseSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { IBacklog } from "../../App";
import { RowTypes, TestContext } from "../../Context";
import { AddItem } from "../add-item/add-item";
import { Item } from "../item/item";
import "./row.scss";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState, MouseEvent, useContext } from "react";

interface RowProps {
  header: RowTypes;
  items?: IBacklog[];
}

export class MouseSensor extends LibMouseSensor {
  static activators = [
    {
      eventName: "onMouseDown" as const,
      handler: ({ nativeEvent: event }: MouseEvent) => {
        return shouldHandleEvent(event.target as HTMLElement);
      },
    },
  ];
}

function shouldHandleEvent(element: HTMLElement | null) {
  let cur = element;

  while (cur) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
}

export const Row = (props: RowProps) => {
  const { header, items } = props;
  const sensor = useSensors(useSensor(MouseSensor));
  const { dispatch } = useContext(TestContext);
  return (
    <div className="row">
      <h2>{header.toLocaleLowerCase()}</h2>
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        {items && (
          <div className="items">
            {/* {items?.map((item, index) => {
     return (
       <Item
         index={index}
         title={item.title}
         description={item.description}
         row={props.header}
       />
     );
   })} */}
            <SortableContext
              items={items.map((item) => item.title)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <Item
                  id={item.order}
                  key={item.title}
                  row={header}
                  title={item.title}
                  description={item.description}
                  order={item.order}
                />
              ))}
            </SortableContext>
          </div>
        )}
      </DndContext>
      <AddItem row={header} />
    </div>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(active.id, over.id);
    if (active.id !== over.id) {
      const oldIndex = items!.findIndex((item) => item.title === active.id);
      const newIndex = items!.findIndex((item) => item.title === over.id);
      dispatch({
        type: "MOVE_TASK",
        row: header,
        oldIndex: oldIndex,
        newIndex: newIndex,
      });
    }
  }
};

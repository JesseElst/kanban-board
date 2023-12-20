import {
  DndContext,
  MouseSensor as LibMouseSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Row } from "../row/row";
import { MouseEvent, useContext } from "react";
import { TestContext } from "../../Context";

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

export const RowCollection = () => {
  const sensor = useSensors(useSensor(MouseSensor));
  const { dispatch, state } = useContext(TestContext);
  return (
    <>
      <DndContext
        sensors={sensor}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <main className="rows-container">
          <Row header="backlog" items={state.backlog} />
          <Row header="progress" items={state.progress} />
        </main>
      </DndContext>
    </>
  );

  function handleDragEnd(event) {
    const { active, over } = event;
    console.log(active.id, over.id);
    console.log(event);
    // if (active.id !== over.id) {
    //   const oldIndex = items!.findIndex((item) => item.title === active.id);
    //   const newIndex = items!.findIndex((item) => item.title === over.id);
    //   dispatch({
    //     type: "MOVE_TASK",
    //     row: header,
    //     oldIndex: oldIndex,
    //     newIndex: newIndex,
    //   });
    // }
  }
};

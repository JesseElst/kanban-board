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

export const Row = (props: RowProps) => {
  const { header, items } = props;

  const { dispatch } = useContext(TestContext);
  return (
    <div className="row">
      <h2>{header.toLocaleLowerCase()}</h2>

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
            id={header}
            // strategy={verticalListSortingStrategy}
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

      <AddItem row={header} />
    </div>
  );
};

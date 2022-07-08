import './DragAndDropTreeviewComponent.css';
import { UncontrolledTreeEnvironment, Tree, StaticTreeDataProvider } from 'react-complex-tree';
import longTree from "./jsonData.json";
import "react-complex-tree/lib/style.css";
import React, { createRef, useEffect, useState } from "react";

let unrelatedData = createRef();
let relatedData = createRef();
let itemsToExpand = getItemsToExpand(longTree);
let returnableData = new StaticTreeDataProvider(longTree, (item, data) => ({ ...item, data }));

function getItemsToExpand(treeData) {
  let items = [];
  const keys = Object.keys(treeData);

  keys.forEach((key, index) => {
    if (index > 1) {
      items[index - 2] = treeData[key].index;
    }
  });
  return items;
}

function DragAndDropTreeviewComponent(props) {

  return (
    <React.Fragment>
      <UncontrolledTreeEnvironment
        canDragAndDrop={true}
        canDropOnItemWithChildren={true}
        canReorderItems={true}
        onDrop={() => {
          // if (relatedData.current) {
          console.log(JSON.stringify(returnableData.data.items));
          // }
        }}
        dataProvider={returnableData}
        getItemTitle={(item) => item.data}
        // getItemTitle={(item) => (
        //   <span key={item.data} style={{ fontSize: "24px" }}>
        //     {item.data}
        //   </span>
        // )}
        viewState={{
          // ['tree-1']: {
          //   focusedItem: "America",
          //   selectedItems: ["America", "Europe", "Asia"],
          //   expandedItems: ["Meals", "Drinks"]
          // },
          ['tree-1']: {
            expandedItems: itemsToExpand
          },
          ['tree-2']: {
            expandedItems: itemsToExpand
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            backgroundColor: '#D8DEE9',
            justifyContent: 'space-evenly',
            alignItems: 'baseline',
            padding: '20px 0',
          }}
        >
          <div
            style={{
              width: '28%',
              backgroundColor: 'white',
            }}
          >
            <Tree ref={unrelatedData} treeId="tree-1" rootItem="unrelatedData" treeLabel="Tree 1" />
          </div>
          <div
            style={{
              width: '28%',
              backgroundColor: 'white',
            }}
          >
            <Tree ref={relatedData} treeId="tree-2" rootItem="relatedData" treeLabel="Tree 2" />
          </div>
        </div>
      </UncontrolledTreeEnvironment>
    </React.Fragment >
  )
}
// }
export default DragAndDropTreeviewComponent;

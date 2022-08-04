import "./DragAndDropTreeviewComponent.css";
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider,
} from "react-complex-tree";
import "react-complex-tree/lib/style.css";
import React, { useRef, useState, useEffect } from "react";
import { useTabsContext, Spinner, Button } from "@chakra-ui/react";

function DragAndDropTreeviewComponent({ ...props }) {
  const [itemsToExpand, setItemsToExpand] = useState([]);
  const [returnableData, setReturnableData] = useState(null);
  const { selectedIndex } = useTabsContext();
  const unrelatedData = useRef();
  const relatedData = useRef();

  // Every time our index is selected, we can make an API call to get the latest data
  // And reset our tree here in this useEffect
  useEffect(() => {
    let current = true;
    if (selectedIndex === props.index) {
      (async () => {
        // Set this to null so we can display a loading spinner and clear the previous tree state
        setReturnableData(null);
        let data = JSON.parse(window.localStorage.getItem(props.repo));

        // console.log(JSON.stringify(data));
        let keys = Object.keys(data);

        // Simulate a longer api call, sleep for 200 ms
        // await new Promise(res => setTimeout(res, 200));

        // Current checks effect frame in case multiple effects are fired so we aren't duplicating
        if (!current) {
          return;
        }

        // Previous logic to set items to expand
        // keys = Object.keys(data);
        const items = [];
        keys.forEach((key, index) => {
          if (index > 1) {
            items[index - 2] = data[key].index;
          }
        });
        setItemsToExpand(items);

        // Set our returnable data from the api call data
        setReturnableData(
          new StaticTreeDataProvider(data, (item, data) => ({
            ...item,
            data,
          }))
        );
      })();
    }

    // If this function returns, i.e. another effect of the same has fired, we set current to false since there's another
    // function about to run its course as the latest
    return () => (current = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  async function saveBranchStructure() {
    window.localStorage.setItem(
      props.repo,
      JSON.stringify(returnableData.data.items)
    );
  }

  return returnableData === null ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <UncontrolledTreeEnvironment
        canRename={false}
        canDragAndDrop={true}
        canDrop={true}
        canDropOnItemWithChildren={true}
        canDropOnItemWithoutChildren={true}
        canReorderItems={true}
        canDropAt={(items, target) => {
          // console.log("items[0] = " + JSON.stringify(items[0]));
          // console.log("items = " + JSON.stringify(items));
          // console.log("target.parentItem = " + target.parentItem);
          // console.log("target.targetType = " + target.targetType);

          if (
            (target.targetType === "item" &&
              target.parentItem === "--Empty--") ||
            (target.targetType === "between-items" &&
              (target.parentItem === "relatedData" ||
                target.parentItem === "unrelatedData")) ||
            (items[0].children.length > 0 &&
              (target.parentItem === "--Empty--" ||
                target.parentItem === "unrelatedData"))
          ) {
            return false;
          } else {
            return true;
          }
        }}
        canDrag={(items) =>
          items
            .map((item) => {
              return (
                item.data !== "BRANCH_HIERARCHY_GOES_HERE" &&
                item.data !== "BRANCHES_WITHOUT_HIERARCHY_GO_HERE"
              );
            })
            .reduce((a, b) => a && b, true)
        }
        onDrop={() => {
          // console.log(JSON.stringify(returnableData.data.items));
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
          [`tree-1-${props.index}`]: {
            expandedItems: itemsToExpand,
          },
          [`tree-2-${props.index}`]: {
            expandedItems: itemsToExpand,
          },
        }}
      >
        <div
          style={{
            display: "flex",
            backgroundColor: "#D8DEE9",
            justifyContent: "space-evenly",
            alignItems: "baseline",
            padding: "20px 0",
          }}
        >
          <div
            style={{
              width: "28%",
              backgroundColor: "white",
            }}
          >
            <Tree
              ref={unrelatedData}
              treeId={`tree-1-${props.index}`}
              rootItem="unrelatedData"
              treeLabel="Tree 1"
            />
          </div>
          <div
            style={{
              width: "28%",
              backgroundColor: "white",
            }}
          >
            <Tree
              ref={relatedData}
              treeId={`tree-2-${props.index}`}
              rootItem="relatedData"
              treeLabel="Tree 2"
            />
          </div>
        </div>
      </UncontrolledTreeEnvironment>
      <Button colorScheme="blue" onClick={saveBranchStructure}>
        Save
      </Button>
    </React.Fragment>
  );
}

export default DragAndDropTreeviewComponent;

import './DragAndDropTreeviewComponent.css'
import {
  UncontrolledTreeEnvironment,
  Tree,
  StaticTreeDataProvider
} from 'react-complex-tree'
import 'react-complex-tree/lib/style.css'
import React, { useRef, useState, useEffect } from 'react'
import { useTabsContext, Spinner } from '@chakra-ui/react'

function DragAndDropTreeviewComponent ({ index }) {
  const [itemsToExpand, setItemsToExpand] = useState([]);
  const [returnableData, setReturnableData] = useState(null);
  const { selectedIndex } = useTabsContext();

  // Every time our index is selected, we can make an API call to get the latest data
  // And reset our tree here in this useEffect
  useEffect(() => {
    let current = true
    if (selectedIndex === index) {
      (async () => {
        // Set this to null so we can display a loading spinner and clear the previous tree state
        setReturnableData(null);
        const data = await fetch('/jsonData.json').then(res => res.json());
        
        // Simulate a longer api call, sleep for 200 ms
        await new Promise(res => setTimeout(res, 200));

        // Current checks effect frame in case multiple effects are fired so we aren't duplicating 
        if (!current) {
          return;
        }

        // Previous logic to set items to expand
        const items = [];
        const keys = Object.keys(data);
        keys.forEach((key, index) => {
          if (index > 1) {
            items[index - 2] = data[key].index;
          }
        })
        setItemsToExpand(items);

        // Set our returnable data from the api call data
        setReturnableData(
          new StaticTreeDataProvider(data, (item, data) => ({
            ...item,
            data
          }))
        );
      })();
    }

    // If this function returns, i.e. another effect of the same has fired, we set current to false since there's another
    // function about to run its course as the latest
    return () => (current = false);
  }, [selectedIndex]);

  const unrelatedData = useRef();
  const relatedData = useRef();

  return returnableData === null ? <Spinner/> : (
      <UncontrolledTreeEnvironment
        canDragAndDrop={true}
        canDropOnItemWithChildren={true}
        canReorderItems={true}
        onDrop={() => {
          // if (relatedData.current) {
          console.log(JSON.stringify(returnableData.data.items))
          // }
        }}
        dataProvider={returnableData}
        getItemTitle={item => item.data}
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
          [`tree-1-${index}`]: {
            expandedItems: itemsToExpand
          },
          [`tree-2-${index}`]: {
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
            padding: '20px 0'
          }}
        >
          <div
            style={{
              width: '28%',
              backgroundColor: 'white'
            }}
          >
            <Tree
              ref={unrelatedData}
              treeId={`tree-1-${index}`}
              rootItem='unrelatedData'
              treeLabel='Tree 1'
            />
          </div>
          <div
            style={{
              width: '28%',
              backgroundColor: 'white'
            }}
          >
            <Tree
              ref={relatedData}
              treeId={`tree-2-${index}`}
              rootItem='relatedData'
              treeLabel='Tree 2'
            />
          </div>
        </div>
      </UncontrolledTreeEnvironment>
  )
}

export default DragAndDropTreeviewComponent

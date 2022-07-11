import "./RepoSidePanelComponent.css";
import React, { useEffect, useState } from "react";
import DragAndDropTreeviewComponent from "../DragAndDropTreeviewComponent/DragAndDropTreeviewComponent";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function RepoSidePanelComponent() {
  const [panelItems, setPanelItems] = useState([]);
  const [treeviews, setTreeviews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const url = "Some dummy URL";
      const res = await fetch(url).then((res) => res.json());

      let tempPanelItems = [];
      let tempTreeviews = [];
      for (let i = 0; i < res.length; i++) {
        let tab = <Tab key={res[i].id}>{res[i].name}</Tab>;
        let tabPanel = (
          <TabPanel key={res[i].id}>
            <DragAndDropTreeviewComponent
              index={i}
              repo={res[i].name}
              key={res[i].id}
            ></DragAndDropTreeviewComponent>
          </TabPanel>
        );
        tempPanelItems.push(tab);
        tempTreeviews.push(tabPanel);
      }
      setPanelItems(tempPanelItems);
      setTreeviews(tempTreeviews);
    };

    loadData();
  }, []);

  return (
    <React.Fragment>
      <Tabs variant="soft-rounded" colorScheme="blue" orientation="vertical">
        <TabList overflowY="auto" maxHeight="100vh">
          {panelItems}
        </TabList>
        <TabPanels>{treeviews}</TabPanels>
      </Tabs>
    </React.Fragment>
  );
}

export default RepoSidePanelComponent;

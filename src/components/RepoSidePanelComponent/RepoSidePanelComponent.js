import "./RepoSidePanelComponent.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DragAndDropTreeviewComponent from "../DragAndDropTreeviewComponent/DragAndDropTreeviewComponent";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function RepoSidePanelComponent() {
  const [repositories, setRepositories] = useState([]);
  const [panelItems, setPanelItems] = useState([]);
  const [treeviews, setTreeviews] = useState([]);

  useEffect(() => {
    axios.get("fake repo endpoint").then((response) => {
      setRepositories(response);
      console.log("repositories = ");
      console.log(repositories);
      let tempPanelItems = [];
      let tempTreeViews = [];
      for (let i = 0; i < repositories.length; i++) {
        let tab = <Tab key={repositories[i].id}>{repositories[i].name}</Tab>;
        let tabPanel = (
          <TabPanel key={repositories[i].id}>
            <DragAndDropTreeviewComponent
              index={i}
              repo={repositories[i].name}
              key={repositories[i].id}
            ></DragAndDropTreeviewComponent>
          </TabPanel>
        );
        tempPanelItems.push(tab);
        tempTreeViews.push(tabPanel);
      }
      console.log("thePanelItems = ");
      console.log(tempPanelItems);
      console.log("theTreeViews = ");
      console.log(tempTreeViews);
      setPanelItems(tempPanelItems);
      console.log("panelItems = ");
      console.log(panelItems);
      setTreeviews(tempTreeViews);
      console.log("treeviews = ");
      console.log(treeviews);
    });
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

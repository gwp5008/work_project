import "./RepoSidePanelComponent.css";
import React from "react";
import DragAndDropTreeviewComponent from '../DragAndDropTreeviewComponent/DragAndDropTreeviewComponent';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

let panelItems = [];
let treeviews = [];
let repositories =
  [
    {
      "id": 1,
      "repo_id": 1,
      "name": "repo1"
    },
    {
      "id": 2,
      "repo_id": 2,
      "name": "repo2"
    },
    {
      "id": 3,
      "repo_id": 3,
      "name": "repo3"
    }
  ];

function populateItemsToDisplay() {
  for (let i = 0; i < repositories.length; i++) {
    let tab = <Tab key={repositories[i].id}>{repositories[i].name}</Tab>;
    let tabPanel = <TabPanel key={repositories[i].id}>
      <DragAndDropTreeviewComponent repo={repositories[i].name} key={repositories[i].id}></DragAndDropTreeviewComponent>
    </TabPanel>;
    panelItems.push(tab);
    treeviews.push(tabPanel);
  }
}
populateItemsToDisplay();

function RepoSidePanelComponent() {
  return (
    <React.Fragment>
      <Tabs variant='soft-rounded' colorScheme='blue' orientation="vertical">
        <TabList overflowY="auto" maxHeight="100vh">
          {panelItems}
        </TabList>
        <TabPanels>
          {treeviews}
        </TabPanels>
      </Tabs>
    </React.Fragment>
  );
};

export default RepoSidePanelComponent;

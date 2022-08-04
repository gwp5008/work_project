import "./RepoSidePanelComponent.css";
import React, { useEffect, useState } from "react";
import DragAndDropTreeviewComponent from "../DragAndDropTreeviewComponent/DragAndDropTreeviewComponent";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

function RepoSidePanelComponent() {
  const [panelItems, setPanelItems] = useState([]);
  const [treeviews, setTreeviews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      window.localStorage.setItem(
        "Repos",
        JSON.stringify(await fetch("/repoData.json").then((res) => res.json()))
      );
      let res = JSON.parse(window.localStorage.getItem("Repos"));

      let tempPanelItems = [];
      let tempTreeviews = [];
      let branchesSet = false;
      console.log(res[0].name);
      if (window.localStorage.getItem(res[0].name) !== undefined) {
        branchesSet = true;
      }

      for (let i = 0; i < res.length; i++) {
        if (branchesSet === false) {
          console.log("Inside branchesSet");
          console.log("branchesSet = " + branchesSet);
          window.localStorage.setItem(
            res[i].name,
            JSON.stringify(
              await fetch("/branchData.json").then((res) => res.json())
            )
          );
        }
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

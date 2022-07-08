import './App.css';
import React from "react";
import RepoSidePanelComponent from './components/RepoSidePanelComponent/RepoSidePanelComponent';
import { ChakraProvider } from '@chakra-ui/react'

function App() {

  return (
    <React.Fragment>
      <ChakraProvider>
        <RepoSidePanelComponent></RepoSidePanelComponent>
      </ChakraProvider>
    </React.Fragment >
  )
}

export default App;

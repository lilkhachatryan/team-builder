import React from 'react';
import './App.scss';
import { PageContainer } from "./assets/styles/App.stype";
import Router from "./Router";
import {NotificationContainer} from "react-notifications";

function App() {
  return (
      <PageContainer>
          <Router />
          <NotificationContainer/>
      </PageContainer>
  );
}

export default App;

import React from "react";
import Home from "./Components/HomeDashboard/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NewUser from "./Components/AddNewUser/NewUser";
import EditUser from "./Components/EditDashboard/EditUser";
import Header from "./Components/CommonHeader/Header";

function App() {
  return (
    <div className="app">
      <Router>
        <Route path="/" component={Home} exact></Route>
        <Route path="/register" component={NewUser}></Route>
        <Route path="/edit/:id" component={EditUser}></Route>
      </Router>
    </div>
  );
}

export default App;

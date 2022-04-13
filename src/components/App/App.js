import React, { useState, useRef } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import Login from "../Login/Login"
import NotFound from "../NotFound/NotFound"
import Dashboard from "../Dashboard/Dashboard";
import useToken from "../hooks/useToken"
import Navigation from "../Navigation/Navigation";
import CreateStore from "../CreateStore/CreateStore"
import Overlay from "../Overlay/Overlay";
import CreateInventory from "../CreateInventory/CreateInventory";
import Inventory from "../Inventory/Inventory";
import Staff from "../Staff/Staff";
import StaffDetails from "../StaffDetails/StaffDetails";
import UpdateStaffDetails from "../UpdateStaffDetails/UpdateStaffDetails";
import InventoryDetails from "../InventoryDetails/InventoryDetails";
import UpdateInventoryDetails from "../UpdateInventoryDetails/UpdateInventoryDetails"
import Stores from "../Stores/Stores";
import StoreDetails from "../StoreDetails/StoreDetails";
import UpdateStoreDetails from "../UpdateStoreDetails/UpdateStoreDetails"
import Request from "../Request/Request";

function App() {
  const {token, setToken} = useToken()
 
  //Set authorization
  const [isAuthorized, setIsAuthorized] = useState(false)

  //Set logged in user Id
  const [userID, setUserID] = useState(null)

  //Toggle menu visibility
  const[menuVisible, setMenuVisible] = useState(false);

  //Logout function
  const logout = ()=>{
      sessionStorage.clear()
      setToken({
          "token": null
      });
  };
  
  //ToggleHamburger
  const toggleHamburger = ()=>{
    setMenuVisible(prevState=>{
      return !prevState
    })
  }

  //User authentication
  if(!token) {
    return (
      <Login setToken={setToken}
             setIsAuthorized = {setIsAuthorized}
             setUserID = {setUserID} />
    );
  }
  else {
    return (
      <div className="wrapper">

        <Router>
          <Navigation 
              setToken={setToken}
              toggleHamburger={toggleHamburger}
              logout={logout}
              isAuthorized = {isAuthorized} />
          <Overlay visible={menuVisible}
                  toggleHamburger={toggleHamburger}
                  logout={logout}
                  isAuthorized= {isAuthorized} />
          <Switch>
            <Route path="/" exact>
              <Dashboard  isAuthorized={isAuthorized}
                          userID={userID}
              />
            </Route>
            <Route path="/createStore">
              <CreateStore isAuthorized={isAuthorized}
                           userID={userID} 
              />
            </Route>
            <Route path="/createInventory">
              <CreateInventory isAuthorized={isAuthorized}
                               userID={userID} />
            </Route>
            <Route path="/getInventory">
              <Inventory isAuthorized={isAuthorized} />
            </Route>
            <Route path="/getStaff">
              <Staff isAuthorized={isAuthorized}
                     userID={userID} />
            </Route>
            <Route path="/staff/:id">
              <StaffDetails />
            </Route>
            <Route path="/inventory/:id">
              <InventoryDetails />
            </Route>
            <Route path="/store/:id">
              <StoreDetails />
            </Route>
            <Route path="/getStores">
              <Stores isAuthorized={isAuthorized}
                      userID={userID} />
            </Route>
            <Route path="/updateStaffDetails/:id">
              <UpdateStaffDetails />
            </Route>
            <Route path="/updateInventoryDetails/:id">
              <UpdateInventoryDetails />
            </Route>
            <Route path="/updateStoreDetails/:id">
              <UpdateStoreDetails />
            </Route>
            <Route path="/request">
              <Request />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
  
}

export default App;

import React, {useState} from "react"
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

function App() {
  const {token, setToken} = useToken()
 
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
      <Login setToken={setToken} />
    );
  }
  else {
    return (
      <div className="wrapper">

        <Router>
          <Navigation 
              setToken={setToken}
              toggleHamburger={toggleHamburger}
              logout={logout} />
          <Overlay visible={menuVisible}
                  toggleHamburger={toggleHamburger}
                  logout={logout} />
          <Switch>
            <Route path="/" exact>
              <Dashboard />
            </Route>
            <Route path="/createStore">
              <CreateStore />
            </Route>
            <Route path="/createInventory">
              <CreateInventory />
            </Route>
            <Route path="/getInventory">
              <Inventory />
            </Route>
            <Route path="/getStaff">
              <Staff />
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
              <Stores />
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

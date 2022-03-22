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

function App() {
  const {token, setToken} = useToken()

  //logout function
  const logout = ()=>{
      sessionStorage.clear()
      setToken({
          "token": null
      });
  };

  //toggle menu visibility
  const[menuVisible, setMenuVisible] = useState(false);
  
  //toggleHamburger
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

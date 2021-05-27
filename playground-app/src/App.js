import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Dashboard from './components/Dashboard'
import HostEvent from './components/HostEvent'
import EventDetails from './components/EventDetails'
import NotFound from './components/NotFound'

function App() {
  
  const NavRoute = ({ exact, path, component: Component }) => (
    <Route exact={exact} path={path} render={(props) => (
      <div>
        <Navbar />
        <Component {...props} />
      </div>
    )} />
  )

  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Switch>
          <NavRoute path="/" exact component={Dashboard} />
          <NavRoute path="/host-an-event" exact component={HostEvent} />
          <NavRoute path="/:category/:id" exact component={EventDetails} />
          <NavRoute path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  )
}

export default App
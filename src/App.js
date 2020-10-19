import React from 'react';
import './App.css';
import Header from './components/Header/Header'
import Login from './components/Login/Login'
import{BrowserRouter as Router,Route,Link,Switch,Redirect,IndexRoute } from 'react-router-dom'
import routes from './router/router'

class App extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
    if(!window.sessionStorage.length){

    }
  }
  render() {
    return(
      <Router>
      <Switch>
        <Route path='/header' component={Header} />
        <Route path='/login' component={Login} />
        <Route path='/' exact render={()=>(
          window.sessionStorage.length === 0?(
            <Redirect to='/login' />
          ):(
            <Redirect to='/header' />
          )
        )} />
      </Switch>
    </Router>
    )
  }
}

export default App;

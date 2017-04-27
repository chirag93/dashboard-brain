import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore, routerReducer} from 'react-router-redux';

import Home from './pages/Home/Home';
import Login from './pages/Login/login';
import MainProjects from './pages/projects/MainProjectList'
import SelectProjects from './pages/projects/ProjectSelect'
import projectInfo from './pages/projects/ProjectInfo';
import mainProjSelect from './pages/projects/MainProjSelect';
import subProjectSelect from './pages/projects/SubprojectSelect';
import editProjectPage from  './pages/projects/EditProjectPage';
import CreateProject from './pages/projects/CreateProjectPage';
import CreateContact from  './pages/contacts/CreateContactPage';

import reducers from './redux/reducers';
import './index.css';
import Api from './utils/Api';


// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  })
);



function requireAuth(nextState,replace){
 
  Api.get('/user').then((user) => {
        console.log("value of user got ");
        console.log(user);
     
    }).catch((err) => {
      console.log("in the catch blacck")
      browserHistory.push('/login')
    //   replace({
    //   pathname: '/login'
    // });
      //this.popupError(err.err.message);
    });
    
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Home} onEnter={requireAuth}/>
      <Route path='/login' component={Login} />
      <Route path='/mainprojects' component={MainProjects} onEnter={requireAuth}/>
      <Route path='/select' component={SelectProjects} onEnter={requireAuth}/>
      <Route path='/project' component={projectInfo} onEnter={requireAuth}/>
      <Route path='/selectMain' component={mainProjSelect} onEnter={requireAuth}/>
      <Route path='/select-subProject' component={subProjectSelect} onEnter={requireAuth}/>
      <Route path='/editProject' component={editProjectPage} onEnter={requireAuth}/>
       <Route path='/createProject' component={CreateProject} onEnter={requireAuth}/>
       <Route path='/createContact' component={CreateContact} onEnter={requireAuth}/>

    </Router>
  </Provider>,
  document.getElementById('root')
);


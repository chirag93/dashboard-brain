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
        
     
    }).catch((err) => {
      
      //this.popupError(err.err.message);
    });
    replace({
      pathname: '/login'
    })
}

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Home} />
      <Route path='/login' component={Login} />
      <Route path='/mainprojects' component={MainProjects}/>
      <Route path='/select' component={SelectProjects}/>
      <Route path='/project' component={projectInfo}/>
      <Route path='/selectMain' component={mainProjSelect}/>
      <Route path='/select-subProject' component={subProjectSelect}/>
      <Route path='/editProject' component={editProjectPage}/>
       <Route path='/createProject' component={CreateProject}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);


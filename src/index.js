import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import functionTask from './reducers';
import registerServiceWorker from './registerServiceWorker';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = (state = {}, action) => {
    return {
        tasks: functionTask(state.tasks, action),
        //projects: projectsReducer(state.projects, action),
    };
};

function storeWrapper(store) {
    return function middleWareWrapper(next) {
        return function handleAction(action) {

        }
    }
}

const myStore = createStore(functionTask, composeWithDevTools(applyMiddleware(thunk)));

console.log("2. STORE CREATED PAGE", myStore);


ReactDOM.render(
    <Provider store={myStore}>
        <App />
    </Provider>, document.getElementById('root')
);

registerServiceWorker();



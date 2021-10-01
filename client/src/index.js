//Connects react application to index.html file
import  React  from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';

//Redux implementation provider holds store.
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';



const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
    <App/>,

    //connects to div with element of root.
    document.getElementById('root')
);
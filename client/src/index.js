//Connects react application to index.html file
import  React  from 'react';
import  ReactDOM  from 'react-dom';
import App from './App';

ReactDOM.render(
    <App/>,

    //connects to div with element of root.
    document.getElementById('root')
);
import React from "react";
import {Container} from "@material-ui/core";
//Make our app multi-page using react-router-dom
import {BrowserRouter, Switch, Route} from 'react-router-dom';

//User-Defined Components used in this app
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";


const App = () => {
    return (
        //Container centers everything with max width of large.
        <BrowserRouter>

            <Container maxwidth="lg">
                <Navbar/>
                
                <Switch>
                    <Route path="/" exact component={Home}/>
                    <Route path="/auth" exact component={Auth}/>
                </Switch>

            </Container>

        </BrowserRouter>

    );
}

export default App
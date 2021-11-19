import React from "react";
//Components used in this app
import {Container} from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from './components/PostDetails/PostDetails';

//<Route path="/posts/:id" component={PostDetails}/> stopped at 18:28
const App = () => {
    return (
        //Container centers everything with max width of large.

        <BrowserRouter>

            <Container maxwidth="xl">
                <Navbar/>

                <Switch>
                    <Route path="/" exact component={() => <Redirect to="/posts"/>}/>
                    <Route path="/posts" exact component={Home}/>
                    <Route path="/posts/search" exact component={Home}/>
                    <Route path="/posts/:id" component={PostDetails}/>
                    <Route path="/auth" exact component={Auth}/>
                </Switch>

            </Container>

        </BrowserRouter>
    );

}

export default App
import React, {useState,useEffect} from "react";
//Components used in this app
import {Container, Grow, Grid} from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

//Importing Logo
//import furnitureExchange from "./images/furnitureExchange.png";

//Importing user-created Components
//import Form from "./components/Form/Form";
//import Posts from "./components/Posts/Posts";

//importing styles with materialUI
import useStyles from "./styles";

//redux hooks allows us to dispatch an action
import { useDispatch } from "react-redux";

//actions
import {getPosts} from './actions/posts'
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(()=> {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    
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
import React, {useState,useEffect} from "react";
//Components used in this app
import {Container, Grow, Grid} from "@material-ui/core";

//Importing Logo
//import furnitureExchange from "./images/furnitureExchange.png";

//Importing user-created Components
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";

//importing styles with materialUI
import useStyles from "./styles";

//redux hooks allows us to dispatch an action
import { useDispatch } from "react-redux";

//actions
import {getPosts} from './actions/posts'
import Navbar from "./components/Navbar/Navbar";
const App = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(()=> {
        dispatch(getPosts());
    }, [currentId, dispatch]);
    
    return (
        //Container centers everything with max width of large.
        <Container maxwidth="lg">

            <Navbar/>
            
            <Grow in>
                <Container>
                    <Grid className={classes.mainContainer} container  justifyContent="space-between" alignItems="stretch" spacing={3}>
                        <Grid item xs={12} sm={7}> 
                            <Posts setCurrentId={setCurrentId}/>
                        </Grid>

                        <Grid item xs={12} sm={4}> 
                            <Form currentId={currentId} setCurrentId={setCurrentId}/>
                        </Grid>
                    </Grid>
                </Container>
            </Grow>

        </Container>
    );
}

export default App
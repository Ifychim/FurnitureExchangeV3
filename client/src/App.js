import React from "react";
//Components used in this app
import {Container, AppBar, Typography, Grow, Grid} from "@material-ui/core";

//Importing Logo
import furnitureExchange from "./images/furnitureExchange.png";

//Importing Posts and Form Component
import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";

const App = () => {
    return (
        //Container centers everything with max width of large.
        <Container maxwidth="lg">
            <AppBar position = "static" color="inherit">
                <Typography variant="h2" align="center">
                    Furniture Exchange
                </Typography>
                <img src={furnitureExchange} alt="furnitureExchange" height="60"/>
            </AppBar>


            
            <Grow in>
                <Container>
                    <Grid container justify="space-between" alignItems="stretch" spacing="3">
                        <Grid item xs={12} sm={7}> 
                            <Posts/>
                        </Grid>

                        <Grid item xs={12} sm={4}> 
                            <Form />
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
        </Container>
    );
}

export default App
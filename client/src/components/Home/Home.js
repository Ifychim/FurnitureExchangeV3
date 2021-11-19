import React, {useState,useEffect} from 'react';
//Components used in this app
import { Container, Grow, Grid, Paper } from '@material-ui/core';

//Importing user-created Components
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
//redux hooks allows us to dispatch an action
import { useDispatch } from "react-redux";
//actions
import {getPosts} from '../../actions/posts';



const Home = () => {

    const dispatch = useDispatch();
    const [currentId, setCurrentId] = useState(null);

    useEffect(()=> {
        dispatch(getPosts());
    }, [currentId, dispatch]);

    return  (
        <Grow in>
        <Container>
            <Grid  container  justifyContent="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={7}> 
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>

                <Grid item xs={12} sm={4}> 
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={6}>
                        <Pagination/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
        </Grow>
    );
};



export default Home;
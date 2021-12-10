import React, {useState,useEffect} from 'react';
//Components used in this app
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import {useHistory, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';

//Importing user-created Components
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Pagination';
//redux hooks allows us to dispatch an action
import { useDispatch } from "react-redux";
//actions
import {getPosts, getPostsBySearch} from '../../actions/posts';

import useStyles from './styles'

//Setting up url search parameters
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {

    //hooks
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();

    //states
    const [currentId, setCurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    //use effect hook triggers once all components are rendered on front-end
    
    /*useEffect(()=> {
        dispatch(getPosts());
        //dispatch(getPostsBySearch());
    }, [currentId, dispatch]);
    no longer fetching page from home*/ 

    const searchPost = () => {
        if(search.trim() || tags) {
            //dispatch some logic if we have a serach term -> fetch search post. Must tell database to only return post that matches our query
            //a search query can either be for furniture or by tags. if its by tags, we must transform array based data to string data using join() method.
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));

            //Retuns page that matches data that matches search input
            history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        }else{
           history.push('/');
           
        }
    };

    const handleKeyPress = (e) => {
        if(e.keyCode === 13){
            //search for the post if key code === enter key
            searchPost();
        }
    };

    //return the current state of tags + append new tag
    const handleAdd = (tag) => setTags([...tags, tag]); 

     //return the current state of tags + filter from tags array the tag to delete
    const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete)); 

    return  (
        <Grow in>
        <Container maxWidth="xl">
            <Grid  container  justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>

                <Grid item xs={12} sm={6} md={9}> 
                    <Posts setCurrentId={setCurrentId}/>
                </Grid>

                <Grid item xs={12} sm={6} md={3}> 
                    <AppBar className={classes.appBarSearch} position="static" color="inherit">
                        <TextField 
                            name="search"  
                            variant="outlined" 
                            label="Search by Furniture Name"
                            onKeyPress={handleKeyPress}
                            fullWidth
                            value={search}
                            onChange = {(e)=> setSearch(e.target.value)}
                        />
                    <ChipInput 
                        style={{margin: '10px 0'}}
                        value={tags}
                        onAdd={handleAdd}
                        onDelete={handleDelete}
                        label="Search by Tag"
                        variant="outlined"
                    />
                    <Button onClick={searchPost} className={classes.searchButton} color="primary" variant="contained">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    <Paper elevation={6}>
                        <Pagination page={page} />
                    </Paper>
                </Grid>

                

            </Grid>
        </Container>
        </Grow>
    );
};



export default Home;
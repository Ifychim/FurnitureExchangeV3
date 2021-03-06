//Multiple Posts
import React  from "react";
import {useSelector} from "react-redux";
import Post from "./Post/Post";

//styles
import {Grid, CircularProgress} from '@material-ui/core';

import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
    //const classes = useStyles();
    //WE WERE USING AN OBJECTTTTT!!!!!!
    const {posts, isLoading} = useSelector((state) => state.posts);
    const classes = useStyles();
    
    //if no posts in array, or if we are not loading, return no posts
    if(!posts.length && !isLoading) return "No posts on current page";
    //Structing grid layout for posts. If there is no posts, return circular progress (spinner) else, return grid layout of our posts
    return (
        isLoading? <CircularProgress/> : (
            <Grid className ={classes.container} container alignItems="stretch" spacing={3} >
                {
                    posts.map((post)=>(
                        <Grid key={post._id} item xs={12} sm={12} md={6} lg={4}>
                            <Post post={post} setCurrentId={setCurrentId}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;
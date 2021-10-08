//Multiple Posts
import React  from "react";
import {useSelector} from "react-redux";
import Post from "./Post/Post";

//styles
import {Grid, CircularProgress} from '@material-ui/core';

import useStyles from "./styles";

const Posts = () => {
    //const classes = useStyles();
    const posts = useSelector((state)=> state.posts);
    const classes = useStyles();
    
    //Structing grid layout for posts. If there is no posts, return circular progress (spinner) else, return grid layout of our posts
    return (
        !posts.length ? <CircularProgress/> : (
            <Grid className ={classes.container} container alignItems="stretch" spacing={3} >
                {
                    posts.map((post)=>(
                        <Grid key={post.id} item xs={12} sm={6}>
                            <Post post={post}/>
                        </Grid>
                    ))
                }
            </Grid>
        )
    );
}

export default Posts;
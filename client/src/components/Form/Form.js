import React, {useState, useEffect}  from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import {useDispatch, useSelector} from "react-redux";
//importing styles
import useStyles from "./styles";

import {createPost, updatePost} from '../../actions/posts';

//Get the current ID
const Form = ({currentId, setCurrentId}) => {

    //State of form
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });
    const user = JSON.parse(localStorage.getItem('profile'));

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const classes = useStyles();
    const dispatch = useDispatch();

    
    //useEffect takes in 2 params, callback function and a dependency array(dictates when the function should be ran.)
    useEffect(() =>{
        if(post){
            setPostData(post);
        }
    }, [post])

    //Once user submits, we want to send a post request with all the data user typed in.
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
            clear();
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name }));
            clear();
        }
    };


    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }
    
    //If user is not logged in, show a card that shows you cant create post.
    if(!user?.result?.name){
        return(
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign in to be able to post Furniture and Exchange Furniture.
                </Typography>
            </Paper>
        )
    }
    return (
        //div with white-ish background
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Editing' : 'Create'} Furniture Post
                </Typography>

                <TextField 
                    name="title" 
                    variant="outlined" 
                    label="Title" 
                    fullWidth
                    value={postData.title} //value stored in state, whole data stored in post data
                    onChange={(e) => setPostData({...postData, title: e.target.value})}
                />

                <TextField 
                    name="message" 
                    variant="outlined" 
                    label="Message" 
                    fullWidth
                    value={postData.message} //value stored in state, whole data stored in post data
                    onChange={(e) => setPostData({...postData, message: e.target.value})}
                />
                
                <TextField 
                    name="tags" 
                    variant="outlined" 
                    label="Tags" 
                    fullWidth
                    value={postData.tags} //value stored in state, whole data stored in post data
                    onChange={(e) => setPostData({...postData, tags: e.target.value.split(',')})}
                />

                <div className={classes.fileInput}>
                    <FileBase 
                        type = "file"
                        multiple={false}
                        onDone={({base64}) => setPostData({...postData, selectedFile: base64})}
                    />
                </div>
                
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
                    Submit
                </Button>
                
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
                    Clear
                </Button>
            </form>
        </Paper>
    );
}

export default Form;
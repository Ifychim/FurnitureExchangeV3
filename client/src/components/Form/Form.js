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
        creator: '',
        tags: '',
        selectedFile: ''
    });

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
    const handleSubmit = (e) => {

        //prevents browser from refreshing.
        e.preventDefault();
        
        //logic to create a new post vs update an existing post. 
        if(currentId){
            dispatch(updatePost(currentId, postData));

        }else{
            dispatch(createPost(postData));
        }
        clear();
        

    }

    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            creator: '',
            tags: '',
            selectedFile: ''
        });
    }

    return (
        //div with white-ish background
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">
                    {currentId ? 'Editing' : 'Create'} Furniture Post
                </Typography>
                <TextField 
                    name="creator" 
                    variant="outlined" 
                    label="Creator" 
                    fullWidth
                    value={postData.creator} //value stored in state, whole data stored in post data
                    onChange={(e) => setPostData({...postData, creator: e.target.value})}
                />

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
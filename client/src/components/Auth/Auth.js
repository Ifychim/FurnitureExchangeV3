import React, {useState} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import Input from './Input';
import Icon from './Icon';
import {useDispatch} from "react-redux";
import { useHistory } from 'react-router-dom';

import {GoogleLogin} from 'react-google-login';

//Stopped at 1 hr
const Auth = () => {
    //const state = null;
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState();
    const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const history = useHistory();
    
    const handleSubmit = () => {

    };

    const handleChange = () => {

    };

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
        handleShowPassword(false);

    };

    const googleSuccess = async (res) => {
        // "?."doesnt throw an error if res object doesnt exist. the res object is just the response for when a user signs in on the front end with google.
        //need to get token and result from res
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}});
            history.push('/');
          
        } catch (error) {
            console.log(error)
        }
    };

    const googleFailure = () => {
      
        console.log("Google Sign In was unsuccessful. Try Again later");
    };

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>

                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>

                <Typography variant="h5">{isSignup ? 'Sign Up': 'Sign In'}</Typography>

                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignup && (
                                <> 
                                    <Input name="firstName" label="First Name" handleChange={handleChange} half/> 
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half/>  
                                </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>

                        {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
                    </Grid>



                    <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>

                    <GoogleLogin
                        clientId="586953797693-kgjn6i40vtjue1d9i1jgteeo1cqnssql.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} color="primary" 
                                fullWidth onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon/>} 
                                variant="contained"> 
                                Google Sign In
                            </Button>
                        )}
                        
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />

                    <Grid container justify="flex-end">
                        <Grid item> 
                               <Button onClick={switchMode}>
                                    {isSignup ? "Already have an account? Sign In": "Don't have an account? Sign Up"}  
                                </Button> 
                        </Grid>
                    </Grid>
                </form>

            </Paper>
        </Container>
    )
};

export default Auth;

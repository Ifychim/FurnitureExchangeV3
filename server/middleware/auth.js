import jwt, { decode } from 'jsonwebtoken';

//wants to like a post steps
//clicks like button => auth middleware (to confirm/deny the request to like a post) if middle ware returns next() then we call like controller. We use middle ware in routes.

const auth = async (req,res,next) => {

    try {
        //see if the user is really who he claims to be. we do this by utilizing the token
        const token = req.headers.authorizaton.split(" ")[1];
        const isCustomAuth = token.length < 500;

        //data we want to get from the token
        let decodedData;

        if(token && isCustomAuth){
            //gives data from each specific token, user name and id. secret has to be same as initial creation.
            decodedData = jwt.verify(token, 'test');
            
            //Optional chaining 
            req.userId = decodedData?.id;

        }else {
            //getting google auth
            decodedData = jwt.decode(token);

            req.userId = decodedData?.sub;
        }

        next();
    } catch (error) {
        
    }
};

export default auth;
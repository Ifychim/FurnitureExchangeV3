//a reducer is a function that accepts state and action. based on the action type, do some logic, return action or state.
 export default (posts = [], action) => {
     
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload; 
        case 'CREATE':
            return [...posts, action.payload]; //spread post data and add a new post.
        case 'UPDATE':
        case 'LIKE':
            //Map returns an array. We check if the post id is equal to the payload id. If it is, we return the payload, else return the post as it is. 
            //Action.payload == newlyupdated post.
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'DELETE':
            //Filter out the post that is deleted.
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;

    }
}
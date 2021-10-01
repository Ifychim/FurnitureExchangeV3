//a reducer is a function that accepts state and action. based on the action type, do some logic, return action or state.
 export default (posts = [], action) => {
     
    switch(action.type) {
        case 'FETCH_ALL':
            return action.payload; 
        case 'CREATE':
            return [...posts, action.payload]; //spread post data and add a new post.
        default:
            return posts;

    }
}
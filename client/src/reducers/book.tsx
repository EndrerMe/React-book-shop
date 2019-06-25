export function books(state = [], action: any): Object {
    switch(action.type) {        
        case "BOOKS_FETCH_DATA_SUCCESS":
            return action.books;
        default:
            return state; 
    }
}
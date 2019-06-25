export function books(state = [], action: any) {
    switch(action.type) {        
        case "BOOKS_FETCH_DATA_SUCCESS":
            return action.books;
        default:
            return state; 
    }
}
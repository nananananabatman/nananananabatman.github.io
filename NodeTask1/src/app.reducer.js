const blogReducer = (state = {blog: [], textMask: '', user: null, message: ''}, action) => {
    switch (action.type) {
    case 'CLEAR_ERROR':
        return {
            ...state,
            message: ''
        };
        break;
    case 'CHANGE_TEXT_MASK':
        return {
            ...state,
            textMask: action.textMask
        };
        break;
    case 'ERROR':
        return {
            ...state,
            message: action.message
        };
        break;
    case 'LOGIN':
        return {
            ...state,
            user: action.user
        };
        break;
    case 'LOGOUT':
        return {
            ...state,
            user: null
        };
        break;
    case 'UPDATE':
        return {
            ...state,
            blog: action.blog
        };
        break;
    default:
        return state
    }
}

export default blogReducer

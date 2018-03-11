const blogReducer = (state = {blog: [], textMask: '', user: null}, action) => {

  console.log( '_time редуктор вызван с состоянием', state, 'и действием', action );

    switch (action.type) {
    case 'CHANGE_TEXT_MASK':
        return {
            ...state,
            textMask: action.textMask
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

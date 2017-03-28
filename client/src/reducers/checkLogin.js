export default function checkLoginReducer(state = {}, action) {
    switch (action.type) {
        case 'AUTH_GOOD':
            return action.user;
        case 'LOGIN_SUCCECCED':
            return action.user || {};
        case 'LOGOUT_SUCCECCED':
            return {};
        default:
            return state;
    }
}
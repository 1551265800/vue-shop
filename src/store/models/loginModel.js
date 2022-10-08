export default {
    namespaced: true,
    state: {
        username: "",
        token:""
    },
    mutations: {
        updataUsername(state, username) {
            state.username = username
        },
        clearUsername(state) {
            state.username = ""
        },
        updataToken(state, token) {
            state.token = token
        },
        clearToken(state) {
            state.token = ""
        },
    }
}
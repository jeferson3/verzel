export const data = {
    loading: false,
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') ?? '') : {
        id: undefined,
        name: undefined,
        email: undefined
    },
    token: localStorage.getItem('token') ?? ""
}
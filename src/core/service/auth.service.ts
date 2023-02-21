import { makeAutoObservable } from "mobx";

class AuthService {

    private storage_name:string='auth'

    private access_token:string=''

    constructor() {
        makeAutoObservable(this)
    }

    isAuth() {
        const data = localStorage.getItem(this.storage_name)
        const auth = data ? JSON.parse(data) : {access_token:''}
        if (auth && auth.access_token) {
            this.setAccessToken(auth)
        }
    }

    setAccessToken(access_token:string) {
        this.access_token = access_token
    }

    getAccessToken() {
        return this.access_token
    }

    signIn(access_token:string) {
        localStorage.setItem(this.storage_name, JSON.stringify({
            access_token:access_token
        }))
        this.setAccessToken(access_token)
    }

    signOut() {
        localStorage.removeItem(this.storage_name)
        this.setAccessToken('')
    }

}

export default AuthService
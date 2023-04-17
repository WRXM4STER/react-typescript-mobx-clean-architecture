import { makeAutoObservable } from "mobx";

export class AuthService {

    private storage_name:string='auth'

    private access_token:string=''

    constructor() {
        makeAutoObservable(this)
    }

    isAuth() {
        return this.access_token
    }

    setAuth() {
        const data = localStorage.getItem(this.storage_name)
        const auth = data ? JSON.parse(data) : {access_token:''}
        if (auth && auth.access_token) {
            this.access_token = auth.access_token
        }
    }

    signIn(access_token:string) {
        localStorage.setItem(this.storage_name, JSON.stringify({
            access_token:access_token
        }))
        this.access_token = access_token
    }

    signOut() {
        localStorage.removeItem(this.storage_name)
        this.access_token = ''
    }

}
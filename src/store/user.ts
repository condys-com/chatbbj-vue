import {defineStore} from 'pinia'
import {reactive} from "vue";

export function getCookie(name: any) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export const useUserStore = defineStore('user', {
    state() {
        return {
            userData: reactive({
                username: <string>getCookie('username'),
                email: <string>getCookie('email'),
                password: <string>getCookie('password'),
                token: <string>getCookie('token')
            })
        }
    },
    actions: {
        updateUserData() {
            this.userData.username = <string>getCookie('username');
            this.userData.token = <string>getCookie('token');
            this.userData.password = <string>getCookie('password');
            this.userData.email = <string>getCookie('email');
        }
    }
})
import {createRouter, createWebHashHistory} from "vue-router";
import Login from "../components/Login.vue";
import Signup from "../components/Signup.vue";
import Home from "../components/Home.vue";
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component:Home
        },
        {
            path: "/login",
            name: "Login",
            component:Login
        },
        {
            path: "/signup",
            name: "Signup",
            component:Signup
        }
    ]
})
export default router;
<script setup lang="ts">
import axios from "axios";
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import {reactive, ref} from "vue";
import router from "../router";
import {useUserStore} from "../store/user.ts";

let username = ref(useUserStore().userData.username);
let password = ref(useUserStore().userData.password);
let loginUserData = reactive({username, password});

function getCookie(name: any) {
  let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function login() {
  axios.post('https://www.condys.com/api/login/', loginUserData)
      .then((response: any) => {
        console.log('Login successful', response);
        console.log(getCookie('username'));
        console.log('username.value:' + username.value);
        document.cookie = `token=${response.data.token}; path=/; max-age=31536000;}`
        document.cookie = `username=${username.value}; path=/; max-age=31536000;}`
        document.cookie = `password=${password.value}; path=/; max-age=31536000;}`
        useUserStore().updateUserData();
        console.log(getCookie('username'));
        router.push('/');
      })
      .catch((error: any) => {
        console.error('Error on login', error);

      });
}
</script>

<template>
  <Header/>
  <div id="login">
    <h2>登录</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="username">用户名:</label>
        <input type="text" id="username" v-model="username" required>
      </div>
      <div class="form-group">
        <label for="password">密码:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  <Footer/>
</template>

<style scoped>
#login {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 400px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20% auto;
}

#login h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
<script setup lang="ts">
import Footer from "./Footer.vue";
import Header from "./Header.vue";
import axios from "axios";
import router from "../router";
import {useUserStore} from "../store/user.ts";

let userData = useUserStore().userData;

async function onSubmit() {
  try {
    const response = await axios.post('https://www.condys.com/api/register/', userData);
    console.log('注册成功：', response.data);
    await router.push('/')
  } catch (error: any) {
    console.error('注册失败：', error.response.data)
  }
}
</script>

<template>
  <Header/>
  <div class="signup-form">
    <h2>注册</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label for="username">用户名</label>
        <input v-model="userData.username" type="text" id="username" required>
      </div>
      <div class="form-group">
        <label for="email">电子邮箱</label>
        <input v-model="userData.email" type="email" id="email" required>
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input v-model="userData.password" type="password" id="password" required>
      </div>
      <button type="submit">提交</button>
    </form>
  </div>
  <Footer/>
</template>

<style scoped>
.signup-form {
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

.signup-form h2 {
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

/* 输入框样式 */
.signup-form input[type="text"],
.signup-form input[type="email"],
.signup-form input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.signup-form input[type="text"]:focus,
.signup-form input[type="email"]:focus,
.signup-form input[type="password"]:focus {
  border-color: #007bff;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

button {
  width: 100%;
  padding: 10px;
  border: 0;
  border-radius: 4px;
  background-color: #5cb85c;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  outline: none;
  border: none;
}

button:hover {
  background-color: #4cae4c;
}

.form-group input[type="text"]:hover,
.form-group input[type="email"]:hover,
.form-group input[type="password"]:hover {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
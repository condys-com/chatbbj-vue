<script setup lang="ts">
import {useUserStore} from "../store/user.ts";
import {RouterLink} from "vue-router";

let username = useUserStore().userData.username;
</script>

<template>
  <div class="header">
    <div class="header-left">
      <a href="https://www.condys.com/">
        <img src="/favicon.ico" alt="Logo" class="logo"/>
      </a>
      <h2>ChatBBJ</h2>
    </div>
    <div class="header-right">
      <RouterLink class="router-link" to="/login">登录</RouterLink>
      <RouterLink class="router-link" to="/signup">注册</RouterLink>
      <div class="welcome">
        <h3>Hi,{{ username }}!</h3>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: #f8f8f7;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header .header-left {
  display: flex;
  align-items: center;
}

.header .header-left .logo {
  height: 50px;
  margin-left: 1rem;
  margin-right: 1rem;
}

.header .header-right {
  display: flex;
  align-items: center;
}

.header .router-link {
  padding: 0.5rem 1rem; /* 添加内边距 */
  text-decoration: none; /* 移除链接下划线 */
  color: black; /* 文本颜色 */
  font-weight: bold; /* 字体加粗 */
  background-color: #f1efe7; /* 背景颜色 */
  border-radius: 1rem; /* 圆角 */
  transition: background-color 0.3s; /* 背景色渐变效果 */
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}

.header .router-link:hover {
  background-color: #77ccc8; /* 鼠标悬停时背景色变深 */
  text-decoration: none; /* 移除链接鼠标悬停时的下划线 */
  cursor: pointer; /* 鼠标悬停时显示手型指针 */
}

.header .welcome {
  display: flex;
  align-items: center;
  margin-right: 2rem;
  margin-left: 2rem;
}
</style>
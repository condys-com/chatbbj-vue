<template>
  <div id="app">
    <div id="header">
      <img src="/favicon.ico" alt="Logo" id="logo"/>
      <h1>ChatBBJ</h1>
    </div>
    <div id="main">
      <div id="messageContainer" ref="messageContainer">
        <div class="messageCard" v-for="(message, index) in messages" :key="index"
             :class="{'user': message.user, 'bot': !message.user}">
          <div class="avatar">
            <img v-if="message.user" :src="userAvatarUrl" alt="User Avatar" style="height: 25px; width: 25px;"/>
            <img v-else :src="botAvatarUrl" alt="Bot Avatar" style="height: 25px; width: 25px;"/>
          </div>
          <div class="message" :class="{'user': message.user, 'bot': !message.user}">
            {{ message.content }}
          </div>
        </div>
      </div>
      <div class="combine">
        <button @click="clearHistory" id="deleteButton">
          <img src="/delete.png" alt="Clear History" style="height: 25px; width: 25px;"/>
        </button>
        <div id="messageInput">
          <input v-model="input" placeholder="Type a message..." @keyup.enter="sendMessage"></input>
          <button @click="sendMessage">
            <img src="/send.png" alt="Send Message" style="height: 30px; width: 30px;"/>
          </button>
        </div>
      </div>
    </div>
    <div id="footer">
      Copyright © 2023-2024 condys.com All Rights Reserved.
      <a href="https://beian.miit.gov.cn/" target="_blank">&nbsp;陕ICP备2024028402号-1</a>
    </div>
  </div>
</template>

<script setup>
import {nextTick, ref} from 'vue';
import axios from "axios";

let messages = ref([]);
let input = ref('');
let userAvatarUrl = ref('/user.png');
let botAvatarUrl = ref('/favicon.ico');
let response = ref(true);

function pushMessage(user, content) {
  messages.value.push({user: user, content: content});
  // setTimeout(() => {
  nextTick(() => {
    const messagesContainer = document.querySelector('#messageContainer');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  })
  // }, 1000)
}

function processResponse(res) {
  response.value = true;
  input.value = '';
  if (res.data && res.data.length > 0 && res.data[0].hasOwnProperty('text')) {
    setTimeout(() =>
        pushMessage(false, res.data[0].text
        ), 1000)
  } else {
    pushMessage(false, "服务器响应数据解析错误");
  }
  console.log(res.data[0]);
}

// function storeMessage(user, content) {
//   axios.post('/api/add_message', {"user": user, "content": content})
//       .then((res) => {
//         processResponse(res)
//       })
//       .catch((err) => {
//
//       })
// }

function sendMessage() {
  if (input.value.trim() === '') {
    return;
  }
  pushMessage(true, input.value);
  axios.post('http://localhost:5005/webhooks/rest/webhook', {
    "sender": Math.random().toString(),
    "message": input.value
  }).then((res) => {
    processResponse(res);
  }).catch((err) => {
    pushMessage(false, "服务器无响应...可能的原因：1、服务器未启动 2、服务器未正确配置CORS");
    console.log(err);
  })
}

function clearHistory() {
  messages.value = [];
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #f1efe7;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

#header {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 10px;
  background: #f8f8f7;
  border-bottom: 1px solid #e1e1e1;
}

#logo {
  height: 50px;
  margin-right: 20px;
  margin-left: 20px;
}

h1 {
  font-family: Arial, sans-serif;
  font-weight: bold;
  font-size: 26px;
}

#main {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 5px;
  overflow-y: auto;
  margin: 30px 30px 1px;
}

#messageContainer {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
}

.messageCard {
  display: flex;
  align-items: center;
  background: transparent;
  height: 45px;
  width: 100%;
  align-self: center;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.avatar {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.messageCard.user {
  justify-content: flex-end;
}

.messageCard.bot {
  justify-content: flex-start;
}

.message {
  max-width: 60%;
  padding: 10px;
  border-radius: 15px;
  font-size: 12px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
}

.message.user {
  background-color: #dbd6c2;
}

.message.bot {
  background-color: #f8f8f7;
}

.combine {
  display: flex;
  align-items: center;
  background: transparent;
  height: 45px;
  width: 100%;
  max-width: 580px;
  border: 0 solid #ccc;
  align-self: center;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 15px;
}

#deleteButton {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

#messageInput {
  height: 45px;
  width: 100%;
  max-width: 580px;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  border: 0 solid #ccc;
  border-radius: 15px;
  padding: 10px;
  align-self: center;
  outline: none;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f8f7;
}

#messageInput input {
  flex-grow: 1;
  border: none;
  outline: none;
  margin-right: 10px;
  background-color: transparent;
}

#messageInput button {
  background-color: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

#messageInput button img {
  height: 20px;
  width: 20px;
}

#footer {
  text-align: center;
  font-size: 10px;
  padding: 5px;
  background: #f8f8f7;
  color: #333;
  border-top: 1px solid #e1e1e1;
}

#footer a {
  color: #333;
  text-decoration: none;
}

#footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  #footer {
    font-size: 8px;
  }
}
</style>
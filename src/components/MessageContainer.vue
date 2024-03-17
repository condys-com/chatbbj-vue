<script setup>
import {nextTick, ref} from 'vue';
import axios from "axios";
import {useUserStore} from "../store/user.ts";

let userData = useUserStore().userData;
console.log(userData);

let userAvatarUrl = ref('/user.png');
let botAvatarUrl = ref('/favicon.ico');

let messages = ref([]);
let input = ref('');
let response = ref(true);
let postInput = ref('');

function initialMessage() {
  axios.get('https://www.condys.com/api/messages/' + userData.username + '/').then(response => {
    response.data.forEach(item => {
      pushMessage(item.user, item.message);
      pushMessage('robot', item.response);
    })
  })
}

function postHistory(user, message, response) {
  axios.post('https://www.condys.com/api/chathistory/', {
    "user": user,
    "message": message,
    "response": response
  });
}

function pushMessage(user, content) {
  messages.value.push({user: user, content: content});
  nextTick(() => {
    const messagesContainer = document.querySelector('#messageContainer');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  })
}

function processResponse(res) {
  response.value = true;
  if (res.data && res.data.length > 0 && res.data[0].hasOwnProperty('text')) {
    setTimeout(() =>
        pushMessage('robot', res.data[0].text
        ), 100)
  } else {
    pushMessage('robot', "服务器响应数据解析错误");
  }
  console.log(res.data[0]);
}

function sendMessage() {
  if (input.value.trim() === '') {
    return;
  }
  pushMessage(userData.username, input.value);
  postInput.value = input.value;
  input.value = '';
  axios.post('https://www.condys.com/webhooks/rest/webhook', {
    "sender": userData.username,
    "message": postInput.value
  }).then((res) => {
    postHistory(userData.username, postInput.value, res.data[0].text);
    processResponse(res);
  }).catch((err) => {
    pushMessage(false, "服务器无响应...可能的原因：1、服务器未启动 2、服务器未正确配置CORS");
    console.log(err);
  })
}

function clearHistory() {
  messages.value = [];
}

initialMessage();
</script>

<template>
  <div id="messageContainer">
    <div class="messageCard" v-for="(message, index) in messages" :key="index"
         :class="{'user': !(message.user==='robot'), 'bot': message.user==='robot'}">
      <div class="avatar">
        <img v-if="!(message.user==='robot')" :src="userAvatarUrl" alt="User Avatar"
             style="height: 25px; width: 25px;"/>
        <img v-else :src="botAvatarUrl" alt="Bot Avatar" style="height: 25px; width: 25px;"/>
      </div>
      <div class="message" :class="{'user': !(message.user==='robot'), 'bot': message.user==='robot'}">
        {{ message.content }}
      </div>
    </div>
  </div>
  <div class="inputcombine">
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
</template>

<style scoped>
#messageContainer {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

.messageCard {
  display: flex;
  width: 100%;
  outline: none;
}

.messageCard.user {
  justify-content: flex-end;
}

.messageCard.bot {
  justify-content: flex-start;
}

.avatar {
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.message {
  max-width: 80%;
  padding: 10px;
  border-radius: 12px;
  font-size: 12px;
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.16) 0 1px 4px;
  border: 0 solid #ccc;
}

.message.user {
  background-color: #dbd6c2;
}

.message.bot {
  background-color: #f8f8f7;
}

.inputcombine {
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  align-self: center;
  justify-content: center;
}

#deleteButton {
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
  background: #f8f8f7;
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
}

#messageInput input {
  flex-grow: 1;
  border: none;
  outline: none;
  margin-right: 10px;
  background: #f8f8f7;
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
</style>
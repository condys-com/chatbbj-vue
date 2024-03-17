<script setup lang="ts">

</script>

<template>
  <div id="footer">
    Copyright © 2023-2024 condys.com All Rights Reserved.
    <a href="https://beian.miit.gov.cn/" target="_blank">&nbsp;陕ICP备2024028402号-1</a>
  </div>
</template>

<style scoped>
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
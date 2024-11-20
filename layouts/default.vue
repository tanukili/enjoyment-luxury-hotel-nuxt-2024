<script setup lang="ts"></script>

<template>
  <header>
    <ul>
      <li><NuxtLink to="/">首頁</NuxtLink></li>
      <li><NuxtLink to="/room">客房旅宿</NuxtLink></li>
      <li><NuxtLink to="/login">會員登入</NuxtLink></li>
      <li><NuxtLink to="/room">立即訂房</NuxtLink></li>
    </ul>
  </header>
  <slot />
  <footer>表尾</footer>
</template>

<style scoped></style>

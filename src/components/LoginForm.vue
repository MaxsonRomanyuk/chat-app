<template>
  <div class="chat-container">
    <h2>Вход</h2>
    <form @submit.prevent="handleLogin">
      <div class="input-container">
        <label for="username">Имя пользователя</label>
        <input id="username" v-model="username" required />
      </div>
      <div class="input-container">
        <label for="password">Пароль</label>
        <input id="password" type="password" v-model="password" required />
      </div>
      <div class="button-container">
        <button type="submit">Войти</button>
      </div>
      <p>
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

function handleLogin() {
  const storedUser = localStorage.getItem(username.value)

  if (storedUser) {
    const userData = JSON.parse(storedUser)
    if (userData.password === password.value) {
      localStorage.setItem('currentUser', username.value)
      router.push('/chat')
    } else {
      alert('Неверный пароль')
    }
  } else {
    alert('Пользователь не найден')
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
}

.chat-container {
  background-color: #292F3F;
  width: 100%;
  height: 100%;
  max-width: 656px;
  max-height: 960px;
  border-radius: 40px;
  box-shadow: 40px 40px 100px 0px #18303F80;
  padding: 30px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h2 {
  color: #fff;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
}

.input-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

label {
  color: #fff;
  font-size: 18px;
}

input {
  padding: 12px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  width: 100%;
  max-width: 400px;
  background-color: #4a4a4a;
  color: white;
}

input::placeholder {
  color: white;
}

.button-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

button {
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
}

button:hover {
  background-color: #357ab8;
}

p {
  color: #fff;
  text-align: center;
}

a {
  color: #4a90e2;
}
</style>

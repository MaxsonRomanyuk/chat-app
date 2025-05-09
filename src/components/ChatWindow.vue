<template>
  <div class="chat-wrapper">
    <div class="chat-container">
      <div class="chat-header">
        <h2>Чат</h2>
        <button @click="logout">Выйти</button>
      </div>

      <div class="chat-messages">
        <div
          class="message"
          v-for="(msg, index) in messages"
          :key="index"
        >
          <strong>{{ msg.user }}:</strong> {{ msg.text }}
        </div>
      </div>

      <form @submit.prevent="sendMessage" class="chat-input">
        <input
          v-model="newMessage"
          placeholder="Введите сообщение..."
          required
        />
        <button type="submit">Отправить</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const messages = ref([])
const newMessage = ref('')
const user = localStorage.getItem('currentUser')

if (!user) {
  router.push('/login')
}

function sendMessage() {
  if (newMessage.value.trim()) {
    const message = {
      user,
      text: newMessage.value.trim(),
    }
    messages.value.push(message)
    localStorage.setItem('messages', JSON.stringify(messages.value))
    newMessage.value = ''
  }
}

function logout() {
  localStorage.removeItem('currentUser')
  router.push('/login')
}

onMounted(() => {
  const savedMessages = JSON.parse(localStorage.getItem('messages'))
  if (savedMessages) {
    messages.value = savedMessages
  }
})
</script>

<style scoped>
.chat-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* фон убран */
}

.chat-container {
  background-color: #292F3F;
  width: 90%;
  max-width: 500px; /* уменьшено */
  height: 90vh;       /* немного меньше высота */
  padding: 30px;
  border-radius: 30px;
  box-shadow: 20px 20px 60px 0px #18303F80;
  display: flex;
  flex-direction: column;
  color: white;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h2 {
  font-size: 22px;
}

.chat-header button {
  padding: 6px 14px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.chat-header button:hover {
  background-color: #357ab8;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  margin: 20px 0;
  padding: 16px;
  background: #1a1a2e;
  border-radius: 12px;
}

.message {
  margin-bottom: 10px;
  word-wrap: break-word;
}

.chat-input {
  display: flex;
  gap: 10px;
}

.chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  background-color: #4a4a4a;
  color: white;
}

.chat-input input::placeholder {
  color: #ccc;
}

.chat-input button {
  padding: 10px 16px;
  border: none;
  background-color: #4a90e2;
  color: white;
  border-radius: 8px;
  cursor: pointer;
}

.chat-input button:hover {
  background-color: #357ab8;
}
</style>
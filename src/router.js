import { createRouter, createWebHistory } from 'vue-router'
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'
import ChatWindow from './components/ChatWindow.vue'

const routes = [
  { path: '/', component: LoginForm },
  { path: '/register', component: RegisterForm },
  { path: '/chat', component: ChatWindow },
]

export default createRouter({
  history: createWebHistory(),
  routes
})

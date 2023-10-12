import { createApp } from 'vue'
import App from './App.vue'
import './main.css'

import Todo from './components/Todo.vue'

const app = createApp(App)
app.component('Todo', Todo)
app.mount('#app')

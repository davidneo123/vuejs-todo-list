<script setup>
import { ref, onMounted, computed, watch } from 'vue'

const todos = ref([])
const todo = ref('')
const category = ref(null)
const categoryHashMap = {
    life_changing: 1,
    important: 2,
    meh: 3,
}

const todos_asc = computed(() => todos.value.sort((a, b) => {
    return categoryHashMap[a.category] - categoryHashMap[b.category] || b.createdAt - a.createdAt
}))

const addTodo = () => {
    if (todo.value.trim() === '' || category.value === null) {
        return
    }
    todos.value.push({
        todo: todo.value,
        category: category.value,
        createdAt: new Date().getTime(),
        done: false,
    })
}

const removeTodo = (todo) => {
    todos.value = todos.value.filter((t) => t !== todo)
}

const clearTodos = () => {
    todos.value = []
    todo.value = ''
    category.value = null
}

watch(todo, (newTodo) => {
    localStorage.setItem('todo', newTodo)
})

onMounted(() => {
    todo.value = localStorage.getItem('todo') || ''
    todos.value = JSON.parse(localStorage.getItem('todos')) || []
})

watch(todos, (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
}, { deep: true })

</script>

<template>
    <main class="app">
        <section>
            <h2 class="title">CREATE A TO-DO</h2>
        </section>
        <section class="create-todo">
            <form @submit.prevent="addTodo">
                <h4 class="title">Enter a new to-do task </h4>
                <input type="text" placeholder="TO-DO ITEM HERE" v-model="todo" />
                <h4 class="title">Choose a category</h4>
                <div class="options">
                    <label>
                        <input type="radio" name="category" value="life_changing" v-model="category" />
                        <span class="bubble"></span>
                        <div>Life Changing</div>
                    </label>
                    <label>
                        <input type="radio" name="category" value="important" v-model="category" />
                        <span class="bubble important"></span>
                        <div>Important</div>
                    </label>
                    <label>
                        <input type="radio" name="category" value="meh" v-model="category" />
                        <span class="bubble meh"></span>
                        <div>Meh</div>
                    </label>
                </div>
                <input type="submit" value="Add to-do">
            </form>
        </section>
        <section class="todo-list">
            <h2 class="title">EDITABLE TO-DO LIST (Ordered by priority)</h2>
            <button class="clear" @click="clearTodos">Clear</button>

            <div class="list" id="todo-list">

                <div v-for="todo in todos_asc" :class="`todo-item ${todo.done && 'done'}`">
                    <label>
                        <input type="checkbox" v-model="todo.done" />
                        <span :class="`bubble ${todo.category}`"></span>
                    </label>

                    <div class="todo-content">
                        <span :class="title">{{ todo.category.replace('_', ' ') }}</span>
                        - <input type="text" v-model="todo.todo" />
                    </div>

                    <div class="actions">
                        <button class="delete" @click="removeTodo(todo)">Delete</button>
                    </div>
                </div>

            </div>
        </section>
    </main>
</template>
<style scoped></style>

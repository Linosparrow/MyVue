<template>
    <div>
        <form @submit.prevent="addTask">
            <span>new task</span>
            <input v-model="taskText" placeholder="please input..."/>
            <button>add</button>
        </form>
        <ol>
            <li v-for="(item, index) in todos">
                {{ item }}
                <button @click="remove(index)">
                    delete
                </button>
                <hr/>
            </li>
        </ol>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos:[],
            taskText: '',
        }
    },
    methods: {
        addTask() {
            if (this.taskText.length == 0) {
                alert("please input...");
                return
            }
            this.todos.push(this.taskText);
            this.taskText = '';
        },
        remove(index) {
            this.todos.splice(index, 1);
        }
    }
}
</script>
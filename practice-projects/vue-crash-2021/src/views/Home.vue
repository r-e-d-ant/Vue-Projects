
<template>
    <div>
        <AddTask v-show="showAddTask" @add-task="addTask" />
        <Tasks @toggle-reminder="toggleReminder" @delete-task="deleteTask" :tasks="tasks"/>
    </div>
</template>


<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'

export default {
    name: 'Home',
    props: {
        showAddTask: Boolean
    },
    components: {
        Tasks,
        AddTask
    },
    data() {
        return {
            tasks: []
        }
    },
    methods: {
        // Add Task
        async addTask(task) {
        const res = await fetch('api/tasks', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(task)
        });

        const data = await res.json();

        this.tasks = [...this.tasks, data]
        },

        // Delete Task
        async deleteTask(id) {
        if(confirm("Are you sure?")) {
            const res = await fetch(`api/tasks/${id}`, {
            method: 'DELETE'
            })
            console.log(res)
            res.status === 200
            ? (this.tasks = this.tasks.filter((task) => task.id !== id))
            : alert("Error deleting")
        }
        },

        // Toggle Reminder
        async toggleReminder(id) {
        const taskToToggle = await this.fetchTask(id)
        const updTask = {...taskToToggle, reminder:!taskToToggle.reminder}

        const res = await fetch(`api/tasks/${id}`, {
            method: 'PUT',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(updTask)
        })

        const data = await res.json()

        this.tasks = this.tasks.map((task) => task.id === id ? {...task, reminder: data.reminder } : task)
        },

        // Fetch all tasks
        async fetchTasks() {
        const res = await fetch('api/tasks')
        const data = res.json()
        return data
        },

        // Get on task by Id
        async fetchTask(id) {
        const res = await fetch(`api/tasks/${id}`)
        const data = res.json()
        return data
        }
    },

    async created() {
        this.tasks = await this.fetchTasks()
    }
}
</script>
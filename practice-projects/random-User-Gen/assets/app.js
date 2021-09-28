
const app = Vue.createApp({
    data() {
        return {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@gmail.com',
            gender: 'male',
            picture: 'https://randomuser.me/api/portraits/men/10.jpg'
        }
    },
    methods: {
        getUser() {
            const getUser = async () => {
                const response = await fetch("https://randomuser.me/api/");
                if (response.status !== 200){
                    throw new Error("Cannot fetch the data");
                }
                const data = await response.json();
                return data;
            }
            getUser().then( data => {
                this.firstName = data.results[0].name.first,
                this.lastName = data.results[0].name.last,
                this.email = data.results[0].email,
                this.gender = data.results[0].gender,
                this.picture = data.results[0].picture.large
            }
            ).catch(err => console.log("rejected", err.message))
        }
    }
})

app.mount('#app');
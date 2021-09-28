
// app instance
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
        // function to call random user api then fetch their datas
        getUser() {
            const getUser = async () => {
                // wait for response
                const response = await fetch("https://randomuser.me/api/");
                // throw an error if response status doesn't equal to 200(ok)
                if (response.status !== 200){
                    throw new Error("Cannot fetch the data");
                }
                // store fetched data in data variable then return them
                const data = await response.json();
                return data;
            }
            // call get user function then populate all the variables with data gotten
            getUser().then( data => {
                this.firstName = data.results[0].name.first,
                this.lastName = data.results[0].name.last,
                this.email = data.results[0].email,
                this.gender = data.results[0].gender,
                this.picture = data.results[0].picture.large
            }
            ).catch(err => console.log("rejected", err.message)) // Show an error message if there is any
        }
    }
})

// mounting the app
app.mount('#app');
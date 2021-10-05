
import * as firebase from "firebase/app";
import "firebase/database";

const config = {
    // `firevuechat` FIREBASE API CREDENTIALS
    apiKey: "AIzaSyBPcsIJLaV7j2OAVgPoaZ2C4tul9Oo6zIY",
    authDomain: "firevuechat-20122.firebaseapp.com",
    projectId: "firevuechat-20122",
    storageBucket: "firevuechat-20122.appspot.com",
    messagingSenderId: "270250450263",
    appId: "1:270250450263:web:2fcef905ead696c575b212"
}

const db = firebase.initializeApp(config);
export default db;

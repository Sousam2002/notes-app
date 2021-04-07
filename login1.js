// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
    apiKey: "AIzaSyBrnt3r8k3Gdj3pMWdDFj65o6jzCxH8xFA",
    authDomain: "notes-app-eade3.firebaseapp.com",
    projectId: "notes-app-eade3",
    storageBucket: "notes-app-eade3.appspot.com",
    messagingSenderId: "515638367576",
    appId: "1:515638367576:web:9810a4371eba6f971d012d",
    measurementId: "G-F8W0G75RD6"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


function Home() {
    alert("You first need to Log-In");
}


const button = document.querySelector('#contactForm');

button.addEventListener('submit', (e) => {
    e.preventDefault();

    let email = document.querySelector("#email").value;
    let password = document.querySelector("#password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            window.alert('Welcome');
        })
        .then(() => {
            let id = firebase.auth().currentUser.uid;
            localStorage.setItem('ID', id);
        })
        .then(() => {
            window.location.href = "./HTML/notes-app.html";
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert(errorCode, errorMessage);
        });
    document.querySelector("#contactForm").reset();
})
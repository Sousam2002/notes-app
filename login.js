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
     alert("You first need to Sign-In");
 }

 function final() {
     alert("You have sucessfully signed-in! Now go to Log-in and enter your details to proceed.Login link is present below sign-in button. ")
 }



 const button = document.querySelector('#finalSubmit');
 let flag = document.querySelector(".flag");


 button.addEventListener('submit', (e) => {
     e.preventDefault();

     var name = document.querySelector("#Name").value;
     let email = document.querySelector("#email").value;
     let password = document.querySelector("#password").value;


     firebase.auth().createUserWithEmailAndPassword(email, password)
         .then(() => {
             let ID = firebase.auth().currentUser.uid;
             firebase.database().ref('User/' + ID).set({
                 Name: name,
                 email: email
             })
             window.alert('registration sucessfull');
         })
         .then(() => {
             flag.classList.remove('none');
         })
         .catch((error) => {
             let errorcode = error.code;
             let errormsg = error.message;

             window.alert('Something went wrong', errorcode, errormsg);
         })

     document.querySelector("#contactForm").reset();
 })

//General Decleration 
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signUpName = document.getElementById('signUpName');
const signUpEmail = document.getElementById('signUpEmail');
const signUpPassword = document.getElementById('signUpPassword');
const signInEmail=document.getElementById('signInEmail');
const signInPassword =document.getElementById('signInPassword');
const signUp_button = document.getElementById('signUp');
const signIn_button =document.getElementById('signIn_button')

const main = document.getElementById('main');
let dataList = [];
                                 
                    
//function to general-toggle between forms
signUpButton.addEventListener('click', () => {
main.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
main.classList.remove("right-panel-active");
});
// End
                    
                    
                    
// Function to general-validate All input fields
function validateInput(input, regex, errorElement, errorMessage) {
    const value = input.value.trim();
    if (regex.test(value)) {
        input.classList.replace("is-invalid", "is-valid");
        errorElement.classList.replace("d-block", "d-none");
        return true;
    } else {
        input.classList.add("is-invalid");
        errorElement.textContent = errorMessage;
        errorElement.classList.replace("d-none", "d-block");
        return false;
    }
}
// End
                    
                    

// Function to validate name
function validateName(name) {
    const regexName = /^(?!.*\s{2})[a-zA-Z0-9_ -]{3,20}(?<!\s)$/;
    const nameError = document.getElementById("nameError");
    return validateInput(name, regexName, nameError, 'Name must be between 3 to 20 characters.');   //function call by another function with argument
}
// End



// Function to validate email
function validateEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById("urlError");
    return validateInput(email, regexEmail, emailError, 'Invalid email.must contain "@ /.com"'); //function call by another function with argument
}
// End


// Function to validate password
function validatePassword(password) {
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    const passError = document.getElementById("passError");
    return validateInput(password, regexPass, passError, 'Password must be at least !8 & Special Characters &Capital Letter'); //function call by another function with argument
}
// End


// // Function to  sign-up from new-user
function signUp() {
    const isNameValid = validateName(signUpName);
    const isEmailValid = validateEmail(signUpEmail);
    const isPasswordValid = validatePassword(signUpPassword);

    if (isNameValid && isEmailValid && isPasswordValid) {
        const email = signUpEmail.value.trim();
        const password = signUpPassword.value.trim();

        // stored data from localStorage or initialize an empty array
        const storedData = JSON.parse(localStorage.getItem('dataList')) || [];

        // Check if the email already exists in the stored data or not
        const userExists = storedData.some(user => user.email === email);

        if (userExists) {
            Swal.fire('User Already Exists! Please Sign In.');
        } else {
            const userData = {
                name: signUpName.value.trim(),
                email: email,
                password: password
            };

            storedData.push(userData);
            localStorage.setItem('dataList', JSON.stringify(storedData));
            clearForm();
            toggleForms();
        }
    } else {
        Swal.fire({
            title: "Form Validation Failed",
            text: "Please check your input fields",
            icon: "warning"
        });
        
    }
}
// End



// Event listener for the "Sign Up" button click
signUp_button.addEventListener('click', signUp);
// End



// // function to sigin from user
function signIn() {
    const storedData = JSON.parse(localStorage.getItem('dataList')) || []; //get data from lacalstorage or if  empty
    const email = signInEmail.value.trim();
    const password = signInPassword.value.trim();
  
    const user = storedData.find(user => user.email === email && user.password===password);

    // Check If He Is User Or Not
    // if he not a user
    if (!user) {
        Swal.fire('You are not registered. Please sign up first.');
    }

    // if he is a user but ther is problem
     else if (user.password !==password && user.email !==email) {
        Swal.fire('Invalid email or password. Please try again.');
    } 

    // if he is a user and Successful sign-in logic - redirect to home page
  else {
        sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        location ='home/home.html';
        clearForm();
    }

 }
// // End



// Function to validate signin-email
function validatesiginEmail(email) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailError = document.getElementById("sigInEmailError");
    return validateInput(email, regexEmail, emailError, 'Invalid email.'); //function call by another function with argument
}
// End


// Function to validate signin-password
function validatesigninPassword(password) {
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])[A-Za-z\d!@#$%^&*()]{8,}$/;
    const passError = document.getElementById("signInPassError");
    return validateInput(password, regexPass, passError, 'Password must be at least !8 & Special Characters &Capital Letter'); //function call by another function with argument
}
// End


// Event listener for the "Sign In" button click
signIn_button.addEventListener('click', signIn);
// End



// function to clear form
function clearForm() {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    signInEmail.value='';
    signInPassword.value='';

 // Clear input
    const inputs = [signUpName, signUpEmail, signUpPassword, signInEmail, signInPassword];
    inputs.forEach(input => {
        input.classList.remove("is-valid", "is-invalid");  
    });
}
// End




// function to return to signin form
function toggleForms() {
    main.classList.toggle("right-panel-active");
}
// End



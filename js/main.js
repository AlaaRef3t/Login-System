
// Register Variables
var registerName = document.querySelector("#registerName");
var registerEmail = document.querySelector("#registerEmail");
var registerPassword = document.querySelector("#registerPassword");
var signUpBtn = document.querySelector("#signUpBtn");
var InputRequired = document.querySelector("#InputRequired");
var registerSuccess = document.querySelector("#registerSuccess");
var emailIsExist = document.querySelector("#emailIsExist");
var registerMainBox = document.querySelector("#registerMainBox");

// Login Variables
var loginEmail = document.querySelector("#loginEmail");
var loginPassword = document.querySelector("#loginPassword");
var IncorrectPass = document.querySelector("#IncorrectPass");
var loginInputRequired = document.querySelector("#loginInputRequired");
var loginSuccess = document.querySelector("#loginSuccess");
var loginBtn = document.querySelector("#loginBtn");
var loginMainBox = document.querySelector("#loginMainBox");

// dashboard variables
var welcomeText = document.querySelector("#welcomeText")
var logOutBtn = document.querySelector("#logOutBtn")

// -----------------------------------------------------


var users = JSON.parse(localStorage.getItem("LocalStorageUsers"));
if (users === null) {
    users = [];
}

// localstorage function 

function localStorageFunc() {
    localStorage.setItem("LocalStorageUsers", JSON.stringify(users));
    
}

// Buttons

if (signUpBtn) {
    signUpBtn.addEventListener("click", saveToLocalStorage);
}

if (loginBtn) {
    loginBtn.addEventListener("click", checkLogin);
}

if (welcomeText) {
    displayName();
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
}

// Using "Enter" keyword to use Functions // Replacing "click" with "Enter"
if (registerMainBox) {
    registerMainBox.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        saveToLocalStorage();        
    }
})
}
if (loginMainBox) {
    loginMainBox.addEventListener("keyup", function (e) {
    if (e.key === "Enter") {
        checkLogin();        
    }
})
}

// function to save to local storage
function saveToLocalStorage() {
    // if (validateUserName() && validateUserEmail() && validateUserPassword()) {
         var userName = registerName.value.trim();
    var userEmail = registerEmail.value.trim();
    var userPassword = registerPassword.value;

    InputRequired.classList.replace("d-block", "d-none");
    emailIsExist.classList.replace("d-block", "d-none");
    registerSuccess.classList.replace("d-block", "d-none");

    if (userName === "" || userEmail === "" || userPassword === "") {
        InputRequired.classList.replace("d-none", "d-block");
        return;
    }

    // check if email exist
    var emailExist = false;

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === userEmail) {
            emailExist = true;
            break;
        }
    }

    if (emailExist) {
        emailIsExist.classList.replace("d-none", "d-block");
        return;
    }

    var user = {
        name: userName,
        email: userEmail,
        password: userPassword,
    };

    users.push(user);
    localStorageFunc()
    registerSuccess.classList.replace("d-none", "d-block");

    setTimeout(function () {

        window.location.href = "index.html";
    }, 1000)
    }
   

// }

// function to check login info
function checkLogin() {
    
    var userEmail = loginEmail.value.trim();
    var userPassword = loginPassword.value;

    loginInputRequired.classList.replace("d-block", "d-none");
    IncorrectPass.classList.replace("d-block", "d-none");

    if (userEmail === "" || userPassword === "") {
        loginInputRequired.classList.replace("d-none", "d-block");
        return;
    }

    var userCheck;
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === userEmail && users[i].password === userPassword) {
            userCheck = users[i];
            break;
        }
    };

    if (userCheck) {
        localStorage.setItem("loggedInUser", JSON.stringify(userCheck));
    loginSuccess.classList.replace("d-none", "d-block");
        setTimeout(function () {
        window.location.href = "dashboard.html";
    
        },800)
    } else {
        IncorrectPass.classList.replace("d-none", "d-block")
    }

}

// display name in dashboard

function displayName() {
    var user = JSON.parse(localStorage.getItem("loggedInUser"));

    if (user && user.name) {
        welcomeText.innerHTML = `Welcome Mr ${user.name}`;
    } else {
        window.location.href = "index.html";
    }
};




// Additional code not required but for regex =>

// validate name in signup

// function validateUserName() {
//     var regex = /^[A-Z]?[a-z]{3,10}$/
    
//     if (regex.test(registerName.value) === true) {
//         registerName.classList.add("is-valid");
//         registerName.classList.remove("is-invalid");
//         return true;
//     } else {
//         registerName.classList.add("is-invalid");
//         registerName.classList.remove("is-valid");
//     }
 
// }

// validate email in signup && login

// function validateUserEmail() {
//     var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
//     if (regex.test(registerEmail.value) === true) {
//         registerEmail.classList.add("is-valid");
//         registerEmail.classList.remove("is-invalid");
//         return true;
//     } else {
//         registerEmail.classList.add("is-invalid");
//         registerEmail.classList.remove("is-valid");
//     }
 
// }

// // validate password in signup && login

// function validateUserPassword() {
//     var regex = /^[a-zA-Z0-9]{5,}$/;
    
//     if (regex.test(registerPassword.value) === true) {
//         registerPassword.classList.add("is-valid");
//         registerPassword.classList.remove("is-invalid");
//         return true;
//     } else {
//         registerPassword.classList.add("is-invalid");
//         registerPassword.classList.remove("is-valid");
//     }
 
// }
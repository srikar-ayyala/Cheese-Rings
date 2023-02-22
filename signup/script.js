let form = document.getElementById('my-form');
let allowedCharacters = '!@#$%^&*()-_=+,<.>/?;:[]{}|`~'

form['name'].addEventListener('input', ValidateName);
form['email'].addEventListener('input', ValidateEmail);
form['password'].addEventListener('input', ValidatePassword);
form['confirm-password'].addEventListener('input', ValidatePassword);


function ValidateForm() {
    return ValidateName() || ValidateEmail() || ValidatePassword();
}

function ValidateName() {
    let name = form['name'];
    if(name.value == '') {
        UpdateError('name-error', false, 'Please enter your name');
        return false;
    }
    UpdateError('name-error', true);
    return true;
}

function ValidateEmail() {
    let email = form['email'];
    if(email.value == '') {
        UpdateError('email-error', false, 'Please enter Email id');
        return false;
    }
    if(email.validity.typeMismatch) {
        UpdateError('email-error', false, 'Please enter proper email address');
        return false;
    }
    UpdateError('email-error', true);
    return true;
}

function ValidatePassword() {
    let password = form['password'], cnfrmPassword = form['confirm-password'];
    if(password.value == '') {
        UpdateError('password-error', false, 'Please enter password');
        return false;
    }
    if(cnfrmPassword.value == '') {
        UpdateError('password-error', false, 'Please enter confirm password');
        return false;
    }
    if(password.validity.tooShort) {
        UpdateError('password-error', false, `Password must be longer than ${password.minLength} characters`);
        return false;
    }
    if(!CheckPasswordValidity()) {
        UpdateError('password-error', false, 'Password must contain atleast 1 upper-case, 1 lower-case letter, 1 number and 1 special character such as ' + allowedCharacters);
        return false;
    }
    if(password.value != cnfrmPassword.value) {
        UpdateError('password-error', false, 'Password and confirm password do not match');
        return false;
    }
    UpdateError('password-error', true);
    return true;
}

function CheckPasswordValidity() {
    let password = form['password'].value;
    // let password = '';
    if(password.split(/[0-9]/)[0] == password) return false;
    if(password.split(/[a-z]/)[0] == password) return false;
    if(password.split(/[A-Z]/)[0] == password) return false;
    for(let i=0; i<allowedCharacters.length; i++) {
        if(password.lastIndexOf(allowedCharacters[i]) != -1) return true;
    }
    return false;
}

function UpdateError(id, hide, message) {
    let error = document.getElementById(id);
    if(hide) {
        error.classList.add('hidden');
        return;
    }
    error.classList.remove('hidden');
    error.innerHTML = message;
    return;
}

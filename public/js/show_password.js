$(() => {

    $("#show_password").click(showPassword)

    function showPassword() {
        var password = document.getElementById("password")
        if (password.type === "password") {
            password.type = "text"
        }
        else {
            password.type = "password"
        }
    }
});

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#id_password');

togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});
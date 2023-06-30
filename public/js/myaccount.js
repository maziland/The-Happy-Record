$(document).ready(function () {
    const email = $('#email').val().trim();

    // Synchronous XHR POST request
    function apiRequestSync(uri, json) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', uri, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(json));

        if (xhr.status === 200) {
            // Request was successful
            const response = JSON.parse(xhr.responseText);
            return response;
        } else {
            // Request failed
            console.error('An error occurred:', xhr.status);
            return null;
        }
    }

    // Function to validate the form inputs
    function validateForm() {
        // Retrieve the input values
        const username = $('#username').val().trim();
        const newEmail = $('#email').val().trim();
        const password = $('#password').val();
        const confirmPassword = $('#confirm-password').val();

        // Reset any previous error messages
        clearErrorMessages();

        // Perform input validation
        let isValid = true;

        if (email == newEmail) {
            // Do nothing, email hasn't changed
        } else if (newEmail === '') {
            displayErrorMessage($('#email'), 'Email is required');
            isValid = false;
        } else if (!isValidEmail(newEmail)) {
            displayErrorMessage($('#email'), 'Invalid email address');
            isValid = false;
        } else {
            // Email has changed and is correct
            // Check it is not taken already
            if (!apiRequestSync("/api/email/updatecheck", { email: newEmail })) {
                displayErrorMessage($('#email'), 'This email belongs to another user');
                isValid = false;
            }
        }

        // Check passwords
        if (password !== confirmPassword) {
            displayErrorMessage($('#confirm-password'), 'Passwords do not match');
            isValid = false;
        }

        return isValid;
    }

    // Function to display an error message for an input field
    function displayErrorMessage(inputField, errorMessage) {
        const errorContainer = inputField.parent().find('.error-message');
        errorContainer.text(errorMessage);
        inputField.addClass('error');
    }

    // Function to clear all error messages and remove error styling
    function clearErrorMessages() {
        $('.error-message').text('');
        $('.error').removeClass('error');
    }

    // Function to validate email format using a regular expression
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Toggle password visibility
    $('.fa-eye').click(function () {
        const passwordInput = $(this).prev();
        const passwordFieldType = passwordInput.attr('type');

        if (passwordFieldType === 'password') {
            passwordInput.attr('type', 'text');
            $(this).removeClass('fa-eye').addClass('fa-eye-slash');
        } else {
            passwordInput.attr('type', 'password');
            $(this).removeClass('fa-eye-slash').addClass('fa-eye');
        }
    });

    // Event listener for form submission
    $('#update-form').submit(function (event) {
        event.preventDefault(); // Prevent form submission


        if (validateForm()) {
            this.submit();
        }
    });

    $('#username').click(function () {
        displayErrorMessage($(this), "Username can't be changed");
    });

    $('#changePassword').click(function () {
        $(this).hide();
        $(".hidden-password").attr("hidden", false);
    });
});
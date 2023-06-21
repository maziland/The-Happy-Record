$(document).ready(function () {
    // Function to validate the form inputs
    function validateForm() {
        // Retrieve the input values
        const username = $('#username').val().trim();

        // Reset any previous error messages
        clearErrorMessages();

        // Perform input validation
        let isValid = true;

        if (username === '') {
            displayErrorMessage($('#username'), 'Username is required');
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
    $('#login-form').submit(function (e) {
        e.preventDefault(); // Prevent form submission

        if (validateForm()) {
            this.submit();
        }
    });

    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('message')
    if (msg != null) {
        Swal.fire({ icon: 'success', text: msg, position: 'top-end', timer: 2500 });
        setTimeout(() => window.location.replace("/login"), 2500);
    }
});
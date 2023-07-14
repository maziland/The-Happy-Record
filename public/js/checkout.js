$(document).ready(function () {

    $('#checkoutForm').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission behavior

        // Perform form validation
        if (validateForm()) {
            $(this).unbind('submit').submit(); // Unbind the submit event and submit the form
        }
    });

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


    function validateForm() {
        // Retrieve the input values
        var cardHolder = $('#cardHolder').val().trim();
        var cardNumber = $('#cardNumber').val().replace(/\s/g, '');
        var expirationDate = $('#expirationDate').val().trim();
        var cvv = $('#cvv').val().trim();

        // Reset any previous error messages
        clearErrorMessages();

        // Perform input validation
        let isValid = true;

        if (cardHolder === '') {
            displayErrorMessage($('#cardHolder'), 'Card holder name is required');
            isValid = false;
        }

        if (cardNumber === '') {
            displayErrorMessage($('#cardNumber'), 'Please insert a card number');
            isValid = false;
        } else if (!/^\d{16}$/.test(cardNumber)) {
            isValid = false;
            displayErrorMessage($('#cardNumber'), 'Please enter a valid card number');
        }

        if (expirationDate === '') {
            displayErrorMessage($('#expirationDate'), 'Expiration date is required');
            isValid = false;
        } else if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expirationDate)) {
            displayErrorMessage($('#expirationDate'), 'Please enter a valid expiration date (MM/YYYY)');
            isValid = false;
        }

        if (cvv === '') {
            displayErrorMessage($('#cvv'), 'Please insert a CVV');
            isValid = false;
        } else if (!/^\d{3}$/.test(cvv)) {
            isValid = false;
            displayErrorMessage($('#cvv'), 'Please enter a valid CVV');
        }

        return isValid;
    }


    $('#submit-checkout-button').click(function (event) {
        event.preventDefault();
        $('#checkoutForm').submit();
    });
});
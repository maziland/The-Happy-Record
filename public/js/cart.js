// All functions related to shopping cart management goes here
$(document).ready(function () {
    $("#shopping-cart").click(() => {
        // On click, open the cart modal
        $('#cartModal').modal('show');

        // Add to cart button
    });
    $('.add-to-cart').click(function () {
        const itemId = $(this).parent().find(".albumId")[0].innerHTML.trim(); // Get the item ID from the page
        const quantity = 1; // Set the desired quantity

        // AJAX POST request
        $.ajax({
            url: '/cart',
            method: 'POST',
            data: { itemId, quantity },
            success: function (response) {
                // Handle success response
                console.log('Item added to cart:', response);
                // Perform any necessary UI updates
            },
            error: function (error) {
                // Handle error response
                console.error('Error adding item to cart:', error);
                // Display error message or handle accordingly
            }
        });
    });
});
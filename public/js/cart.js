// All functions related to shopping cart management goes here
$(document).ready(function () {

    function updateCart(cartItems) {
        const tableBody = $('#cart-table-body');
        tableBody.empty();

        cartItems.items.forEach(item => {

            var $row = $('<tr>');

            // Create the album picture and name column
            var $albumColumn = $('<th scope="row">').appendTo($row);
            var $albumContent = $('<div class="d-flex align-items-center">').appendTo($albumColumn);
            $(`<img src="${item.coverImage}">`)
                .css('width', '120px')
                .appendTo($albumContent);
            $('<div class="flex-column ms-4">').appendTo($albumContent)
                .append(`<p class="mb-2">${item.name}</p>`);

            // Create the artist column
            $('<td class="align-middle">')
                .append(`<p class="mb-0" style="font-weight: 500;">${item.artist}</p>`)
                .appendTo($row);

            // Create the quantity column
            var $quantityColumn = $('<td class="align-middle">').appendTo($row);
            var $quantityDiv = $('<div class="d-flex flex-row">').appendTo($quantityColumn);
            $('<button class="btn btn-link px-2">')
                .on('click', function () {
                    var input = $(this).parent().find('input[type=number]');
                    input[0].stepDown();
                })
                .append('<i class="fas fa-minus"></i>')
                .appendTo($quantityDiv);
            $(`<input min="0" name="quantity" value="${item.quantity}" type="number" class="form-control form-control-sm">`)
                .css('width', '50px')
                .appendTo($quantityDiv);
            $('<button class="btn btn-link px-2">')
                .on('click', function () {
                    var input = $(this).parent().find('input[type=number]');
                    input[0].stepUp();
                })
                .append('<i class="fas fa-plus"></i>')
                .appendTo($quantityDiv);

            // Create the price column
            $('<td class="align-middle">')
                .append(`<p class="mb-0" style="font-weight: 500;">$${Number(item.price) * Number(item.quantity)}</p>`)
                .appendTo($row);

            // Append the row to the table body
            $('#cart-table-body').append($row);
        });
    };

    $("#shopping-cart").click(() => {
        // On click, open the cart modal
        $('#cartModal').modal('show');
        $.ajax({
            url: '/cart',
            method: 'GET',
            success: function (cartItems) {
                // Handle success response
                // Perform UI updates on modal
                updateCart(cartItems)
            },
            error: function (error) {
                // Handle error response
                console.error('Error getting cart:', error);
            }
        });
    });


    $('.add-to-cart').click(function () {
        const itemId = $(this).parent().find(".albumId")[0].innerHTML.trim(); // Get the item ID from the page
        const quantity = 1; // Set the desired quantity

        // AJAX POST request
        $.ajax({
            url: '/cart',
            method: 'POST',
            data: { itemId, quantity },
            success: function (cartItems) {
                // Handle success response
                console.log('Item added to cart:', cartItems);
            },
            error: function (error) {
                // Handle error response
                console.error('Error adding item to cart:', error);
                // Display error message or handle accordingly
            }
        });
    });


});
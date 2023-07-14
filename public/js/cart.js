// All functions related to shopping cart management goes here
$(document).ready(function () {

    function updateQuantity() {
        if ($(this).hasClass("btn-minus")) {
            // Minus button
            var itemId = $(this).closest('tr').find('p[hidden]')[0].textContent;
            var tableId = '#' + $(this).closest('tbody')[0].id
            addToCart(itemId, -1, tableId = tableId);
        } else {
            // Plus button
            var itemId = $(this).closest('tr').find('p[hidden]')[0].textContent;
            var tableId = '#' + $(this).closest('tbody')[0].id
            addToCart(itemId, 1, tableId = tableId);
        }
    }

    function updateCart(tableId) {
        $.ajax({
            url: '/cart',
            method: 'GET',
            success: function (cartItems) {
                // Handle success response
                // Perform UI updates on modal
                const tableBody = $(tableId);
                var cartTotal = 0;
                tableBody.empty();

                cartItems.items.forEach(item => {
                    cartTotal += item.price * item.quantity;
                    var $row = $('<tr>');

                    // Create the album picture and name column
                    var $albumColumn = $('<th scope="row">').appendTo($row);
                    var id = $('<p hidden>').append(item.itemId);
                    id.appendTo($row);
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
                    $('<button class="btn btn-link px-2 btn-minus">')
                        .on('click', updateQuantity)
                        .append('<i class="fas fa-minus"></i>')
                        .appendTo($quantityDiv);
                    $(`<input readonly min="0" name="quantity" value="${item.quantity}" type="number" class="form-control form-control-sm">`)
                        .css('width', '50px')
                        .appendTo($quantityDiv);
                    $('<button class="btn btn-link px-2 btn-plus">')
                        .on('click', updateQuantity)
                        .append('<i class="fas fa-plus"></i>')
                        .appendTo($quantityDiv);

                    // Create the price column
                    $('<td class="align-middle">')
                        .append(`<p class="mb-0" style="font-weight: 500;">$${(Number(item.price) * Number(item.quantity)).toFixed(2)}</p>`)
                        .appendTo($row);

                    // Append the row to the table body
                    $(tableId).append($row);
                });

                totalPrice = $('.total-price');
                totalPrice.text(cartTotal.toFixed(2) + " $");
            },
            error: function (error) {
                // Handle error response
                console.error('Error getting cart:', error);
            }
        });
    };


    $("#shopping-cart").click(() => {
        // On click, open the cart modal
        $('#cartModal').modal('show');
        updateCart('#cart-table-body');
    });

    $("#close-cart-button").click(() => {
        // On click, close the cart modal
        $('#cartModal').modal('hide');
    });

    $("#checkout-button").click(() => {
        // go to checkout
        window.location = "/checkout"
    });

    $('.toast').toast({ delay: 1000 });

    $('button.add-to-cart').click(function () {
        const itemId = $(this).parent().find(".albumId")[0].innerHTML.trim(); // Get the item ID from the page
        const quantity = 1;
        addToCart(itemId, quantity);
    });

    function addToCart(itemId, quantity, tableId = "#cart-table-body") {
        // AJAX POST request
        $.ajax({
            url: '/cart',
            method: 'POST',
            data: { itemId, quantity },
            success: function (cartItems) {
                // Handle success response
                console.log('Item added to cart:', cartItems);
                updateCart(tableId);
                const container = document.getElementById('cart-toast-container');
                const targetElement = document.querySelector('[data-kt-docs-toast="stack"]');
                const newToast = targetElement.cloneNode(true);
                container.append(newToast);
                const toast = bootstrap.Toast.getOrCreateInstance(newToast);
                toast.show();
            },
            error: function (error) {
                // Handle error response
                console.error('Error adding item to cart:', error);
                // Display error message or handle accordingly
            }
        });
    }

    if (window.location.pathname.includes("checkout")) {
        // We are in checkout, update checkout's cart
        updateCart("#checkout-cart-body");
    }
});
$(document).ready(function () {
    $('#shopping-cart').hover(
        function () {
            $('#shopping-cart-icon').addClass('fa-bounce');
        },
        function () {
            $('#shopping-cart-icon').removeClass('fa-bounce');
        }
    );

    const searchForm = document.getElementById('searchForm');

    // Add an event listener for the form submission
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get the search query entered by the user
        const searchQuery = searchForm.elements.search.value;

        // Redirect the user to the desired URL with the search query
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    });
});
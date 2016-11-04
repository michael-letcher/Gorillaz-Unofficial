// Initalise the material JS
$.material.init();

// Auto close nav
$('.navbar-collapse a').click(function () {
    $(".navbar-collapse").collapse('hide');
});
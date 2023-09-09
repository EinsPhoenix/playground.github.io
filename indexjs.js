window.addEventListener('scroll', function () {
    var navbar = document.getElementById('navbar');

    if (window.scrollY > 100) { // Hier können Sie den Schwellenwert für das Scrollen anpassen
        navbar.classList.remove('hidden');
    } else {
        navbar.classList.add('hidden');
    }
});
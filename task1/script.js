function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

window.addEventListener('load', function() {
    var darkModeButton = document.createElement('button');
    darkModeButton.textContent = 'Toggle Dark Mode';
    darkModeButton.style.position = 'fixed';
    darkModeButton.style.bottom = '20px';
    darkModeButton.style.right = '20px';
    darkModeButton.style.padding = '10px';
    darkModeButton.style.border = 'none';
    darkModeButton.style.backgroundColor = '#343a40';
    darkModeButton.style.color = '#fff';
    darkModeButton.style.cursor = 'pointer';
    darkModeButton.addEventListener('click', function() {
        toggleDarkMode();
    });
    document.body.appendChild(darkModeButton);
});
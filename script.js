const users = [
    { username: 'admin', password: 'admin123' }
];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        window.location.href = 'panel.html';
    } else {
        document.getElementById('error').style.display = 'block';
    }
});

window.onload = function() {
    document.getElementById('status').textContent = 'Working fine!';
};

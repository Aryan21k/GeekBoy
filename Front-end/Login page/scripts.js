const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
        }

        const data = await response.json();
        console.log('Login successful:', data);
        // Redirect or perform necessary actions after successful login
        window.location.href = '/Front-end/HomePage/index.html'; // Redirect to homepage after successful login

    } catch (error) {
        console.error('Error:', error.message);
        alert('Login failed. Please try again.');
    }
});

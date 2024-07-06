document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', async function(event) {
            event.preventDefault();

            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('http://localhost:5000/api/users/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ fullname, email, username, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.msg || 'Signup failed');
                }

                const data = await response.json();
                console.log('Signup successful:', data);

                alert('Signup successful!');
                // Optionally, redirect to another page
                // window.location.href = '/login'; // Redirect to login page after signup
            } catch (error) {
                console.error('Error:', error.message);
                alert('Signup failed. Please try again.');
            }
        });
    } else {
        console.error('Signup form element not found.');
    }
});

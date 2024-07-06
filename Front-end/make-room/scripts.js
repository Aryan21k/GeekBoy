// Front-end/make-room/scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const generateRoomIdBtn = document.getElementById('generate-room-id-btn');
    const roomIdInput = document.getElementById('room-id');
    const createRoomForm = document.getElementById('createRoomForm');

    generateRoomIdBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('http://localhost:5000/api/generate-room-id');
            if (!response.ok) {
                throw new Error('Failed to generate room ID');
            }
            const data = await response.json();
            roomIdInput.value = data.roomId; // Update the input field with the generated room ID
        } catch (error) {
            console.error(error);
            alert('Failed to generate room ID');
        }
    });

    createRoomForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const roomId = roomIdInput.value;
        const username = document.getElementById('username').value;

        try {
            const response = await fetch('http://localhost:5000/api/users/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username })
            });

            if (!response.ok) {
                throw new Error('Failed to verify username');
            }

            const data = await response.json();
            if (data.exists) {
                window.location.href = `/Front-end/working-space/index.html?roomId=${roomId}&username=${username}`;
            } else {
                alert('Username does not exist');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to create or join room');
        }
    });
});

    


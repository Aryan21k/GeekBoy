document.addEventListener('DOMContentLoaded', () => {
    const joinRoomForm = document.getElementById('joinRoomForm');

    joinRoomForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const roomId = document.getElementById('room-id').value;
        const username = document.getElementById('username').value;

        try {
            const response = await fetch('http://localhost:5000/api/check-room-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, username })
            });

            if (!response.ok) {
                throw new Error('Failed to join room');
            }

            const data = await response.json();
            if (data.exists) {
                window.location.href = `http://127.0.0.1:5500/Front-end/working-space/index.html?roomId=${roomId}&username=${username}`;
            } else {
                alert('Invalid Room ID or Username');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to join room');
        }
    });
});

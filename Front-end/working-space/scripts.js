// Initialize Firebase (already done in your scripts.js)
const firebaseConfig = {
    apiKey: "AIzaSyBMyPphgtXvu9lrIJdDEIsZdL_-qGQuvnM",
    authDomain: "real-time-code-editor-4120a.firebaseapp.com",
    databaseURL: "https://real-time-code-editor-4120a-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "real-time-code-editor-4120a",
    storageBucket: "real-time-code-editor-4120a.appspot.com",
    messagingSenderId: "665266338506",
    appId: "1:665266338506:web:769521d423c972779ad233",
    measurementId: "G-7M0R2ZL2Y3"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const storage = firebase.storage();

function initApp() {
    
  // Clear all messages when initializing
  database.ref('messages').remove();

  // Prompt user for their name
  var userName = prompt("Enter your name:");
  var userNickname = prompt("Enter your nickname:"); // Added prompt for nickname

  // Add user to the active users list in Firebase
  var usersRef = database.ref('users');
  var userRef = usersRef.push();
  userRef.set({
    name: userName,
    nickname: userNickname,  // Save nickname to database
    isFirstUser: false // Initialize as not the first user
  });

  // Check if current user is the first user
  usersRef.once('value', function(snapshot) {
    if (snapshot.numChildren() === 1) {
      // This user is the first user
      userRef.update({ isFirstUser: true });
      // Show the Kick User button
      document.getElementById('kick-user-btn').style.display = 'block';

      // Listen for click events on users to kick them
      document.querySelectorAll('#users li').forEach(function(user) {
        user.addEventListener('click', function() {
          if (userRef.val().isFirstUser) {
            var userIdToRemove = user.getAttribute('data-id');
            database.ref('users/' + userIdToRemove).remove();
          } else {
            alert("You are not authorized to kick users.");
          }
        });
      });
    }
  });

  // Remove user from the list when they leave or reload
  window.addEventListener('beforeunload', function() {
    userRef.remove();
  });

  // Update user list in real-time
  database.ref('users').on('value', function(snapshot) {
    var users = snapshot.val();
    var userList = document.getElementById('users');
    userList.innerHTML = '';
    for (var id in users) {
      var li = document.createElement('li');
      li.textContent = users[id].nickname || users[id].name; // Show nickname if available
      li.setAttribute('data-id', id);
      li.classList.add('user-list-item'); // Add class for styling and event binding
      userList.appendChild(li);
    }

    // Reattach click event listeners for kick functionality
    if (userRef.val().isFirstUser) {
      document.querySelectorAll('#users li.user-list-item').forEach(function(user) {
        user.addEventListener('click', function() {
          var userIdToRemove = user.getAttribute('data-id');
          database.ref('users/' + userIdToRemove).remove();
        });
      });
    }
  });

  // Chat functionality
  var chatInput = document.getElementById('chat-input');
  var sendMessageBtn = document.getElementById('send-message-btn');
  var chatMessages = document.getElementById('chat-messages');

  sendMessageBtn.addEventListener('click', function() {
    var message = chatInput.value.trim();
    if (message) {
      var chatMessage = userName + ': ' + message;
      var messageRef = database.ref('messages');
      messageRef.push().set({
        content: chatMessage
      });
      chatInput.value = '';
    }
  });

  // Listen for new chat messages
  database.ref('messages').on('child_added', function(snapshot) {
    var message = snapshot.val().content;
    var messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
  });

  // Kick User functionality
  var kickUserBtn = document.getElementById('kick-user-btn');
  kickUserBtn.addEventListener('click', function() {
    if (!userRef.val().isFirstUser) {
      alert("Only the first user can kick other users.");
    }
  });
}

// Call the initApp function when the page loads
document.addEventListener('DOMContentLoaded', function() {
  initApp();
});

var editor = CodeMirror.fromTextArea(document.getElementById('code-editor'), {
    lineNumbers: true,
    theme: 'custom', // Ensure this matches your custom theme class in CSS
    mode: 'javascript' // Adjust mode as per your editor's language requirement
});

// it will be helpful in storing data in mongoDB
const userData = {
    username: 'exampleUser',
    password: 'examplePassword',
    // Add other required fields
  };
  
  fetch('http://localhost:5000/api/users/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Signup response:', data);
      // Handle response data as needed
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle error
    });

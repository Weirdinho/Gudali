function menu() {
  var x = document.getElementById("myDiv");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  } 
}


// Function to save the last visited page before navigating away
function saveLastPage() {
  localStorage.setItem('lastPage', window.location.href);
}


document.getElementById("submit1")?.addEventListener("click", async (e) => {
    e.preventDefault(); 

  
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
  
    
    });
  
    const data = await response.json();
  
    if (response.ok) {
      localStorage.setItem("username", name);
        const lastPage = localStorage.getItem("lastPage") || "/courses";
        window.location = lastPage;
      updateUI();
        
    } else {
      alert(data.message);
    }
  });
  
  document.getElementById('submit2')?.addEventListener('click', async (e) => {
    e.preventDefault();


    const name = document.getElementById('username2').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password2').value;

    const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
    });
 
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('username', name);
        updateUI();
      const lastPage = localStorage.getItem("lastPage") || "/courses";
      window.location = lastPage;
    } else {
        alert(data.message);
    }
}); 

// FORGOT PASSWORD

  document.getElementById('forgotPassword').addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = prompt("Please enter your email:");
    
    if (email) {
      fetch('/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
      .then(response => response.text())
      .then(data => {
        // Show the message in the notification div
        showNotification(data, 'success');
      })
      .catch(error => {
        // Show an error message in case of failure
        showNotification('Error: ' + error.message, 'error');
      });
  }
});

// Function to show the notification message
function showNotification(message, type) {
  const notification = document.getElementById('notification');
  
  // Set the message and make the notification visible
  notification.innerText = message;
  notification.style.display = 'block';
  
  // Set color based on type (success or error)
  if (type === 'success') {
    notification.style.color = 'white';
    notification.style.backgroundColor = 'sandybrown';
  } else if (type === 'error') {
    notification.style.color = 'red';
    notification.style.backgroundColor = 'red';
  }
  setTimeout(() => {
    notification.style.display = 'none';
  }, 5000);
}


  // Function to update the UI after login
  const updateUI = () => {
    const welcomeMessage = document.getElementById("welcome-message");
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutLink = document.getElementById("logout-link");
  
    // Get the username from localStorage
    const name = localStorage.getItem("username");
  
    // Update welcome message
    welcomeMessage.innerHTML = `Welcome, ${name}!`;
    logoutLink.style.display = "block";
  };
  
  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("lastPage"); 
    updateUI(); 
    window.location = "/";
  };
  
  
  // Update the UI on page load to handle session persistence
  document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("username")) {
      updateUI();
    }
  });
  
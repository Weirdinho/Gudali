let head = document.querySelector("header");
let up = document.querySelector(".up");
let message = document.querySelector(".message-mid")

document.addEventListener("DOMContentLoaded", function () {
  const scrollUpBtn = document.querySelector(".scroll-up-btn");


  const toggleScrollButton = () => {
    if (window.scrollY > 300) {
      scrollUpBtn.classList.add("visible");
    } else {
      scrollUpBtn.classList.remove("visible");
    }
  };


  window.addEventListener("scroll", toggleScrollButton);


  scrollUpBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  toggleScrollButton();
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 80) {
    head.classList.add("fixed");
  } else {
    head.classList.remove("fixed");
  }
}); 



function menu() {
  var x = document.getElementById("myDiv");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

//DISEASES
function toggleDetail(diseaseElement) {
 
  var detail = diseaseElement.querySelector(".disease-detail");

  if (detail.style.display === "block") {
    detail.style.display = "none";
    diseaseElement.classList.remove("highlight");
  } else {
    detail.style.display = "block";
    diseaseElement.classList.add("highlight");
  }
} 

   // Target the course list div in the HTML
   const courseList = document.getElementById("course-list");
   const cartCounter = document.getElementById("cart-counter");
 

  
   // Function to save the last visited page before navigating away
function saveLastPage() {
  localStorage.setItem('lastPage', window.location.href);
}

document
  .getElementById("login-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission

    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
      "/api/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),

        // Send username instead of email
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Successful login
      localStorage.setItem("username", name);
        // Redirect to last visited page or fallback to /courses
        const lastPage = localStorage.getItem("lastPage") || "/courses";
        window.location = lastPage;
      updateUI();
      
    } else {
      alert(data.message);
    }
  });

// Function to update the UI after login
const updateUI = () => {
  const welcomeMessage = document.getElementById("welcome-message");
  const loginBtn = document.getElementById("login-link");
  const registerBtn = document.getElementById("register-link");
  const logoutBtn = document.getElementById("logout-link");

  // Get the username from localStorage
  const name = localStorage.getItem("username");

  // Update welcome message
  if (name) {
    welcomeMessage.innerHTML = `Welcome, ${name}!`;

    // Hide login and register buttons, show logout button
    loginBtn.style.display = "none";
    logoutBtn.style.display = "flex"; // Show as a flex element for centering
  } else {
    welcomeMessage.innerHTML = ""; // Clear the welcome message if not logged in
    loginBtn.style.display = "block";

    logoutBtn.style.display = "none";
  }
};

// Function to handle user logout
const logout = () => {
  localStorage.removeItem("username"); // Clear the username from localStorage
  localStorage.removeItem("lastPage");
  updateUI(); // Update the UI to reflect logout
  window.location = "/";
};

// Add event listener for login form submission
// document.getElementById('login-form').addEventListener('submit', loginUser);

// Update the UI on page load to handle session persistence
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("username")) {
    updateUI(); // Update the UI if the user is already logged in
  }
});

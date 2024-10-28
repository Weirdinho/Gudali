// document.addEventListener("DOMContentLoaded", () => {
//     // Define an array of course objects
//     const courses = [
//       {
//         id: 1,
//         title: "Cow Rearing 101",
//         description: "Introduction to cow rearing for beginners.",
//         price: 50000,
//       },
//       {
//         id: 2,
//         title: "Advanced Cow Management",
//         description: "Learn advanced techniques to manage your herd efficiently.",
//         price: 100000,
//       },
//       {
//         id: 3,
//         title: "Dairy Farming Basics",
//         description:
//           "A comprehensive guide to dairy farming and milk production.",
//         price: 60000,
//       },
//       {
//         id: 4,
//         title: "Sustainable Cow Rearing",
//         description: "Learn sustainable practices for raising cows.",
//         price: 75000,
//       },
//     ];
  
//     // Target the course list div in the HTML
//     const courseList = document.getElementById("course-list");
//     const cartCounter = document.getElementById("cart-counter");
  
//     // Update the cart counter
//     const updateCartCounter = () => {
//       const cart = JSON.parse(localStorage.getItem("cart")) || [];
//       cartCounter.textContent = cart.length;
//     };
  
//     // Function to create a course card and append it to the DOM
//     const displayCourses = () => {
//       courses.forEach((course) => {
//         const courseCard = document.createElement("div");
//         courseCard.classList.add("course-card");
  
//         // Populate course card with course data
//         courseCard.innerHTML = `
  
//                 <h2>${course.title}</h2>
//                 <p>${course.description}</p>
//                 <p><strong>Price:</strong> NGN${course.price}</p>
//                 <button class="enroll-btn" data-id="${course.id}">Enroll Now</button>
//             `;
  
//         // Add event listener to "Enroll Now" button to add the course to the cart
//         const enrollBtn = courseCard.querySelector(".enroll-btn");
//         enrollBtn.addEventListener("click", () => {
//           addToCart(course);
//         });
  
//         // Append the course card to the course list
//         courseList.appendChild(courseCard);
//       });
//     };
  
//     // Function to add a course to the cart (stored in localStorage)
//     const addToCart = (course) => {
//       let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
//       // Check if the course is already in the cart
//       const courseExists = cart.some(
//         (cartItem) => cartItem.title === course.title
//       );
  
//       if (courseExists) {
//         // Show message that the course is already in the cart
//         const messageDiv = document.createElement("div");
//         messageDiv.className = "error-message";
//         messageDiv.textContent = "Course is already in your cart";
  
//         messageDiv.style.backgroundColor = "red";
//         messageDiv.style.color = "white";
//         messageDiv.style.padding = "10px";
//         messageDiv.style.marginTop = "10px";
//         messageDiv.style.borderRadius = "5px";
//         messageDiv.style.fontSize = "1.2em";
//         messageDiv.style.textAlign = "center";
//         messageDiv.style.maxWidth = "400px";
//         messageDiv.style.margin = "10px auto";
  
//         courseList.parentNode.insertBefore(messageDiv, courseList);
//         setTimeout(() => {
//           messageDiv.remove();
//         }, 3000);
//       } else {
//         // If the course is not in the cart, add it
//         cart.push(course);
//         localStorage.setItem("cart", JSON.stringify(cart));
  
//         // Update the cart counter (assuming you have a function to do this)
//         updateCartCounter();
  
//         // Show success message
//         setTimeout(() => {
//           const messageDiv = document.createElement("div");
//           messageDiv.className = "success-message";
//           messageDiv.textContent = "Course added Successfully";
  
//           messageDiv.style.backgroundColor = "green";
//           messageDiv.style.color = "white";
//           messageDiv.style.padding = "10px";
//           messageDiv.style.marginTop = "10px";
//           messageDiv.style.borderRadius = "5px";
//           messageDiv.style.fontSize = "1.2em";
//           messageDiv.style.textAlign = "center";
//           messageDiv.style.maxWidth = "400px";
//           messageDiv.style.margin = "10px auto";
  
//           courseList.parentNode.insertBefore(messageDiv, courseList);
//           setTimeout(() => {
//             messageDiv.remove();
//           }, 3000);
//         }, 0);
//       }
//     };
  
//     // Call the function to display courses on page load
//     displayCourses();
//     updateCartCounter(); // Update the cart counter on page load
//   });

// Function to save the last visited page before navigating away
function saveLastPage() {
  localStorage.setItem('lastPage', window.location.href);
}


document.getElementById("login-form")?.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form submission
  
    const name = document.getElementById("username").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, password }),
  
      // Send username instead of email
    });
  
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
    const loginLink = document.getElementById("login-link");
    const registerLink = document.getElementById("register-link");
    const logoutLink = document.getElementById("logout-link");
  
    // Get the username from localStorage
    const name = localStorage.getItem("username");
  
    // Update welcome message
    welcomeMessage.innerHTML = `Welcome, ${name}!`;
  
    // Hide login and register links, show logout link
    loginLink.style.display = "none";
  
    logoutLink.style.display = "block";
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
  
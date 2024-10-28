let head = document.querySelector("header");
let up = document.querySelector(".up");


window.addEventListener("scroll", function () {
  if (window.scrollY > 80) {
    head.classList.add("fixed");
  } else {
    head.classList.remove("fixed");
  }
});
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

function menu() {
  var x = document.getElementById("myDiv");
  if (x.style.display === "none") {
    x.style.display = "flex";
  } else {
    x.style.display = "none";
  }
}

async function getCourses() {
  try {
    const res = await fetch("http://localhost:3000/api/courses/all-courses")
    const courses = await res.json()
    if(res.ok)return courses
  } catch (error) {
    console.error(error)
  }
}

// Function to save the last visited page before navigating away
function saveLastPage() {
  localStorage.setItem('lastPage', window.location.href);
}


document.addEventListener("DOMContentLoaded", () => {
   async function displayCourses() {
    try {
      const res = await fetch("http://localhost:3000/api/courses/all-courses")
      const courses = await res.json()
      console.log(courses);
      
      
      courses.data.forEach((course) => {
        const courseCard = document.createElement("div");
        courseCard.classList.add("course-card");
  
        // Populate course card with course data
        courseCard.innerHTML = `
                <img src="${course.img}" alt="">
                <h2>${course.title}</h2>
                <p>${course.description}</p>
                <p><strong>Price:</strong> NGN${course.price}</p>
                <p style="display:none;">${course.pdfPath}</p>
                <button class="enroll-btn" data-id="${course._id}">Add to Cart</button>
            `; 
   
        // Add event listener to "Enroll Now" button to add the course to the cart
        const enrollBtn = courseCard.querySelector(".enroll-btn");
        enrollBtn.addEventListener("click", () => {
          addToCart(course);
        });
  
        // Append the course card to the course list
        courseList.appendChild(courseCard);
      });

    } catch (error) {
      console.error(error)
    }
   }
   
  
    // Target the course list div in the HTML
    const courseList = document.getElementById("course-list");
    const cartCounter = document.getElementById("cart-counter");
  
    // Update the cart counter
    const updateCartCounter = () => {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cartCounter.textContent = cart.length;
    };
  
    // Function to add a course to the cart (stored in localStorage)
    const addToCart = (course) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
      // Check if the course is already in the cart
      const courseExists = cart.some(
        (cartItem) => cartItem.title === course.title
      );
  
      if (courseExists) {
        // Show message that the course is already in the cart
        const messageDiv = document.createElement("div");
        messageDiv.className = "error-message";
        messageDiv.textContent = "Course is already in your cart";
  
        messageDiv.style.backgroundColor = "red";
        messageDiv.style.color = "white";
        messageDiv.style.padding = "10px";
        messageDiv.style.marginTop = "10px";
        messageDiv.style.borderRadius = "5px";
        messageDiv.style.fontSize = "1.2em";
        messageDiv.style.textAlign = "center";
        messageDiv.style.maxWidth = "400px";
        messageDiv.style.margin = "10px auto";
  
        courseList.parentNode.insertBefore(messageDiv, courseList);
        setTimeout(() => {
          messageDiv.remove();
        }, 3000);
      } else {
        cart.push(course);
        localStorage.setItem("cart", JSON.stringify(cart));
  
        // Update the cart counter (assuming you have a function to do this)
        updateCartCounter();
  
        // Show success message
        setTimeout(() => {
          const messageDiv = document.createElement("div");
          messageDiv.className = "success-message";
          messageDiv.textContent = "Course added Successfully";
  
          messageDiv.style.backgroundColor = "green";
          messageDiv.style.color = "white";
          messageDiv.style.padding = "10px";
          messageDiv.style.marginTop = "10px";
          messageDiv.style.borderRadius = "5px";
          messageDiv.style.fontSize = "1.2em";
          messageDiv.style.textAlign = "center";
          messageDiv.style.maxWidth = "400px";
          messageDiv.style.margin = "10px auto";
  
          courseList.parentNode.insertBefore(messageDiv, courseList);
          setTimeout(() => {
            messageDiv.remove();
          }, 3000);
        }, 0);
      }
    };
  
    // Call the function to display courses on page load
    displayCourses()
    updateCartCounter();
  });

document.getElementById("login-form")?.addEventListener("submit", async (e) => {
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
   
      logoutBtn.style.display = "flex"; 
    } else {
      welcomeMessage.innerHTML = ""; 
      loginBtn.style.display = "block";
 
      logoutBtn.style.display = "none";
    }
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
  
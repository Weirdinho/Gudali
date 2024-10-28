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
document.addEventListener("DOMContentLoaded", function () {
  const checkoutBtn = document.getElementById("checkout-btn");
  const loginBtn = document.getElementById("login-btn");
  const checkoutForm = document.getElementById("checkout-form");

  // Function to check if the user is signed in
  function checkUserSignIn() {
    const username = localStorage.getItem("username");
    if (username) {
      // User is signed in, enable checkout button and hide login button
      checkoutBtn.disabled = false;
      loginBtn.classList.add("hidden");
    } else {
      // User is not signed in, disable checkout button and show login button
      checkoutBtn.disabled = true;
      loginBtn.classList.remove("hidden");
    }
  }

  // Event listener for the checkout button
  checkoutBtn.addEventListener("click", function () {
    const username = localStorage.getItem("username");
    if (!username) {
      // Redirect to login page if not signed in
      window.location = "/login"; // Change to your login page URL
    } else {
      // User is signed in, show the checkout form
      checkoutForm.classList.remove("hidden");
    }
  });

  // Event listener for the login button
  loginBtn.addEventListener("click", function () {
    // Redirect to login page when login button is clicked
    window.location.href = "login.html"; // Change to your login page URL
  });

  // Initial check for user sign-in status
  checkUserSignIn();
});

document.getElementById("checkout-btn").addEventListener("click", function () {
  var cartItems = document.getElementById("cart-items");
  var checkoutForm = document.getElementById("checkout-form");

  // Check if the cart is empty
  if (cartItems.children.length === 0) {
    alert(
      "Error: Your cart is empty. Please add items to proceed to checkout."
    );
    checkoutForm.classList.add("hidden"); // Ensure the checkout form is hidden
  } else {
    // Show the checkout form when there are items in the cart
    checkoutForm.classList.remove("hidden");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cartItemsDiv = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const checkoutForm = document.getElementById("checkout-form");
  const checkoutBtn = document.getElementById("checkout-btn");
  const checkoutDetailsForm = document.getElementById("checkout-details");
  const paymentMessage = document.getElementById("payment-message");

  // Retrieve cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Function to display the cart items
  const displayCartItems = () => {
    let total = 0;

    cart.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");
      itemDiv.innerHTML = `
                      <img src="${item.img}" alt="">
              <h3 id="title">${item.title}</h3>
              <p><strong>Price:</strong> NGN${item.price.toFixed(2)}</p>
               <a id="courseId" style="display:none" href="${
                 item.pdfPath
               }" alt="PDF">${
                item.pdfPath
              }</a>
              <button class="remove-btn" id="push" data-index="${
                item._id
              }">Remove</button>
          `;
      console.log(itemDiv);
      // Add each item's price to the total
      total += item.price;

      // Append the item to the cart items div
      cartItemsDiv.appendChild(itemDiv);
    });

    // Update total price
    totalPriceElement.textContent = total.toFixed(2);
  };

  // Function to remove an item from the cart
  const removeFromCart = (id) => {

    const index = cart.findIndex(item => item._id === id);
   
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    cartItemsDiv.innerHTML = "";
    displayCartItems();
  };

  // Show the checkout form when "Proceed to Checkout" is clicked
  checkoutBtn.addEventListener("click", () => {
    checkoutForm.classList.remove("hidden");
    window.scrollTo(0, document.body.scrollHeight); // Scroll to the form
  });

  const clearFormFields = () => {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("card-number").value = "";
    document.getElementById("expiry-date").value = "";
    document.getElementById("cvv").value = "";
  };

  //CREDIT CARD DETAILS
  const cardNumber = document.getElementById("card-number");
  const expiryDate = document.getElementById("expiry-date");
  const cvv = document.getElementById("cvv");
  cardNumber.addEventListener("input", function (e) {
    let input = this.value.replace(/\D/g, "");
    input = input.substring(0, 16);

    let formattedInput = input.match(/.{1,4}/g)?.join(" ") || "";
    this.value = formattedInput;
  });
  expiryDate.addEventListener("input", function (e) {
    let input = this.value.replace(/\D/g, "");
    input = input.substring(0, 4);

    let formattedInput = input.match(/.{1,2}/g)?.join("/") || "";
    this.value = formattedInput;
  });
  cvv.addEventListener("input", function (e) {
    this.value = this.value.replace(/\D/g, "");

    if (this.value.length > 3) {
      this.value = this.value.slice(0, 3);
    }
  });

  //BEGIN
  document
    .getElementById("checkout-details")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      // Collect form data
      const name = document.getElementById("name").value;
      const title = document.getElementById("title").textContent
      const email = document.getElementById("email").value;
      const totalPrice = document.getElementById("total-price").textContent;
      const cardNumber = document.getElementById("card-number").value;
      const courseId = document.getElementById("courseId").textContent
      console.log(courseId);

      // Example of making a purchase and sending the courseId and user email to the backend
      async function purchaseCourse(courseId, email, title, name) {
        await fetch("/purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseId, email, title,name }), // Send courseId and user's email
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              console.error("Error:", data.error);
            } else {
              console.log("Success:", data.message);
              alert(data.message);
            }
          })
          .catch((error) => {
            console.error("Error purchasing course:", error);
          });
      }
      purchaseCourse(courseId, email, title, name);
    });
  // END

  //the form submission
  checkoutDetailsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const cardNumber = document.getElementById("card-number").value;
    const expiryDate = document.getElementById("expiry-date").value;
    const cvv = document.getElementById("cvv").value;

    // Simulate payment processing
    setTimeout(() => {
      // Hide form, show payment success message
      checkoutForm.classList.add("hidden");
      paymentMessage.classList.remove("hidden");

      // Display a success message
      paymentMessage.innerHTML = `
              <p>Thank you, ${name}! Your payment via Credit Card has been processed successfully.</p>
              <p>Card ending in ${cardNumber.slice(-4)}</p>
              <p>A confirmation has been sent to ${email}.</p>
          `;

      // Clear form fields after successful payment
      clearFormFields();

      // Clear the cart after checkout
      localStorage.removeItem("cart");
      cartItemsDiv.innerHTML = "";
      totalPriceElement.textContent = "0.00";
    }, 1500); // Simulate a delay for payment processing
  });

  // Attach event listener to handle removing items from cart
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const id= event.target.getAttribute("data-index");
      removeFromCart(id);
    }
  });

  displayCartItems();
});

// For loading courses in the catalog
async function loadCourses() {
  const response = await fetch("http://localhost:3000/api/courses/catalogue");
  const courses = await response.json();
  const catalogue = document.getElementById("course-catalogue");

  courses.forEach((course) => {
    const courseDiv = document.createElement("div");
    courseDiv.innerHTML = `
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button onclick="purchaseCourse('${course._id}')">Buy for $${course.price}</button>
        `;
    catalogue.appendChild(courseDiv);
  });
}

function purchaseCourse(courseId) {
  const userId = localStorage.getItem("userId");
  fetch(`http://localhost:3000/api/courses/purchase/${courseId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ userId, paymentMethod: "credit card" }),
  })
    .then((res) => res.json())
    .then((data) => alert(data.message));
}

// Function to save the last visited page before navigating away
function saveLastPage() {
  localStorage.setItem("lastPage", window.location.href);
}

// Register form logic
document
  .getElementById("register-form")
  ?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    alert(data.message);
  });

// Login form logic
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

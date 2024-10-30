let head = document.querySelector("header");
let up = document.querySelector(".up");
let message = document.querySelector(".message-mid");
const PORT = process.env.PORT || 3000;
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

async function getBreeds() {
  try {
    const res = await fetch(`http://localhost:${PORT}/api/breeds/all-breeds`);
    const breeds = await res.json();
    if (res.ok) return breeds;
  } catch (error) {
    console.error(error);
  }
}

// Function to save the last visited page before navigating away
function saveLastPage() {
  localStorage.setItem("lastPage", window.location.href);
}

document.addEventListener("DOMContentLoaded", () => {
  async function displayBreeds() {
    try {
      const res = await fetch("http://localhost:3000/api/breeds/all-breeds");
      const breeds = await res.json();
      console.log(breeds);

      breeds.data.forEach((breeds) => {
        const body2 = document.getElementById("body-2");
        const breedCard = document.createElement("div");
        const writeup = document.createElement("div");
        const lefty = document.createElement("div");
        lefty.classList.add("b-2-1");
        breedCard.classList.add("b-2-1-left");
        writeup.classList.add("writeup");

        breedCard.innerHTML = `
                  <img src="${breeds.imgSrc}" alt="">
                  
              `;
        writeup.innerHTML = `<h3>${breeds.title}</h3>
                  <p>${breeds.description}<span><a href=${breeds.moreLink}>Read more</a></span></p>
              `;

        lefty.appendChild(breedCard);
        breedCard.appendChild(writeup);
        body2.appendChild(breedCard);
      });
    } catch (error) {
      console.error(error);
    }
  }
  displayBreeds();
});

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

// Update the UI on page load to handle session persistence
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("username")) {
    updateUI(); // Update the UI if the user is already logged in
  }
});

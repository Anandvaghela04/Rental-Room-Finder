document.addEventListener("DOMContentLoaded", () => {
  const signUpButton = document.getElementById("signUp");
  const signInButton = document.getElementById("signIn");
  const container = document.getElementById("container");

  signUpButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  signInButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });
});

function showError(input, message) {
  let errorElement = input.nextElementSibling;
  if (!errorElement || !errorElement.classList.contains("error-message")) {
    errorElement = document.createElement("div");
    errorElement.classList.add("error-message");
    input.parentNode.insertBefore(errorElement, input.nextSibling);
  }
  errorElement.textContent = message;
  errorElement.style.color = "red";
  errorElement.style.fontSize = "14px";
  errorElement.style.marginTop = "5px";
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => el.remove());
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signupForm").addEventListener("submit", handleSignUp);
});

async function handleSignUp(e) {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log("ffffffffffff", name, email, password)

  if (!name || !email || !password) {
    alert("All fields are required!");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (data.user) {
      alert("Registration Successful!");
      window.location.href = "login.html";
    }

  } catch (error) {
    console.error("Error:", error);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("signinForm").addEventListener("submit", handleSignIn);
});

async function handleSignIn(e) {
  e.preventDefault();
  const email = document.getElementById("loginemail").value;
  const password = document.getElementById("loginpassword").value;

  if (!email || !password) {
    alert("All fields are required!");
    return;
  }

  try {
    const response = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      alert("Login Successful!");
      window.location.href = "index.html";
    }

  } catch (error) {
    console.error("Error:", error);
  }
}


// const { forgotPassword } = require("../../BackEnd/src/controllers/authController");

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

  // const signUpForm = document.querySelector(".sign-up-container form");
  // const signInForm = document.querySelector(".sign-in-container form");

//   signUpForm.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     handleSignUp();
//   });

  // signInForm.addEventListener("submit", async (e) => {
  //   e.preventDefault();
  //   handleSignIn();
  // });
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

// async function handleSignUp() {
//   clearErrors();
//   const nameInput = document.querySelector(
//     ".sign-up-container input[type='text']"
//   );
//   const emailInput = document.querySelector(
//     ".sign-up-container input[type='email']"
//   );
//   const passwordInput = document.querySelector(
//     ".sign-up-container input[type='password']"
//   );

//   const name = nameInput.value.trim();
//   const email = emailInput.value.trim();
//   const password = passwordInput.value.trim();

//   if (!validateForm(nameInput, emailInput, passwordInput)) return;

//   try {
//     const response = await fetch("http://localhost:8000/api/signup", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ name, email, password }),
//     });
//     const data = await response.json();

//     if (response.ok) {
//       alert("Sign-up successful! Please log in.");
//     } else {
//       showError(emailInput, data.message || "Sign-up failed. Try again.");
//     }
//   } catch (error) {
//     showError(emailInput, "Error signing up. Please try again later.");
//   }
// }

// async function handleSignIn() {
//   clearErrors();
//   const emailInput = document.querySelector(
//     ".sign-in-container input[type='email']"
//   );
//   const passwordInput = document.querySelector(
//     ".sign-in-container input[type='password']"
//   );

//   const email = emailInput.value.trim();
//   const password = passwordInput.value.trim();

//   if (!validateForm(null, emailInput, passwordInput)) return;

//   try {
//     const response = await fetch("http://localhost:8000/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     });
//     const data = await response.json();

//     if (response.ok) {
//       alert("Login successful!");
//       window.location.href = "index.html"; // Redirect on success
//     } else {
//       showError(
//         emailInput,
//         data.message || "Login failed. Check your credentials."
//       );
//     }
//   } catch (error) {
//     showError(emailInput, "Error signing in. Please try again later.");
//   }
// }

// function validateForm(nameInput, emailInput, passwordInput) {
//   let valid = true;

//   if (nameInput && nameInput.value.trim().length < 3) {
//     showError(nameInput, "Name must be at least 3 characters long.");
//     valid = false;
//   }
//   if (!emailInput.value.match(/^\S+@\S+\.\S+$/)) {
//     showError(emailInput, "Invalid email format.");
//     valid = false;
//   }
//   if (passwordInput.value.length < 6) {
//     showError(passwordInput, "Password must be at least 6 characters long.");
//     valid = false;
//   }
//   return valid;
// }


document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("signupForm").addEventListener("submit", handleSignUp);
});

async function handleSignUp(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log("ffffffffffff",name,email,password)

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch("http://localhost:5500/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password})
        });

      const data = await response.json();
      if (data.user) {
            alert("Registration Successful!");
            window.location.href = "index.html";
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
    const response = await fetch("http://localhost:5500/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (data.token) {
      alert("Login Successful!");
      window.location.href = "index.html";
    }

  } catch (error) {
    console.error("Error:", error);
  }
}







 async function sendOtp(){
  let email = document.getElementById("email").value;
  console.log("email",email)
  try{
    const response = await fetch("http://localhost:5500/api/v1/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });
  }
  catch (error){
    console.log(error)
  }
}


        // async function sendOtp() {
        //     const email = document.getElementById("email").value;
        //     const message = document.getElementById("message");
            
        //     try {
        //         const response = await fetch("http://localhost:5500/api/v1/auth/send-otp", {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({ email })
        //         });
                
        //         const data = await response.json();
        //         if (response.ok) {
        //             message.innerText = data.message;
        //             message.style.color = "green";
        //             document.getElementById("otp").style.display = "block";
        //             document.getElementById("verifyOtpBtn").style.display = "block";
        //         } else {
        //             message.innerText = data.message;
        //             message.style.color = "red";
        //         }
        //     } catch (error) {
        //         message.innerText = "Something went wrong!";
        //         message.style.color = "red";
        //     }
        // }
        
        // async function verifyOtp() {
        //     const email = document.getElementById("email").value;
        //     const otp = document.getElementById("otp").value;
        //     const message = document.getElementById("message");
            
        //     try {
        //         const response = await fetch("http://localhost:5000/api/v1/auth/verify-otp", {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({ email, otp })
        //         });
                
        //         const data = await response.json();
        //         if (response.ok) {
        //             message.innerText = data.message;
        //             message.style.color = "green";
        //             document.getElementById("newPassword").style.display = "block";
        //             document.getElementById("confirmPassword").style.display = "block";
        //             document.getElementById("resetBtn").style.display = "block";
        //         } else {
        //             message.innerText = data.message;
        //             message.style.color = "red";
        //         }
        //     } catch (error) {
        //         message.innerText = "Something went wrong!";
        //         message.style.color = "red";
        //     }
        // }
        
        // async function resetPassword() {
        //     const email = document.getElementById("email").value;
        //     const newPassword = document.getElementById("newPassword").value;
        //     const confirmPassword = document.getElementById("confirmPassword").value;
        //     const message = document.getElementById("message");
            
        //     if (newPassword !== confirmPassword) {
        //         message.innerText = "Passwords do not match!";
        //         message.style.color = "red";
        //         return;
        //     }
            
        //     try {
        //         const response = await fetch("http://localhost:5000/api/v1/auth/reset-password", {
        //             method: "POST",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify({ email, newPassword })
        //         });
                
        //         const data = await response.json();
        //         if (response.ok) {
        //             message.innerText = data.message;
        //             message.style.color = "green";
        //             setTimeout(() => { window.location.href = "/login.html"; }, 2000);
        //         } else {
        //             message.innerText = data.message;
        //             message.style.color = "red";
        //         }
        //     } catch (error) {
        //         message.innerText = "Something went wrong!";
        //         message.style.color = "red";
        //     }
        // }
   
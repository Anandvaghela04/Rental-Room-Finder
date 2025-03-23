// this function use for send otp in email
async function sendOtp() {
    let email = document.getElementById("email").value;
    let emailErrorBox = document.getElementById("email-message")

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/forgot-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });

        if (response.ok) {
            document.getElementById("email-field").style.display = "none"; // Hide email field
            document.getElementById("new-pass-field").style.display = "block"; // Show new password field
        } else {
            console.log(response);
            emailErrorBox.innerText = "Unable to send CODE";
             console.log("Error: Unable to send CODE");
        }
    } catch (error) {
         emailErrorBox.innerText = error.message;
        console.log("Fetch error:", error);
    }
}

// This function is calles for reset password
async function resetPassword() {
    let email = document.getElementById("email").value;
    let otp = document.getElementById("code").value;
    let newPassword = document.getElementById("new-pass").value;
    let confirmPassword = document.getElementById("con-pass").value;
    let passwordErrorBox = document.getElementById("reset-message");

    if (newPassword !== confirmPassword) {
        passwordErrorBox.innerText = "Passwords do not match";
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/auth/reset-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, otp, newPassword, confirmPassword })
        });

        if (response.ok) {
            alert("Password reset successfully!");
            window.location.href = "login.html";
        } else {
            console.log(response);
            passwordErrorBox.innerText = "Unable to reset password";
            console.log("Error: Unable to reset password");
        }
    } catch (error) {
        passwordErrorBox.innerText = error.message;
        console.log("Fetch error:", error);
    }
}




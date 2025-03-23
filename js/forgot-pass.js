async function sendOtp() {
    let email = document.getElementById("email").value;

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
            document.getElementById("email-message").innerText = "Unable to send CODE";
            console.log("Error: Unable to send CODE");
        }
    } catch (error) {
        document.getElementById("email-message").innerText = error.message;
        console.log("Fetch error:", error);
    }
}



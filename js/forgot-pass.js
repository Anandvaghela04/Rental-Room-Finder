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
    }
    catch (error) {
        console.log(error)
    }
}



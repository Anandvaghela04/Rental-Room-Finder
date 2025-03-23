// common.js
const BACKEND_URL = "https://rental-room-finder-server.onrender.com";

// check in local storage for user login or not
function checkUserLoggedIn() {
    // get token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
        // if token is not found, redirect to login page
        window.location.href = "login.html";
    } else {
        // if token is found, check if user is logged in by making an API request
        fetch(`${BACKEND_URL}/api/v1/auth/verify`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        })
            .then(response => response.json())
            // check response was false then redirect to login page
            .then(data => {
                if (!data.success) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                }
            })
            // catch any errors
            .catch(error => console.error("Error:", error));
    }
}


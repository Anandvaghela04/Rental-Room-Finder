// common.js
// const BACKEND_URL = "http://127.0.0.1:5000";
const BACKEND_URL = "https://rental-room-finder-server.onrender.com";

// check in local storage for user login or not
function checkUserLoggedIn() {
    // get token from local storage
    const token = localStorage.getItem("token");
    if (!token) {
        // if token is not found, redirect to login page
        window.location.href = "login.html";
        return false;
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
                if (!data.valid) {
                    localStorage.removeItem("token");
                    window.location.href = "login.html";
                    return false;
                }
            })
            // catch any errors
            .catch(error => console.error("Error:", error));
    }
    return true;
}

async function fetchGalleryData(galleryContainer) {
    try {
        const response = await fetch(`${BACKEND_URL}/api/v1/properties/gallery`);
        const properties = await response.json();
        console.log(properties);


        // Generate and insert dynamic property cards
        galleryContainer.innerHTML = properties.map(property => `
            <div class="card-container">
                <div class="card-content">
                    <div class="card-front">
                        <img src="${property.images[0]}" alt="${property.title}">
                    </div>
                    <div class="card-back">
                        <h3>${property.title}</h3>
                        <p>${property.description}</p>
                        <p class="unit">${property.bedrooms} BHK</p>
                        <a href="view_more.html?id=${encodeURIComponent(property._id)}" class="button">View More</a>
                    </div>
                </div>
            </div>
        `).join(""); // Join array elements into a single string

    } catch (error) {
        console.error("Error fetching gallery data:", error);
    }
}

// Convert image to base64
async function convertToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result); // Returns base64 string
        reader.onerror = error => reject(error);
    });
}

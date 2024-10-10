// Import the Kinde PKCE (Proof Key for Code Exchange) authentication library.
// This import points to the ESM version of the library in the local folder.
import createKindeClient from "./@kinde-oss/kinde-auth-pkce-js/dist/kinde-auth-pkce-js.esm.js";
console.log("running");

// Asynchronous function to initialize the Kinde client and set up event listeners for login, register, and logout.
async function setupKinde() {
  // Initialize the Kinde client with required configuration.
  const kinde = await createKindeClient({
    client_id: "8fd32b64318f419a912920d00d972d8c", // Your Kinde application client ID.
    domain: "https://tagtechnologies.kinde.com",   // Your Kinde domain.
    
    // The URL to redirect to after authentication is successful. It uses the current origin (e.g., http://127.0.0.1:5500).
    redirect_uri: window.location.origin,
  });

  // Add event listener to the login button. When clicked, it triggers the Kinde login process.
  document.getElementById("login").addEventListener("click", async () => {
    await kinde.login();
  });

  // Add event listener to the register button. When clicked, it triggers the Kinde registration process.
  document.getElementById("register").addEventListener("click", async () => {
    await kinde.register();
  });

  // Add event listener to the logout button. When clicked, it logs the user out and switches the view.
  document.getElementById("logout").addEventListener("click", async () => {
    await kinde.logout();
    toggleView(); // Switch to the logged-out view.
  });

  // Attempt to retrieve the user's token to check if they are already logged in.
  try {
    const token = await kinde.getToken(); // Retrieve the access token if the user is authenticated.
    if (token) {
      const userDetails = await kinde.getUser(); // Fetch the user's details from the Kinde service.
      displayUserDetails(userDetails); // Call a function to display the user's details on the page.
      toggleView(true); // Switch to the logged-in view.
    }
  } catch (error) {
    console.error("Authentication error:", error); // Handle any errors related to authentication.
  }
}

// Function to display user details (name, email, profile picture) in the logged-in view.
function displayUserDetails(userDetails) {
  // Set the user's name by concatenating their given name and family name.
  document.getElementById("user-name").textContent =
    userDetails.given_name + " " + userDetails.family_name;

  // Set the user's email address.
  document.getElementById("user-email").textContent = userDetails.email;

  // If the user has a profile picture, display it. Otherwise, use a default image.
  if (userDetails.picture) {
    document.getElementById("user-img").src = userDetails.picture;
  } else {
    const imgElement = document.getElementById("user-img");
    imgElement.src = "./img/pngwing.com(20).png"; // Default image if no picture is available.
  }
}

// Function to toggle the view between logged-in and logged-out states.
function toggleView(isLoggedIn = false) {
  const loggedOutView = document.getElementById("logged_out_view"); // Reference to the logged-out view.
  const loggedInView = document.getElementById("logged_in_view");   // Reference to the logged-in view.

  // If the user is logged in, hide the logged-out view and show the logged-in view.
  if (isLoggedIn) {
    loggedOutView.style.display = "none";
    loggedInView.style.display = "block";
  } else {
    // If the user is logged out, show the logged-out view and hide the logged-in view.
    loggedOutView.style.display = "block";
    loggedInView.style.display = "none";
  }
}

// Call the setupKinde function to set up the Kinde client and attach event listeners.
setupKinde();

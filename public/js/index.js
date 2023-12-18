
window.addEventListener("scroll", function () {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  document.querySelector(".progress-bar").style.width = scrolled + "%";


});

// Registration script

document.addEventListener("DOMContentLoaded", function() {
const form = document.getElementById("registerForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (e) => {
  const errors = [];

  if (username.value.trim() === "") {
    errors.push("Username Required!");
  }

  if (username.value.length < 4) {
    errors.push("Username Can't be less than 4 Characters");
  }

  if (password.value.length < 4) {
    errors.push("Password must be at least 4 characters");
  }

  if (errors.length > 0) {
    errorMessage.textContent = errors.join(", ");
    errorMessage.removeAttribute("hidden");
    e.preventDefault(); // Prevent form submission if there are errors
  } else {
    errorMessage.setAttribute("hidden", true);
    // Proceed with form submission
    submitForm();
  }
});

// Function to submit the form
function submitForm() {
  const formData = new FormData(form);
  fetch("/register", {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error submitting form");
      }
      // Handle success if needed
    })
    .catch((error) => {
      console.error("Form submission error:", error);
    });
}


});


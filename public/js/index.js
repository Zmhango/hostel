
      const username = document.getElementById("username");
      const password = document.getElementById("password");
      const email = document.getElementById("email");
      const errorMessage = document.getElementById("errorMessage");
      const form = document.querySelector("form");

      form.addEventListener("submit", (e) => {
        const errors = [];

        if (username.value.trim() === "") {
          errors.push("Username Required!");
        }
        if (username.value.length < 4) {
          errors.push("Username Can't be less than 4 Characters");
        }
        if (password.value.length < 8) {
          errors.push("Password must be atleast 4 characters");
        }

        if (errors.length > 0) {
          e.preventDefault();
          errorMessage.toggleAttribute("hidden");
          errorMessage.innerHTML = errors.join(", ");
        }
      });

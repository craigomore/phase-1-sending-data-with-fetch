// Add your code here
// If running in Node during tests, bring in fetch
if (typeof window === "undefined") {
  global.fetch = require("node-fetch");
}

function submitData(name, email) {
  // The data we want to send
  const formData = {
    name: name,
    email: email,
  };

  // Configuration for fetch
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(formData),
  };

  // Return fetch so tests can hook into it
  return fetch("http://localhost:3000/users", configObj)
    .then((resp) => resp.json())
    .then((data) => {
      // Append the new user's id to the DOM
      const body = document.querySelector("body");
      const p = document.createElement("p");
      p.textContent = `New user id: ${data.id}`;
      body.appendChild(p);
      return data;
    })
    .catch((error) => {
      // Append the error message to the DOM
      const body = document.querySelector("body");
      const p = document.createElement("p");
      p.textContent = error.message;
      body.appendChild(p);
    });
}

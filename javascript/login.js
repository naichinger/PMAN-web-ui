import { setCookie } from '/javascript/cookies.js';

document.getElementById("login-form").addEventListener("submit", function(e) {
    const params = {
        username: document.getElementById("form-username").value,
        password: document.getElementById("form-password").value
    };
    const json_params = JSON.stringify(params);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": json_params.length
        },
        body: json_params
    };
    fetch( 'http://localhost:8080/auth/login', options )
        .then( response => response.text())
        .then( response => {
            setCookie('token', response, 1);
            window.location.replace("/overview.html");
        } );
    e.preventDefault();
  });
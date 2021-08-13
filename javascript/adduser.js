import { getCookie } from '/javascript/cookies.js';

document.getElementById("add-user-form").addEventListener("submit", function (e) {
    const params = {
        application: document.getElementById("form-website").value,
        user: document.getElementById("form-username").value,
        password: document.getElementById("form-password").value,
    };
    const json_params = JSON.stringify(params);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Length": json_params.length,
            "Token": getCookie('token')
        },
        body: json_params
    };
    fetch( 'http://localhost:8080/overview/add', options )
        .then( response => {
            console.log(response);
            if(response.ok) {
                window.location.replace("/overview.html");
            }else {
                alert("Adding User failed!");
            }
        } );
    e.preventDefault();
});
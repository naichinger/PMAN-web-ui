import { setCookie } from '/javascript/cookies.js';
import { PMAN_IP } from '/javascript/constants.js';

var notification_div = document.getElementById("notification-div");

function sendNotification(message) {
    notification_div.style.display = 'block';
    notification_div.innerHTML = message;
}

document.getElementById("login-form").addEventListener("submit", function (e) {
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
    fetch(PMAN_IP + '/auth/login', options)
        .then(response => {
            if (response.ok) {
                response.text().then(session_token => {
                    setCookie('token', session_token, 1);
                    window.location.replace("/overview.html");
                });
            } else {
                if(response.status === 403) {
                    sendNotification('Login failed: wrong Username/Password');
                }else {
                    sendNotification('Login failed with status code: ' + response.status);
                }
            }
        });
    e.preventDefault();
});
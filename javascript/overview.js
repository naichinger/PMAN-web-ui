import { getCookie } from '/javascript/cookies.js';
import { logout } from '/javascript/account.js';
import { PMAN_IP } from '/javascript/constants.js';

const usersMap = new Map();
const selWebsite = document.getElementById("selected-website");
const selUsername = document.getElementById("selected-username");
const selPassword = document.getElementById("selected-password");

function createUserElement(website, user, nr) {
    var aTag = document.createElement("a");
    //aTag.href = "#"+href;
    aTag.classList.add("list-group-item");
    aTag.classList.add("list-group-item-action");
    aTag.innerHTML = website;
    aTag.onclick = () => selectedItemChanged(nr);

    var pTag = document.createElement("small");
    pTag.innerHTML = user;

    aTag.appendChild(document.createElement("br"));
    aTag.appendChild(pTag);
    return aTag;
}

function selectedItemChanged(nr) {
    var user = usersMap.get(nr);
    selWebsite.innerHTML = user.application;
    selUsername.innerHTML = user.username;
    selPassword.innerHTML = '*************';
}

let token = getCookie('token');
if (token === '') {
    window.location.replace("/");
} else {
    const options = {
        method: "GET",
        headers: {
            "Token": token
        }
    };
    fetch(PMAN_IP + '/overview', options)
        .then(response => {
            if (!response.ok) {
                logout();
            } else {
                var id = 1;
                response.json().then(users => {
                    var div = document.getElementById("users-list");
                    users.forEach(element => {
                        usersMap.set(id, {application: element.application, username: element.user});
                        div.appendChild(createUserElement(element.application, element.user, id++));
                    });
                });
            }
        });
}
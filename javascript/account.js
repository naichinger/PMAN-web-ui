import {setCookie} from '/javascript/cookies.js';

export function logout() {
    setCookie('token', '<INVALID TOKEN>', -1);
    window.location.replace("/");    
}
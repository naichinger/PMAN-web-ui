document.getElementById("register-form").addEventListener("submit", function(e) {
    const params = {
        username: document.getElementById("form-username").value,
        password: document.getElementById("form-password").value,
        email: document.getElementById("form-email").value,
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
    fetch( 'http://localhost:8080/auth/register', options )
        .then( response => {
            console.log(response);
            if(response.ok) {
                window.location.replace("/login.html");
            }else {
                alert("Register failed!");
            }
        } );
    e.preventDefault();
  });
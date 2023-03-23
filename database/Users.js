const sighnup = (email, password) => {
    const signupres = fetch("http://localhost/API/Auth/signup.php", {
        method: "POST",
        //mode: "no-cors",
        header: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then((response) => response.json())
        .then((responseJson) => {
            alert(responseJson.status);
        })
        .catch((error) => {
            alert(error);
        });
}
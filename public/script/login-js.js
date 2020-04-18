var email = document.getElementById("email");
var password = document.getElementById("password");
var submit = document.getElementById("submit");
var invalid = 1;

submit.addEventListener("click", function () {
    if (!email.value == "" && !password.value == "") {
        var xml = new XMLHttpRequest();
        xml.open("POST", "/userTable/checkLogin");
        xml.addEventListener("load", function () {
            var data = xml.responseText;
            if (data === "Logined")
                window.location = "/home";
            else {
                alert("Username/Password Incorrect")
            }
        });
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(
            JSON.stringify({
                email: email.value,
                password: password.value
            })
        );
    } else alert("Enter Value on field");
});

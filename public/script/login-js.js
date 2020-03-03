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
            if (data === "Logined") {
                window.location = "/home";
            } else if (data == "not") window.location = "/editprofile";
            else addInvalidDOM();
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

function addInvalidDOM() {
    if (invalid) {
        invalid = 0;
        var center = document.getElementById("addInvalid");
        var div = document.createElement("div");
        div.setAttribute("class", "alert alert-danger");
        div.setAttribute("style", "width:90%");
        div.innerHTML = "Username/Password Incorrect.";
        center.appendChild(div);
    }
}
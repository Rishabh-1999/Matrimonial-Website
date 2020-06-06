$(function () {
    $('#login-form-link').click(function (e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function (e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
});

var email = document.getElementById("email");
var password = document.getElementById("password");
var submit = document.getElementById("submit");

submit.addEventListener("click", function () {
    if (!(email.value).trim() == "" && !(password.value).trim() == "") {
        var xml = new XMLHttpRequest();
        xml.open("POST", "/user/checkLogin");
        xml.addEventListener("load", function () {
            var data = xml.responseText;
            if (data == "Logined")
                window.location = "/user/home";
            else
                alert("Usernames/Password Incorrect")
        });
        xml.setRequestHeader("Content-Type", "application/json");
        xml.send(
            JSON.stringify({
                email: (email.value).trim(),
                password: (password.value).trim()
            })
        );
    } else
        alert("One or More Fields are Empty");
});

var first_name = document.getElementById('first_name');
var last_name = document.getElementById('last_name');
var user_email = document.getElementById('user_email');
var user_password = document.getElementById('user_password');
var user_phoneno = document.getElementById('user_phoneno');
var user_gender = document.getElementById('user_gender');
var user_submit = document.getElementById('user_submit');
var user_dob = document.getElementById("user_dob");

user_submit.addEventListener("click", function () {

    if ((first_name.value).trim() == '' || (user_dob.value).trim() == null || (last_name.value).trim() == '' || (user_email.value).trim() == '' ||
        (user_gender.value).trim() == '' || (user_phoneno.value).trim() == '' || (user_password.value).trim() == '') {
        alert('One or More Fields are Empty')
        return;
    } else if (((user_phoneno.value).trim()).length < 10 || ((user_phoneno.value).trim()).length > 10) {
        alert('Phone No is Not Correct')
        return;
    }
    if (!ValidateEmail((user_email.value).trim())) {
        $.confirm({
            title: 'Email format ?',
            content: "Email format is not valid !! ",
            draggable: true,
            buttons: {
                OK: {
                    btnClass: 'btn-danger any-other-class',
                    action: function () {}
                },
            }
        });
        return;
    }

    var obj = new Object();
    obj.firstname = first_name.value;
    obj.lastname = last_name.value;
    obj.email = user_email.value;
    obj.gender = user_gender.value;
    obj.user_phoneno = user_phoneno.value;
    obj.password = user_password.value;
    obj.dob = (user_dob.value);

    var request = new XMLHttpRequest();
    request.open('POST', "/user/registerUser");
    request.addEventListener("load", function () {
        var data = xml.responseText;
        if (data == "done") {
            alert("Successfully Registered")
            window.location = "/";
        } else {
            alert("Failed to Register")
        }
    });
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(obj))
})

function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        return (true)
    return (false)
}
var first_name = document.getElementById('first_name');
var last_name = document.getElementById('last_name');
var user_email = document.getElementById('user_email');
var user_password = document.getElementById('user_password');
var user_phoneno = document.getElementById('user_phoneno');
var user_gender = document.getElementById('user_gender');
var user_submit = document.getElementById('user_submit');
var user_dob = document.getElementById("user_dob");

user_submit.addEventListener("click", function () {
	if (first_name.value == '' || user_dob.value == null || last_name.value == '' || user_email.value == '' ||
		user_gender.value == '' || user_phoneno.value == '' || user_password.value == '') {
		alert('field is empty')
		return;
	} else if (user_phoneno.value.length < 10 || user_phoneno.value.length > 10) {
		alert('Phone no is not correct')
		return;
	}
	if (!ValidateEmail(user_email.value)) {
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
	request.open('POST', "/userTable/registerUser");
	request.setRequestHeader("Content-Type", "application/json");
	request.send(JSON.stringify(obj))
	request.addEventListener("load", function () {
		alert("You are registered");
		window.location = "/";
	});
})

function ValidateEmail(mail) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
		return (true)
	}
	return (false)
}
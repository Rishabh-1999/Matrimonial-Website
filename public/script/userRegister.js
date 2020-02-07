var first_name = document.getElementById('first_name');
var last_name = document.getElementById('last_name');
var user_email = document.getElementById('user_email');
var user_password = document.getElementById('user_password');
var user_phoneno = document.getElementById('user_phoneno');
var user_gender = document.getElementById('user_gender');
var user_submit = document.getElementById('user_submit');

user_submit.addEventListener("click", function() {
	var obj = new Object();
	obj.firstname = first_name.value;
	obj.middlename = "-";
	obj.lastname = last_name.value;
	obj.religion = "-";
	obj.email = user_email.value;
	obj.gender = user_gender.value;
	obj.password = user_password.value;
	obj.DOB = "-";
	obj.mothertongue = "-";
	obj.phoneno = "-";
	obj.photourl = "-";
	obj.education = "-";
	obj.height = "-";
	obj.weight = "-";
	obj.isVerified = false;
	obj.isDoingJob = false;
	obj.isActive = false;

	var request = new XMLHttpRequest();
	request.open('POST',"/userTable/registerUser");
	request.setRequestHeader("Content-Type","application/json");
	request.send(JSON.stringify(obj))
	request.addEventListener("load",function() {
	   alert("You are registered");
	   window.location = "/";
	});
})
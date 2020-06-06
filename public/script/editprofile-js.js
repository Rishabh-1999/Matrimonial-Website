document.getElementById("submit").addEventListener("click", function () {
    var obj = new Object();
    obj.firstname = document.getElementById("firstname").value;
    obj.email = document.getElementById("email").value;
    obj.gender = document.getElementById("gender").value;
    obj.photourl = document.getElementById("photourl").value;
    obj.DOB = document.getElementById("DOB").value;

    obj.middlename = document.getElementById("middlename").value;
    obj.lastname = document.getElementById("lastname").value;
    obj.religion = document.getElementById("religion").value;
    obj.mothertongue = document.getElementById("mothertongue").value;
    obj.phoneno = document.getElementById("phoneno").value;
    obj.height = document.getElementById("height").value;
    obj.weight = document.getElementById("weight").value;
    obj.address1 = document.getElementById("address1").value;
    obj.city = document.getElementById("city").value;
    obj.state = document.getElementById("state").value;
    obj.isDoingJob = document.getElementById("isDoingJob").value;

    var xml = new XMLHttpRequest();
    xml.open("POST", "/user/updateprofile");
    xml.setRequestHeader("Content-Type", "application/json");
    xml.addEventListener('load', function () {
        var result = xml.responseText;
        if (result == "201") {
            alert("Profile Updated")
            window.location = "/user/home"
        } else
            window.alert("Due to Some to reason profile update failed")
    })
    xml.send(JSON.stringify(obj));
})
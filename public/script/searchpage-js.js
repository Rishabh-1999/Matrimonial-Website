var sliderLeft = document.getElementById("slider0to50");
var sliderRight = document.getElementById("slider51to100");
var inputMin = document.getElementById("min");
var inputMax = document.getElementById("max");

///value updation from input to slider
//function input update to slider
function sliderLeftInput() {
    //input udate slider left
    sliderLeft.value = inputMin.value;
}

function sliderRightInput() {
    //input update slider right
    sliderRight.value = inputMax.value; //chnage in input max updated in slider right
}

//calling function on change of inputs to update in slider
inputMin.addEventListener("change", sliderLeftInput);
inputMax.addEventListener("change", sliderRightInput);

///value updation from slider to input
//functions to update from slider to inputs
function inputMinSliderLeft() {
    //slider update inputs
    inputMin.value = sliderLeft.value;
}

function inputMaxSliderRight() {
    //slider update inputs
    inputMax.value = sliderRight.value;
}
sliderLeft.addEventListener("change", inputMinSliderLeft);
sliderRight.addEventListener("change", inputMaxSliderRight);

//start here

var start = 0;
var end = 5;
var tempdata = [];
var disableright = false;

var totaldata;
$(document).ready(function () {
    searchdata();
})

function searchdata() {
    disableright = false;
    let obj = new Object();
    if (document.getElementById("min").value != '') {
        obj.minage = document.getElementById("min").value
    }
    if (document.getElementById("max").value != '') {
        obj.maxage = document.getElementById("max").value
    }
    if (document.getElementById("education").value != 'Choose...') {
        obj.education = document.getElementById("education").value
    }
    if (document.getElementById("religion").value != 'Choose...') {
        obj.religion = document.getElementById("religion").value
    }
    if (document.getElementById("searchinput").value != '') {
        obj.searchinput = document.getElementById("searchinput").value
    }

    obj.start = start;
    obj.end = end;

    document.getElementById('searchinput').innerHTML = "";
    document.getElementById("maincontainer").innerHTML = "";

    var xml = new XMLHttpRequest()
    xml.open("POST", "/user/getDataByPagingfunction")
    xml.onload = function () {
        document.getElementById('searchinput').innerHTML = "";
        var d = JSON.parse(xml.responseText);
        if (d.length != 5 || d == null)
            disableright = true;
        tempdata = d;
        for (var i = 0; i < tempdata.length; i++) {
            addToDOM(tempdata[i])
        }
    }
    xml.setRequestHeader("Content-Type", "application/json");
    xml.send(JSON.stringify(obj));
}


function increaseleft() {
    if (start - 5 < 0)
        return;
    start -= 5;
    searchdata();
}

function increaseright() {
    if (disableright)
        return;
    start += 5;
    searchdata();
}

function addToDOM(obj) {
    var div1 = `<div id="${obj._id}" class="container mr-auto border border-dark mb-3 rounded" style="background-color:#d6d6d6">
            <div id="card">
                <div class="col-sm-12" style="display: flex;">
                    <div class="col-sm-3" style="padding:5px;flex:1;">
                        <img src="${obj.user.photourl}"
                            class="pic figure-img img-fluid"  />
                    </div>

                    <div class="col-sm-9 text-lg-left" style="padding:20px;">
                    <div style="margin-top : 40px">
                        <h4><b>Name : </b>${obj.user.firstname} ${obj.lastname}</h4>
                        <h4><b>Age : </b>${obj.age}</h4>
                        <h4><b>Hightest Education : </b>${obj.education}</h4>
                        <h4><b>Religion : </b>${obj.religion}</h4>
                        <a href="/user/${obj.user._id}" style="color:#fff;"><button class="btn btn-primary">Check Details</button></a>
                    </div>
                </div>
            </div>
        </div>`
    document.getElementById('maincontainer').innerHTML = document.getElementById('maincontainer').innerHTML +
        div1;
}

document.getElementById('submitsearch').onclick = function () {
    searchdata()
}
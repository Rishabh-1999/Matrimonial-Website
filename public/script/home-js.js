var request1 = new XMLHttpRequest();
request1.open('GET', '/userTable/getRecommendationUser');
request1.send();
request1.onload = function () {
    var data = JSON.parse(request1.responseText);
    for (i in data) {
        addToDom(data[i]);
    }
}

function addToDom(obj) {

    var div = document.createElement('div');
    div.setAttribute("class", "col-sm-6")

    var div1 = document.createElement('div');
    div1.setAttribute("class", "card");

    var div2 = document.createElement('div');
    div2.setAttribute("class", "card-body d-flex");

    var div3 = document.createElement('div');
    div3.setAttribute("class", "m-2");

    var img = document.createElement('img');
    img.setAttribute("class", "card-img-top");
    img.style.height = '200px';
    img.style.width = '200px';
    img.src = obj.photourl;

    div3.appendChild(img);

    var div4 = document.createElement('div');
    div4.setAttribute("class", "m-2");

    var h = document.createElement('h5');
    h.setAttribute("class", "card-title");
    h.innerHTML = obj.firstname;

    var p = document.createElement('p');
    p.setAttribute("class", "card-text");
    p.innerHTML = "Description 2";

    var a = document.createElement('a');
    a.src = "#"
    a.setAttribute("class", "btn btn-primary");
    a.innerHTML = "Check details";

    div4.appendChild(h);
    div4.appendChild(p);
    div4.appendChild(a);

    div2.appendChild(div3);
    div2.appendChild(div4);
    div1.appendChild(div2);
    div.appendChild(div1);

    document.getElementById("profiless").appendChild(div);
}
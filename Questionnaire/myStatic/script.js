"use strict";

function runAds() {
    alert("ad is running");
}

var answer = ["A"];

function checkAnswers () {
    var radios = document.getElementsByName("option");
    console.log(radios);
    for(var i=0; i<radios.length; i++)
        if(radios[i].checked) {
            if (radios[i].value==answer) {
                alert("you are correct");
            } else {
                alert("you are wrong");
            }
        }
}
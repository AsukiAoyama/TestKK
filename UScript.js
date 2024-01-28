/*****************************************Variables***********************************************/ 
let Feather = "24F6";

let button1 = document.querySelector(".button1");
let button2 = document.querySelector(".button2");
let button3 = document.querySelector(".button3");
let button4 = document.querySelector(".button4");

let OpenMenuButton = document.querySelector(".Settings");
let CloseMenuButton = document.querySelector(".CloseMenuButton");

let ModeContainer = document.querySelector(".Mode-Container");
let RelayContainer1 = document.querySelector(".Relay-Container-1");
let RelayContainer2 = document.querySelector(".Relay-Container-2");
let PasswordContainer = document.querySelector(".Password-Container");
let MenuBar = document.querySelector(".Container-Menu");

let E1 = document.querySelector("#Menu-Element-1");
let E2 = document.querySelector("#Menu-Element-2");
let E3 = document.querySelector("#Menu-Element-3");
let E4 = document.querySelector("#Menu-Element-4");
let E5 = document.querySelector("#Menu-Element-5");


E1.addEventListener('click', SetOne);
E2.addEventListener('click', SetTwo);
E3.addEventListener('click', SetThree);
E4.addEventListener('click', SetFour);
E5.addEventListener('click', SetFive);


function SetOne(){
CloseMenu();
document.querySelector('.U-Switch-Mode').innerHTML = "Einfach-Taster";

RelayContainer1.style.display = "block";
RelayContainer2.style.display = "none";
button4.style.display = "none";
button3.style.display = "block";
button2.style.display = "none";
button1.style.display = "none";
}

function SetTwo(){
  CloseMenu();
  document.querySelector('.U-Switch-Mode').innerHTML = "Zweifach-Taster";

  RelayContainer1.style.display = "block";
  RelayContainer2.style.display = "block";
  button4.style.display = "block";
  button3.style.display = "block";
  button2.style.display = "none";
  button1.style.display = "none";
}

function SetThree(){
  CloseMenu();
  document.querySelector('.U-Switch-Mode').innerHTML = "Einfach-Schalter";

  RelayContainer1.style.display = "block";
  RelayContainer2.style.display = "none";
  button4.style.display = "none";
  button3.style.display = "none";
  button2.style.display = "none";
  button1.style.display = "block";
}

function SetFour(){
  CloseMenu();
  document.querySelector('.U-Switch-Mode').innerHTML = "Zweifach-Schalter";

  RelayContainer1.style.display = "block";
  RelayContainer2.style.display = "block";
  button4.style.display = "none";
  button3.style.display = "none";
  button2.style.display = "block";
  button1.style.display = "block";
}

function SetFive(){
  CloseMenu();
  document.querySelector('.U-Switch-Mode').innerHTML = "Kreuzschalter";

  RelayContainer1.style.display = "block";
  RelayContainer2.style.display = "none";
  button4.style.display = "none";
  button3.style.display = "none";
  button2.style.display = "none";
  button1.style.display = "block";
}
/*****************************************Detect-Buttons******************************************/ 
let SubmitButton = document.querySelector(".Password-Submit").addEventListener('click', CheckPassword);

button1.addEventListener('click', StartToggleRelay1);
button2.addEventListener('click', StartToggleRelay2);

OpenMenuButton.addEventListener('click', OpenMenu);
CloseMenuButton.addEventListener('click', CloseMenu);

/*****************************************Check-Password******************************************/ 
document.addEventListener("keydown", function(event) {

  if (event.key === "Enter" || event.keyCode === 13) {

    CheckPassword();
  }
});

function CheckPassword(){
  let Book = parseInt(Feather, 16);

  let Input = document.querySelector(".Password-Input").value;

  Input = parseInt(Input, 10);

  if(Input === Book){
    PasswordContainer.style.display = "none";
    ModeContainer.style.display = "block";
    OpenMenuButton.style.display = "block"
  }
  else{
    PasswordContainer.style.display = "block";
    ModeContainer.style.display = "none";
    OpenMenuButton.style.display = "none"
  }
}

/*****************************************Toggle-Relays*******************************************/ 
function StartToggleRelay1() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/ToggleRelay1', true);
  xhr.send();
}

function StartToggleRelay2() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '/ToggleRelay2', true);
    xhr.send();
}  

/*****************************************Check-Relay-States**************************************/ 
setInterval(function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        UpdateRelay1State(xhr.responseText);
    }
  };
  xhr.open('GET', '/CkeckRelay1State', true);
  xhr.send();
}, 100);

setInterval(function() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        UpdateRelay2State(xhr.responseText);
      }
    };
    xhr.open('GET', '/CkeckRelay2State', true);
    xhr.send();
  }, 100);

/*****************************************Check-Switch-Mode*****************************************/ 
setInterval(function() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        UpdateSwitchMode(xhr.responseText);
    }
  };
  xhr.open('GET', '/CheckSwitchMode', true);
  xhr.send();
}, 100);

/*****************************************Update-Relay-States*************************************/ 
function UpdateRelay1State(state) {
  document.getElementById('Relay-1-State').innerHTML = state;
}

function UpdateRelay2State(state) {
    document.getElementById('Relay-2-State').innerHTML = state;
}

/*****************************************Update-Mode*********************************************/ 
function UpdateSwitchMode(state) {

  document.querySelector('.U-Switch-Mode').innerHTML = state;

  var stateString = String(state);

  if (stateString === "Einfach-Taster") {
    RelayContainer1.style.display = "block";
    RelayContainer2.style.display = "none";
    button1.style.display = "none";
    button3.style.display = "block";
  } 
  else if (stateString === "Zweifach-Taster") {
    RelayContainer1.style.display = "block";
    RelayContainer2.style.display = "block";
    button1.style.display = "none";
    button2.style.display = "none";
    button3.style.display = "block";
    button4.style.display = "block";
  } 
  else if (stateString === "Einfach-Schalter") {
    RelayContainer1.style.display = "block";
    button1.style.display = "block";
    button3.style.display = "none";
  } 
  else if (stateString === "Zweifach-Schalter") {
    RelayContainer1.style.display = "block";
    RelayContainer2.style.display = "block";
    button1.style.display = "block";
    button2.style.display = "block";
    button3.style.display = "none";
    button4.style.display = "none";
  } 
  else {
    RelayContainer1.style.display = "none";
    RelayContainer2.style.display = "none";
  }
}

function OpenMenu(){
  MenuBar.style.left = "0vw";
}

function CloseMenu(){
  MenuBar.style.left = "-51vw";
}

var green = document.getElementById("lightgreen");
var cyan = document.getElementById("darkcyan");
var orange = document.getElementById("orange");
var violet = document.getElementById("violet");

var start = document.getElementById("start");
var strict = document.getElementById("strict");

var counter = document.getElementById("round");
var strictShower = document.getElementById("onStrict");

var mySwitch = document.getElementById("switch");
var swBtn = document.getElementById("btn");

var isOn = false;
var isStrict = false;
var loopNumber = 0;
var canStrict = true;
var colors = [green, cyan, orange, violet];
var list = [];
var colorsPressed = [];
var isPlayable = false;
var getWrong = false;
var timer = 1500;
var darkTimer = 1000;

var gAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
var cAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
var oAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
var vAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");

function OnOff() {
  if(isOn) {
    var _mobile = window.getComputedStyle(swBtn, null).getPropertyValue("left");
    if(_mobile == "25px") {
      swBtn.style.left = "5px";
    } else {
      swBtn.style.left = "10px";
    }
    
    counter.style.visibility = "hidden"
    isOn = false;
    ClearAll();
    
    if(isStrict) {
      strictShower.style.backgroundColor = "black";
      isStrict = false;
    }
    
  } else {
    var _mobile = window.getComputedStyle(swBtn, null).getPropertyValue("left");
    if(_mobile == "5px") {
      swBtn.style.left = "25px";
    } else if(_mobile == "25px") {
      swBtn.style.left = "5px"
    } else {
      swBtn.style.left = "50px";
    }
    
    counter.style.visibility = "visible"
    counter.style.left = "25%";
    isOn = true;
  }
}

function StrictMode() {
  if(isOn && canStrict) {
    if(isStrict) {
      strictShower.style.backgroundColor = "black";
      isStrict = false;
    } else {
      strictShower.style.backgroundColor = "#F3F781";
      isStrict = true;
    }
  } else if(!canStrict && isOn && !isStrict) {
    alert("You can't play in Strict Mode if you already win the 1st turn.");
  } else if(!canStrict && isOn && isStrict) {
    alert("You can't play in Normal Mode if you already win the 1st turn in Strict Mode.");
  }
}

function ChooseColors() {
    var num = Math.floor((Math.random() * 4));
    list.push(colors[num]);
}

function playGame() {
  isPlayable = false;
  
  if(!getWrong) {
    loopNumber++;
    
    if(loopNumber > 20) {
      alert("YOU WIN!!!");
      StartGame();
      return;
    }
    
    ChooseColors();
  }
  
  if(loopNumber < 10) {
    counter.textContent = "0" + loopNumber;
  } else {
    counter.textContent = loopNumber;
  }
  
  if(loopNumber > 1) {
    canStrict = false;
  } else {
    canStrict = true;
  }
  
    var i = 0;
    var time = 0;
    colorsPressed = [];
    
    loop = window.setInterval(function() {
      var id = list[i].id;      
      switch(id) {
        case "lightgreen":
          list[i].style.backgroundColor = "#3ADF00";
          gAudio.play();
          break;
          
        case "darkcyan":
          list[i].style.backgroundColor = "cyan";
          cAudio.play();
          break;
          
        case "orange":
          list[i].style.backgroundColor = "#FE9A2E";
          oAudio.play();
          break;
          
        case "violet":
          list[i].style.backgroundColor = "#B40486";
          vAudio.play();
          break;
      }
      
      Dark(i);
      
      i++;
      if(i >= loopNumber) {
        window.clearInterval(loop);
        setTimeout(function() {
          getWrong = false;
          colorsPressed = [];
          isPlayable = true;
        }, timer - 150);
        if(loopNumber == 4) {timer = 1250; darkTimer = 900}
        else if(loopNumber == 8) {timer = 950; darkTimer = 750}
        else if(loopNumber == 12) {timer = 650; darkTimer = 450}
      }
      
    }, timer);
}

function StartGame() {
  if(isOn) {
    ClearAll();
    counter.style.left = "12%";
    playGame();
  }
}

function Dark(i) {
  setTimeout(function() {
    switch(list[i].id) {
      case "lightgreen":
        list[i].style.backgroundColor = "#38610B";
        break;
        
      case "darkcyan":
        list[i].style.backgroundColor = "#0B3B39";
        break;
        
      case "orange":
        list[i].style.backgroundColor = "#DF7401";
        break;
        
      case "violet":
        list[i].style.backgroundColor = "#610B38";
        break;
    }
  }, darkTimer);
}

function PressedColor(value) {
  var equals = false;
  if(isOn) {
    if(isPlayable) {
    switch(value) {
      case 1:
        colorsPressed.push(green);
        green.style.backgroundColor = "#3ADF00";
        gAudio.play();
        setTimeout(function() {
          green.style.backgroundColor = "#38610B";
        }, 500);
        break;

      case 2:
        colorsPressed.push(cyan);
        cyan.style.backgroundColor = "cyan";
        cAudio.play();
        setTimeout(function() {
          cyan.style.backgroundColor = "#0B3B39";
        }, 500);
        break;

      case 3:
        colorsPressed.push(orange);
        orange.style.backgroundColor = "#FE9A2E";
        oAudio.play();
        setTimeout(function() {
          orange.style.backgroundColor = "#DF7401";
        }, 500);
        break;

      case 4:
        colorsPressed.push(violet);
        violet.style.backgroundColor = "#B40486";
        vAudio.play();
        setTimeout(function() {
          violet.style.backgroundColor = "#610B38";
        }, 500);
        break;
    }

    
      for(var i = 0; i < colorsPressed.length; i++) {
        if(colorsPressed[i] != list[i]) {
          counter.textContent = "!!";
          isPlayable = false;
          setTimeout(function() {
            if(isStrict) {
              StartGame();
            } else {
              getWrong = true;
              playGame();
            }
          }, 2000);
        }
      }

      for(var i = 0; i < list.length; i++) {
        if(colorsPressed[i] == list[i]) {
          equals = true;
        } else {equals = false}
      }

      if(equals) {playGame()}
    }
  }
}

function ClearAll() {
  if(typeof loop !== "undefined") {
    window.clearInterval(loop);
  }  
  green.style.backgroundColor = "#38610B";
  cyan.style.backgroundColor = "#0B3B39";
  orange.style.backgroundColor = "#DF7401";
  violet.style.backgroundColor = "#610B38";
  list = [];
  colorsPressed = [];
  loopNumber = 0;
  counter.textContent = "--";
  isPlayable = false;
  timer = 1500;
  darkTimer = 1000;
  canStrict = true;
}
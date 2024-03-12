var currentPage = "blackSquare";
var triesTip = 5;
document.addEventListener("DOMContentLoaded", function () {
  var hiddenImage = document.getElementById("hiddenImage");
  $("#blackSquare").show();
  $("#foundSquare").hide();
  $("#date").hide();
  $("#map").hide();
  $("#shrek").hide();
  $("#riddle").hide();

  // Make the image visible and clickable when the document is loaded

  hiddenImage.style.pointerEvents = "auto";

  // Add an event listener for the image click
  hiddenImage.addEventListener("click", function () {
    currentPage = "foundSquare";
    hiddenImage.style.opacity = 1;
    document.body.style.background =
      "linear-gradient(315deg,rgba(101, 0, 94, 1) 3%,rgba(60, 132, 206, 1) 38%,rgba(48, 238, 226, 1) 68%,rgba(255, 25, 25, 1) 98%)";
    document.body.style.backgroundSize = "400% 400%";
    document.body.style.backgroundAttachment = "fixed";
    $("#foundSquare").show();
    $("#blackSquare").hide();
  });
});
buttonArray = ["startBtn1", "startBtn2", "startBtn3"];
buttonArray.forEach(function (button, i) {
  document.getElementById(button).addEventListener("mouseover", function () {
    if (document.getElementById(button).style.opacity == 1) {
      document.getElementById(button).style.opacity = 0;
      if (i != 2) {
        document.getElementById(buttonArray[i + 1]).style.opacity = 1;
      } else {
        document.getElementById("startBtn4").style.opacity = 1;
      }
    }
  });
});
document.getElementById("startBtn4").addEventListener("click", function () {
  $("#foundSquare").hide();
  $("#date").show();

  document.addEventListener("keydown", function (event) {
    if (triesTip != 0) {
      [...document.getElementsByClassName(`${event.key}`)].forEach(
        (element, index, array) => {
          element.firstChild.style.opacity = 1;
        }
      );
      if (document.getElementsByClassName(`${event.key}`).length == 0) {
        triesTip--;
        document.getElementById("numbertries").textContent = triesTip;
      }
    }
  });
});

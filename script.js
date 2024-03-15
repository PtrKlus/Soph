var currentPage = "blackSquare";
var triesTip = 5;
var timercheck;
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
upsArray = ["up1", "up2", "up3", "up4", "up5", "up6"];
downsArray = ["down1", "down2", "down3", "down4", "down5", "down6"];
lockArray = ["lock1", "lock2", "lock3", "lock4", "lock5", "lock6"];
awnserArray = [];

upsArray.forEach(function (button, i) {
  document.getElementById(button).addEventListener("click", function (event) {
    var element = document.getElementById(
      "lock" + event.srcElement.id.charAt(2)
    ).firstChild;
    var number = parseInt(element.innerHTML);
    if (number < 9) {
      number++;
    } else {
      number = 0;
    }
    element.innerHTML = number;
  });
});
downsArray.forEach(function (button, i) {
  document.getElementById(button).addEventListener("click", function (event) {
    var element = document.getElementById(
      "lock" + event.srcElement.id.charAt(4)
    ).firstChild;
    var number = parseInt(element.innerHTML);
    if (number > 0) {
      number--;
    } else {
      number = 9;
    }
    element.innerHTML = number;
  });
});

document
  .getElementById("lockImage")
  .addEventListener("click", function (event) {
    awnserArray = [];
    lockArray.forEach(function (button, i) {
      awnserArray.push(document.getElementById(button).firstChild.innerHTML);
    });

    if (arrayEquals(awnserArray, ["1", "3", "1", "2", "2", "3"])) {
      $("#date").hide();
      $("#map").show();
    }
  });

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

// Set up the SVG
const svg = d3.select("#mapsvg");
const svg2 = d3.select("#mapsvg2");
var height = Math.max(
  document.documentElement.clientHeight,
  window.innerHeight
);
var width = Math.max(document.documentElement.clientWidth, window.innerWidth);
// height = height - d3.select("#explain").node().getBoundingClientRect().height;
height = height - height / 10;

svg.attr("width", width);
svg.attr("height", height);
svg2.attr("width", width);
svg2.attr("height", height);

// Load Belgium GeoJSON data
d3.json(
  "https://raw.githubusercontent.com/bmesuere/belgium-topojson/master/belgium.json"
).then(function (topojsondata) {
  const geojson = topojson.feature(
    topojsondata,
    topojsondata.objects.municipalities
  );

  const geojson2 = topojson.feature(
    topojsondata,
    topojsondata.objects.provinces
  );

  const projection = d3.geoMercator().fitSize([width, height], geojson);

  const path = d3.geoPath().projection(projection);

  var counter = 0;

  svg2
    .selectAll("path")
    .data(geojson2.features)
    .enter()
    .append("path")
    .attr("d", path);
  svg
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("click", function (event, d) {
      if (counter == 3) {
        d3.select("#mapsvg")
          .selectAll("path")
          .style("fill", "rgb(223 229 229)");
        counter = 0;
      }
      var data = d.properties;
      if (data.prov_nl != "Provincie Vlaams-Brabant") {
        d3.select(this).style("fill", "red");
        counter++;
      } else if (data.name_nl != "Sint-Genesius-Rode") {
        d3.select(this).style("fill", "orange");
        counter++;
      } else {
        $("#map").hide();
        $("#shrek").show();
        timercheck = setInterval(timerInterval, 1000);
      }
    });
});

// SHREK

const targetImg = document.getElementById("farquad");
showImage();
const damagePopup = document.getElementById("damage-popup");
const retryBtn = document.getElementById("retry");
const beatFarBtn = document.getElementById("beatFar");
$("#retry").hide();
$("#beatFar").hide();

function getRandomPosition() {
  const offset = 150; // Adjust this value as needed
  const x = Math.random() * (window.innerWidth - offset);
  const y = Math.random() * (window.innerHeight - offset);
  return { x, y };
}

function showImage() {
  const position = getRandomPosition();
  targetImg.style.left = position.x + "px";
  targetImg.style.top = position.y + "px";
  targetImg.style.display = "block";
}

function timerInterval() {
  console.log(timer);
  if (timer == 0) {
    $("#farquad").hide();
    $("#retry").show();
    clearInterval(timercheck);
  } else {
    timer--;
    d3.select("#timer").node().innerHTML = timer;
    if (d3.select("#timer").style("color") != "white") {
      d3.select("#timer").style("color", "white");
    } else {
      d3.select("#timer").style("color", "#11b61f");
    }
  }
}

var timer = 60;

var hBar = $(".health-bar"),
  bar = hBar.find(".bar"),
  hit = hBar.find(".hit");
retryBtn.addEventListener("click", function () {
  $("#retry").hide();
  $("#farquad").show();
  hBar.data("value", hBar.data("total"));
  hit.css({ width: "0" });
  bar.css("width", "100%");
  timer = 60;
  timercheck = setInterval(timerInterval, 1000);
});

targetImg.addEventListener("click", function (event) {
  var total = hBar.data("total"),
    value = hBar.data("value");

  if (value < 0 && timer > 0) {
    $("#beatFar").show();
    $("#farquad").hide();
    clearInterval(timercheck);
    return;
  } else {
    showImage();
    var damage = Math.floor(Math.random() * 30);

    const x = event.clientX;
    const y = event.clientY;
    damagePopup.innerText = damage;
    damagePopup.style.left = x + "px";
    damagePopup.style.top = y - 60 + "px"; // Adjust the offset as needed
    damagePopup.style.display = "block";

    setTimeout(function () {
      damagePopup.style.display = "none";
    }, 2000);

    var newValue = value - damage;
    // calculate the percentage of the total width
    var barWidth = (newValue / total) * 100;
    var hitWidth = (damage / value) * 100 + "%";

    // show hit bar and set the width
    hit.css("width", hitWidth);
    hBar.data("value", newValue);

    setTimeout(function () {
      hit.css({ width: "0" });
      bar.css("width", barWidth + "%");
    }, 500);
  }
});

beatFarBtn.addEventListener("click", function () {
  $("#shrek").hide();
  $("#riddle").show();

  // Example usage:
  var sentence = "What would you suck my dick for ?";
  var scrambled = scrambleSentence(sentence);
  d3.select("#tip").node().innerHTML = scrambled;
});

function scrambleSentence(sentence) {
  // Split the sentence into an array of characters
  var characters = sentence.split("");

  // Filter out spaces
  var nonSpaceCharacters = characters.filter(function (char) {
    return char !== " ";
  });

  // Scramble all characters except for the first and last ones
  var scrambledCharacters = nonSpaceCharacters
    .slice(1, nonSpaceCharacters.length - 1)
    .sort(function () {
      return 0.5 - Math.random();
    });

  // Insert scrambled characters back into the array
  for (var i = 1, j = 0; i < characters.length - 1; i++) {
    if (characters[i] !== " ") {
      characters[i] = scrambledCharacters[j++];
    }
  }

  // Join the characters back into a sentence
  var scrambledSentence = characters.join("");

  return scrambledSentence;
}

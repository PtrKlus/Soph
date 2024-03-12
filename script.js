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
const svg = d3.select("#mapsvg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

console.log("🚀 ~ svg:", svg);
// Load Belgium GeoJSON data
d3.json(
  "https://raw.githubusercontent.com/bmesuere/belgium-topojson/master/belgium.json"
).then(function (topojsondata) {
  const geojson = topojson.feature(
    topojsondata,
    topojsondata.objects.municipalities
  );
  // Create a projection
  const projection = d3.geoMercator().fitSize([width, height], geojson);
  console.log("🚀 ~ projection:", projection);

  // Create a path generator
  const path = d3.geoPath().projection(projection);
  console.log("🚀 ~ path:", path);

  // Render the map
  svg
    .selectAll("path")
    .data(geojson.features)
    .enter()
    .append("path")
    .attr("d", path)
    .on("mouseover", function () {
      d3.select(this).attr("fill", "#f00"); // Change color on hover
    })
    .on("mouseout", function () {
      d3.select(this).attr("fill", "#ccc"); // Reset color on mouseout
    });
});

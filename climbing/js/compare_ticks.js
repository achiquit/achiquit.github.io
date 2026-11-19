const form = document.querySelector("#ticksForm");
const csvFileInput = document.querySelector("#ticksInput");
const textArea = document.querySelector("#ticksResult");

let myClimbs = [];
let theirTicks = [];

loadCsvAsArray("/climbing/test-top-climbs.csv")
  .then((ticks) => {
    myClimbs = ticks;
  })
  .catch((error) => {
    console.error("Failed to load the site's climbing ticks:", error);
  });

form?.addEventListener("submit", function (e) {
  e.preventDefault();
  const file = csvFileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    theirTicks = csvToArr(e.target.result, ",");
    textArea.value = JSON.stringify(theirTicks, null, 4);
    compClimbs(myClimbs, theirTicks);
  };

  reader.readAsText(file);
});

function loadCsvAsArray(csvPath) {
  return d3.csv(csvPath);
}

function csvToArr(stringVal, splitter) {
  const [keys, ...rest] = stringVal
    .trim()
    .split("\n")
    .map((item) => item.split(splitter));

  const formedArr = rest.map((item) => {
    const object = {};
    keys.forEach((key, index) => (object[key] = item.at(index)));
    return object;
  });
  return formedArr;
}

function compClimbs(myClimbs, theirClimbs) {
  theirLoop: for (let iThem = 0; iThem < theirClimbs.length; iThem++) {
    myLoop: for (let iMe = 0; iMe < myClimbs.length; iMe++) {
      if (theirClimbs[iThem]["URL"] === myClimbs[iMe]["MP URL"]) {
        console.log("We've both climbed ", theirClimbs[iThem]["Route"]);
        break myLoop;
      }
    }
  }
}
const form = document.querySelector("#ticksForm");
const csvFileInput = document.querySelector("#ticksInput");
const textArea = document.querySelector("#ticksResult");

let myClimbs = [];
let theirTicks = [];

loadCsvAsArray("/climbing/data/top-climbs.csv")
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
    const sharedClimbs = compClimbs(myClimbs, theirTicks);
    textArea.replaceChildren();
    sharedClimbs.forEach((climb, index) => {
      if (index > 0) textArea.append(document.createElement("br"));
      const link = document.createElement("a");
      link.href = climb.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = climb.name;
      textArea.append(link);
    });
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
  const sharedClimbs = [];
  theirLoop: for (let iThem = 0; iThem < theirClimbs.length; iThem++) {
    myLoop: for (let iMe = 0; iMe < myClimbs.length; iMe++) {
      if (theirClimbs[iThem]["URL"] === myClimbs[iMe]["MP URL"]) {
        sharedClimbs.push({
          name: myClimbs[iMe]["Climb"],
          url: myClimbs[iMe]["MP URL"],
        });
        break myLoop;
      }
    }
  }
  cleanLoop: for (let i = 0; i < sharedClimbs.length; i++) {
    cleanLoop2: for (let i2 = 0; i2 < sharedClimbs.length; i2++) {
      if (sharedClimbs[i]["name"] == sharedClimbs[i2]["name"]) {
        if (i != i2) {
          sharedClimbs.splice(i, 1);
        }
      }
    }
  }
  return sharedClimbs;
}
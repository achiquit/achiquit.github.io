const form = document.querySelector("#ticksForm");
const csvFileInput = document.querySelector("#ticksInput");
const textArea = document.querySelector("#ticksResult");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const file = csvFileInput.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const theirTicks = csvToArr(e.target.result, ",");
    textArea.value = JSON.stringify(theirTicks, null, 4);
  };

  reader.readAsText(file);
});

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
  console.log(formedArr);
  return formedArr;
}
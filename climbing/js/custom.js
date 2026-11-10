const startClimb = new Date('6/15/2019');
const today = new Date();
const diffTime = Math.abs(today - startClimb);
const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

function getFormatedStringFromDays(numberOfDays) {
    var years = Math.floor(numberOfDays / 365);
    var months = Math.floor(numberOfDays % 365 / 30);
    var days = Math.floor(numberOfDays % 365 % 30);

    return [years, months, days];
}

const str = getFormatedStringFromDays(diffDays);
var climbingTime = (str[0] + " Years, " + str[1] + " Months, and "+ str[2] + " Days");

document.getElementById('climbing-time').innerHTML = climbingTime;


$("#month-title").click(function () {
  if ($(this).hasClass("text-white")) {
    $(this).removeClass("text-white");
    $(this).addClass("text-emerald-300");
    $("#day-title").removeClass("text-emerald-300");
    $("#day-title").addClass("text-white");
    $("#monthly-height").removeClass("hidden");
    $("#daily-height").addClass("hidden");
  }
});

$("#day-title").click(function () {
  if ($(this).hasClass("text-white")) {
    $(this).removeClass("text-white");
    $(this).addClass("text-emerald-300");
    $("#month-title").removeClass("text-emerald-300");
    $("#month-title").addClass("text-white");
    $("#daily-height").removeClass("hidden");
    $("#monthly-height").addClass("hidden");
  }
});

/* shared ticks */
function csvToArray(str, delimiter = ",") {
  // slice from start of text to the first \n index
  // use split to create an array from string by delimiter
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  // slice from \n index + 1 to the end of the text
  // use split to create an array of each csv value row
  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  // Map the rows
  // split values from each row into an array
  // use headers.reduce to create an object
  // object properties derived from headers:values
  // the object passed as an element of the array
  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

reader.onload = function (e) {
  const text = e.target.result;
  const data = csvToArray(text);
  document.write(JSON.stringify(data));
};

/* Ticker js */
(function(window, document) {
  const animTime = 5000; // Animation time (ms)
  const speed = 100; // Text moving speed (px)
  const limit = 0; // Breakpoint (px)
  let animId;
  let isRunning = false;

  const ticker = document.querySelector('.ticker');
  loadTicker();

  function loadTicker() {
    tickerAnim();
    animId = setInterval(tickerAnim, animTime);
    isRunning = true;
  }

  // Animation
  function tickerAnim() {
    const items = ticker.querySelectorAll('.ticker-item');
    const running = ticker.querySelector('.run');
    let idx, link, first, next;
    if (!running) {
      first = items[0];
      link = first.querySelector('a');
      first.classList.add('fadeInDown', 'run');
      first.style.zIndex = 1;
      setTimeout(textMove, 1000, link);
    } else {
      for (let i = 0; i < items.length; i++) {
        if (items[i] == running) {
          idx = i; // Get index of active element
          break;
        }
      }
      next = items[(idx + 1) % items.length];
      running.classList.replace('fadeInDown', 'fadeOutDown');
      setTimeout(() => {
        running.classList.remove('fadeOutDown', 'run');
        running.style.zIndex = 0;
        link = running.querySelector('a');
        link.style.transform = 'none';
        next.classList.add('fadeInDown', 'run');
        next.style.zIndex = 1;
        link = next.querySelector('a');
        setTimeout(textMove, 1000, link);
      }, 300);
    }
  }

  // Text animation
  function textMove(elm) {
    const move = elm.parentNode.clientWidth - elm.clientWidth;
    if (move < 0) {
      elm.style.transform = 'translateX(' + move + 'px)';
      elm.style.transitionDuration = Math.abs(move) / speed + 's';
    }
  }

  // Runs when window is resized
  window.addEventListener('resize', () => {
    const windowWidth = window.innerWidth;
    if (windowWidth <= limit) {
      ticker.style.display = 'none';
      clearInterval(animId);
      isRunning = false;
    } else {
      if (!isRunning) {
        ticker.style.display = 'block';
        animId = setInterval(tickerAnim, animTime);
        isRunning = true;
      }
    }
  });
})(window, document);
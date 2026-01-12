// // ===============================
// // PERIOD TRACKER DASHBOARD LOGIC
// // ===============================

// // Get elements
// let calendar = document.getElementById("calendar");
// let result = document.getElementById("result");
// let canvas = document.getElementById("cycleChart");
// let ctx = canvas.getContext("2d");

// // Load saved period dates or empty array
// let periodDates = JSON.parse(localStorage.getItem("periodDates")) || [];

// // Generate current month calendar
// function generateCalendar() {
//   calendar.innerHTML = "";

//   let today = new Date();
//   let year = today.getFullYear();
//   let month = today.getMonth();

//   let firstDay = new Date(year, month, 1).getDay();
//   let daysInMonth = new Date(year, month + 1, 0).getDate();

//   // Empty boxes before first day
//   for (let i = 0; i < firstDay; i++) {
//     let blank = document.createElement("div");
//     calendar.appendChild(blank);
//   }

//   // Create days
//   for (let d = 1; d <= daysInMonth; d++) {
//     let dateBox = document.createElement("div");
//     dateBox.classList.add("day");
//     dateBox.innerText = d;

//     let fullDate = `${year}-${month + 1}-${d}`;

//     if (periodDates.includes(fullDate)) {
//       dateBox.classList.add("period");
//     }

//     dateBox.onclick = () => selectDate(fullDate, dateBox);
//     calendar.appendChild(dateBox);
//   }
// }

// // When user clicks a date
// function selectDate(date, element) {
//   if (!periodDates.includes(date)) {
//     periodDates.push(date);

//     // Sort dates
//     periodDates.sort((a, b) => new Date(a) - new Date(b));

//     localStorage.setItem("periodDates", JSON.stringify(periodDates));
//     element.classList.add("period");

//     predictNext();
//     drawChart();
//   }
// }

// // Predict next period (28 day cycle)
// function predictNext() {
//   if (periodDates.length === 0) return;

//   let last = new Date(periodDates[periodDates.length - 1]);
//   let next = new Date(last);
//   next.setDate(last.getDate() + 28);

//   result.innerHTML = "🌸 Next period may start on: " + next.toDateString();
// }

// // Draw cycle history chart
// function drawChart() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   if (periodDates.length < 2) {
//     ctx.fillText("Add at least 2 period dates to see chart", 20, 50);
//     return;
//   }

//   let gaps = [];

//   for (let i = 1; i < periodDates.length; i++) {
//     let d1 = new Date(periodDates[i - 1]);
//     let d2 = new Date(periodDates[i]);
//     let diff = (d2 - d1) / (1000 * 60 * 60 * 24);
//     gaps.push(diff);
//   }

//   let barWidth = 40;
//   let gapSpace = 25;
//   let startX = 30;

//   ctx.font = "14px Segoe UI";
//   ctx.fillText("Cycle History (days)", 10, 20);

//   gaps.forEach((gap, i) => {
//     let height = gap * 4;

//     ctx.fillStyle = "#ee6aa7";
//     ctx.fillRect(startX, canvas.height - height - 20, barWidth, height);

//     ctx.fillStyle = "black";
//     ctx.fillText(gap + "d", startX, canvas.height - height - 25);

//     startX += barWidth + gapSpace;
//   });
// }

// // Initial load
// generateCalendar();
// predictNext();
// drawChart();


// // ===============================
// // DARK MODE LOGIC
// // ===============================

// function toggleTheme() {
//   document.body.classList.toggle("dark");

//   if (document.body.classList.contains("dark")) {
//     localStorage.setItem("theme", "dark");
//     themeBtn.innerText = "☀️";
//   } else {
//     localStorage.setItem("theme", "light");
//     themeBtn.innerText = "🌙";
//   }
// }

// // Load saved theme
// if (localStorage.getItem("theme") === "dark") {
//   document.body.classList.add("dark");
//   themeBtn.innerText = "☀️";
// }


// function resetApp() {
//   if (confirm("Are you sure you want to clear all data?")) {
//     localStorage.clear();
//     location.reload();
//   }
// }



// ===============================
// COMPLETE PERIOD TRACKER DASHBOARD
// ===============================

// Get elements
let calendar = document.getElementById("calendar");
let result = document.getElementById("result");
let monthYear = document.getElementById("monthYear");
let canvas = document.getElementById("cycleChart");
let ctx = canvas.getContext("2d");
let themeBtn = document.getElementById("themeBtn");

// Load saved period dates or empty array
let periodDates = JSON.parse(localStorage.getItem("periodDates")) || [];

// Current calendar state
let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();

// Month names
let months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

// ===============================
// CALENDAR LOGIC
// ===============================

function generateCalendar(month, year) {
  calendar.innerHTML = "";
  monthYear.innerText = months[month] + " " + year;

  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty boxes
  for (let i = 0; i < firstDay; i++) {
    calendar.appendChild(document.createElement("div"));
  }

  // Create days
  for (let d = 1; d <= daysInMonth; d++) {
    let dateBox = document.createElement("div");
    dateBox.classList.add("day");
    dateBox.innerText = d;

    let fullDate = `${year}-${month + 1}-${d}`;

    if (periodDates.includes(fullDate)) {
      dateBox.classList.add("period");
    }

    dateBox.onclick = () => selectDate(fullDate, dateBox);
    calendar.appendChild(dateBox);
  }
}

function selectDate(date, element) {
  if (!periodDates.includes(date)) {
    periodDates.push(date);
    periodDates.sort((a, b) => new Date(a) - new Date(b));

    localStorage.setItem("periodDates", JSON.stringify(periodDates));
    element.classList.add("period");

    predictNext();
    drawChart();
  }
}

function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  generateCalendar(currentMonth, currentYear);
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  generateCalendar(currentMonth, currentYear);
}

// ===============================
// PERIOD PREDICTION
// ===============================

function predictNext() {
  if (periodDates.length === 0) return;

  let last = new Date(periodDates[periodDates.length - 1]);
  let next = new Date(last);
  next.setDate(last.getDate() + 28);

  result.innerHTML = "🌸 Next period may start on: " + next.toDateString();
}

// ===============================
// CYCLE HISTORY CHART
// ===============================

function drawChart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (periodDates.length < 2) {
    ctx.fillText("Add at least 2 period dates to see chart", 20, 50);
    return;
  }

  let gaps = [];

  for (let i = 1; i < periodDates.length; i++) {
    let d1 = new Date(periodDates[i - 1]);
    let d2 = new Date(periodDates[i]);
    gaps.push((d2 - d1) / (1000 * 60 * 60 * 24));
  }

  let x = 30;
  ctx.font = "14px Segoe UI";
  ctx.fillText("Cycle History (days)", 10, 20);

  gaps.forEach(gap => {
    let h = gap * 4;
    ctx.fillStyle = "#ee6aa7";
    ctx.fillRect(x, canvas.height - h - 20, 35, h);
    ctx.fillStyle = "black";
    ctx.fillText(gap + "d", x, canvas.height - h - 25);
    x += 55;
  });
}

// ===============================
// DARK MODE LOGIC
// ===============================

function toggleTheme() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
    themeBtn.innerText = "☀️";
  } else {
    localStorage.setItem("theme", "light");
    themeBtn.innerText = "🌙";
  }
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  themeBtn.innerText = "☀️";
}

// ===============================
// RESET APP
// ===============================

function resetApp() {
  if (confirm("Are you sure you want to clear all data?")) {
    localStorage.clear();
    location.reload();
  }
}

// ===============================
// INITIAL LOAD
// ===============================

generateCalendar(currentMonth, currentYear);
predictNext();
drawChart();

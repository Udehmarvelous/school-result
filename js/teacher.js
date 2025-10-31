const users = JSON.parse(localStorage.getItem("users")) || [];
const currentTeacher = JSON.parse(localStorage.getItem("currentTeacher")) || null;
const results = JSON.parse(localStorage.getItem("results")) || [];

const welcomeMsg = document.getElementById("welcomeMsg");
const resultList = document.getElementById("resultList");

if (!currentTeacher || !currentTeacher.approved) {
  alert("Access denied! You are not approved yet.");
  window.location.href = "index.html";
}

welcomeMsg.textContent = `Welcome, ${currentTeacher.name}!`;

document.getElementById("resultForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentName = document.getElementById("studentName").value;
  const subject = document.getElementById("subject").value;
  const score = parseInt(document.getElementById("score").value);

  if (!studentName || !subject || isNaN(score)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const grade = score >= 70 ? "A" : score >= 60 ? "B" : score >= 50 ? "C" : score >= 45 ? "D" : "F";

  const newResult = {
    teacher: currentTeacher.name,
    studentName,
    subject,
    score,
    grade,
    released: false
  };

  results.push(newResult);
  localStorage.setItem("results", JSON.stringify(results));

  document.getElementById("resultForm").reset();
  renderResults();
});

function renderResults() {
  const myResults = results.filter(r => r.teacher === currentTeacher.name);
  resultList.innerHTML = "";

  if (myResults.length === 0) {
    resultList.innerHTML = "<p>No results uploaded yet.</p>";
    return;
  }

  myResults.forEach((r, i) => {
    const div = document.createElement("div");
    div.classList.add("result-card");

    div.innerHTML = `
      <p><strong>Student:</strong> ${r.studentName}</p>
      <p><strong>Subject:</strong> ${r.subject}</p>
      <p><strong>Score:</strong> ${r.score}</p>
      <p><strong>Grade:</strong> ${r.grade}</p>
      <p><strong>Status:</strong> ${r.released ? "✅ Released" : "❌ Not Released"}</p>
      ${!r.released ? `<button onclick="releaseResult(${i})">Release</button>` : ""}
      <hr>
    `;

    resultList.appendChild(div);
  });
}

function releaseResult(index) {
  results[index].released = true;
  localStorage.setItem("results", JSON.stringify(results));
  renderResults();
}

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("currentTeacher");
  window.location.href = "index.html";
});

renderResults();

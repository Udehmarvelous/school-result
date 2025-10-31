document.getElementById("checkResultBtn").addEventListener("click", function() {
  const studentName = document.getElementById("studentNameInput").value.trim();
  const resultDisplay = document.getElementById("resultDisplay");

  if (studentName === "") {
    resultDisplay.innerHTML = "<p>Please enter your name!</p>";
    return;
  }

  const results = JSON.parse(localStorage.getItem("results")) || [];
  const studentResults = results.filter(
    r => r.studentName.toLowerCase() === studentName.toLowerCase() && r.released
  );

  resultDisplay.innerHTML = "";

  if (studentResults.length === 0) {
    resultDisplay.innerHTML = "<p>No released results found for this student yet.</p>";
    return;
  }

  // Create the table
  let tableHTML = `
    <h3>Results for ${studentName}</h3>
    <table class="result-table">
      <thead>
        <tr>
          <th>Subject</th>
          <th>Score</th>
          <th>Grade</th>
          <th>Teacher</th>
        </tr>
      </thead>
      <tbody>
  `;

  studentResults.forEach(r => {
    tableHTML += `
      <tr>
        <td>${r.subject}</td>
        <td>${r.score}</td>
        <td>${r.grade}</td>
        <td>${r.teacher}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  resultDisplay.innerHTML = tableHTML;
});

document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

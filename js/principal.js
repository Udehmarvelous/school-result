// Load users
let users = JSON.parse(localStorage.getItem("users")) || [];
const teacherList = document.getElementById("teacherList");

// 🔔 Notification bar
const notifBar = document.createElement("div");
notifBar.id = "notifBar";
notifBar.style.background = "#ffc107";
notifBar.style.color = "#000";
notifBar.style.padding = "10px";
notifBar.style.marginBottom = "10px";
notifBar.style.borderRadius = "5px";
notifBar.style.display = "none";
notifBar.style.cursor = "pointer";
document.querySelector(".container").insertBefore(notifBar, teacherList);

let teachers = users.filter(u => u.role === "teacher");

// Render teacher list
function renderTeachers() {
  teacherList.innerHTML = "";

  if (teachers.length === 0) {
    teacherList.innerHTML = "<p>No teachers registered yet.</p>";
    notifBar.style.display = "none";
    return;
  }

  teachers.forEach((teacher, index) => {
    const div = document.createElement("div");
    div.classList.add("teacher-card");

    div.innerHTML = `
      <p><strong>Name:</strong> ${teacher.name}</p>
      <p><strong>Email:</strong> ${teacher.email}</p>
      <p><strong>Status:</strong> ${teacher.approved ? "✅ Approved" : "❌ Pending"}</p>
      ${
        !teacher.approved
          ? `
            <button onclick="approveTeacher(${index})" style="background:#4CAF50;color:white;">Approve</button>
            <button onclick="disapproveTeacher(${index})" style="background:#f44336;color:white;">Disapprove</button>
          `
          : ""
      }
      <hr>
    `;

    teacherList.appendChild(div);
  });
}

// ✅ Approve teacher
function approveTeacher(index) {
  teachers[index].approved = true;

  // Update in localStorage
  const allUsers = JSON.parse(localStorage.getItem("users")) || [];
  const teacherEmail = teachers[index].email;
  const updateIndex = allUsers.findIndex(u => u.email === teacherEmail);
  allUsers[updateIndex].approved = true;
  localStorage.setItem("users", JSON.stringify(allUsers));

  teachers = allUsers.filter(u => u.role === "teacher");
  renderTeachers();

  alert(`Teacher ${teachers[index].name} has been approved!`);
  localStorage.setItem("currentTeacher", JSON.stringify(teachers[index]));
  window.open("teacher.html", "_blank");

  notifBar.style.display = "none";
}

// ❌ Disapprove teacher (remove registration)
function disapproveTeacher(index) {
  const teacherName = teachers[index].name;

  if (confirm(`Are you sure you want to disapprove and remove ${teacherName}?`)) {
    // Remove from both arrays
    const allUsers = JSON.parse(localStorage.getItem("users")) || [];
    const teacherEmail = teachers[index].email;
    const updateIndex = allUsers.findIndex(u => u.email === teacherEmail);

    if (updateIndex !== -1) {
      allUsers.splice(updateIndex, 1);
    }

    // Save updated list
    localStorage.setItem("users", JSON.stringify(allUsers));

    // Refresh teacher list
    teachers = allUsers.filter(u => u.role === "teacher");
    renderTeachers();

    alert(`Teacher ${teacherName} has been disapproved and removed.`);
  }
}

// 🔁 Check for new registrations
function checkForNewTeachers() {
  const updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
  const updatedTeachers = updatedUsers.filter(u => u.role === "teacher");
  const pendingTeachers = updatedTeachers.filter(t => !t.approved);

  if (pendingTeachers.length > 0) {
    notifBar.textContent = `🔔 ${pendingTeachers.length} new teacher(s) awaiting approval — click to review.`;
    notifBar.style.display = "block";
    notifBar.onclick = () => {
      notifBar.style.display = "none";
      renderTeachers();
    };
  } else {
    notifBar.style.display = "none";
  }

  teachers = updatedTeachers;
}

renderTeachers();
setInterval(checkForNewTeachers, 3000);

document.getElementById("logoutBtn").addEventListener("click", () => {
  window.location.href = "index.html";
});

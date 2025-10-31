document.getElementById("registerForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const role = document.getElementById("role").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!role || !name || !email || !password) {
    document.getElementById("message").textContent = "Please fill all fields!";
    return;
  }

  // Save user info to localStorage
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push({ role, name, email, password, approved: role === "principal" });
  localStorage.setItem("users", JSON.stringify(users));

  document.getElementById("message").textContent = "Registration successful!";

  // Redirect based on role
  setTimeout(() => {
    if (role === "principal") {
      window.location.href = "principal.html";
    } else if (role === "teacher") {
      window.location.href = "teacher.html";
    } else {
      window.location.href = "student.html";
    }
  }, 1000);
});

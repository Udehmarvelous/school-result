🏫 App Description — School Result Management System

This is a school result management web app built with HTML, CSS, and JavaScript (no backend yet).
It manages teachers, students, and the principal — all handled in one system using localStorage for saving data.

🧩 System Overview

The app has four main sections/pages:

1️⃣ Registration Page (index.html)

. Entry point for teachers, students, and principal.

. Users select their role and register by filling in their name, email, and password.

. After registration:

 . If teacher, the registration awaits principal approval.

 . If student or principal, they can log in immediately.

2️⃣ Principal Dashboard (principal.html)

. This is where the principal controls everything.

Features:

📋 View all registered teachers.

🔔 Receive real-time notification when new teachers register.

✅ Approve teachers (on click):

. Grants access instantly.

. Opens the teacher’s dashboard in a new tab.

❌ Disapprove teachers:

. Removes their registration record completely.

. Notification disappears instantly.

. System updates automatically.

🔁 Auto-refresh every 3 seconds to check for new teacher registrations.

3️⃣ Teacher Dashboard (teacher.html)

. This is where teachers upload and release students’ results.

Features:

👨‍🏫 Only accessible after the principal’s approval.

🧾 Teachers can:

. Upload student results (Name, Subject, Score).

. The app automatically calculates the Grade (A, B, C, D, F).

📦 Results are stored in localStorage.

📤 Teachers can release results to make them visible to students.

4️⃣ Student Result Page (student.html)

. This is where students view their results.

Features:

🧍‍♂️ Students log in using their registration or result access code.

📊 Results appear in a neat tabular form:
. | Subject | Score | Grade | Teacher | Status |

. Only results that have been released by teachers appear here.

⚙️ How the Approval & Notification Works
. Action	What Happens
. A teacher registers	The principal’s dashboard gets a yellow notification bar 🔔
. Principal clicks Approve	Teacher’s status changes to Approved ✅ and they’re granted access instantly
. Principal clicks Disapprove	Teacher’s registration is deleted ❌, and the notification disappears
. New teacher registers	The system auto-refreshes every 3s and shows a new notification
💾 Tech Used

. HTML: Page structure (Registration, Principal, Teacher, Student).

. CSS: Styling and page layout.

. JavaScript:

. Handles user registration and login.

. Controls approval/disapproval logic.

. Uses localStorage to save users and results data.

. Sends notifications and auto-updates the principal’s dashboard.

🧠 Example Workflow

1️⃣ A teacher registers → Principal sees a notification.
2️⃣ Principal clicks “Approve” → Teacher gains dashboard access.
3️⃣ Teacher uploads results → Releases results.
4️⃣ Student logs in → Sees results table.

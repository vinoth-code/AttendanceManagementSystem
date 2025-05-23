function displayDate() {
  const currentDate = new Date().toISOString().split('T')[0];
  document.getElementById('currentDate').textContent = currentDate;
}
displayDate();

async function addStudent() {
  const studentId = document.getElementById('studentId').value;
  const studentName = document.getElementById('studentName').value;

  if (!studentId || !studentName) {
    alert("Please enter both Student ID and Name");
    return;
  }

  await fetch('/addStudent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ studentId, studentName })
  });

  alert("Student added successfully!");
  loadStudents();
}

async function loadStudents() {
  const res = await fetch('/students');
  const students = await res.json();
  const tbody = document.getElementById('attendanceBody');
  tbody.innerHTML = '';

  students.forEach(stu => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${stu.student_id}</td>
      <td>${stu.student_name}</td>
      <td><input type="checkbox" class="attendanceCheckbox" data-student-id="${stu.student_id}"></td>
    `;
    tbody.appendChild(row);
  });
}

async function takeAttendance() {
  const date = new Date().toISOString().split('T')[0];
  const checkboxes = document.querySelectorAll('.attendanceCheckbox');

  if (checkboxes.length === 0) {
    alert("No students available.");
    return;
  }

  const records = Array.from(checkboxes).map(cb => ({
    studentId: parseInt(cb.dataset.studentId),
    present: cb.checked
  }));

  const res = await fetch('/attendance', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ records, date })
  });

  const data = await res.json();
  alert(data.message || "Attendance submitted.");
  calculateAttendance();
}

function calculateAttendance() {
  const checkboxes = document.querySelectorAll('.attendanceCheckbox');
  const present = Array.from(checkboxes).filter(cb => cb.checked).length;
  const total = checkboxes.length;
  const percentage = total ? (present / total) * 100 : 0;
  document.getElementById('percentageValue').textContent = percentage.toFixed(2) + '%';
}

window.onload = loadStudents;

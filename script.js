// JavaScript code for adding students and taking attendance

// Function to add a student
function addStudent() {
    const studentIdInput = document.getElementById('studentId');
    const studentNameInput = document.getElementById('studentName');
    const studentId = studentIdInput.value.trim();
    const studentName = studentNameInput.value.trim();

    // Check if inputs are not empty
    if (studentId === '' || studentName === '') {
        alert('Please enter both student ID and name.');
        return;
    }

    // Create a new row for the student
    const tableBody = document.getElementById('attendanceBody');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${studentId}</td>
        <td>${studentName}</td>
        <td><input type="checkbox" class="attendanceCheckbox" data-student-id="${studentId}"></td>
    `;
    tableBody.appendChild(newRow);

    // Clear input fields after adding student
    studentIdInput.value = '';
    studentNameInput.value = '';
}

// Function to take attendance
function takeAttendance() {
    const studentCheckboxes = document.querySelectorAll('.attendanceCheckbox');
    let presentCount = 0;

    // Count the number of present students
    studentCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            presentCount++;
        }
    });

    // Calculate attendance percentage
    const totalStudents = studentCheckboxes.length;
    const attendancePercentage = (presentCount / totalStudents) * 100;

    // Update the attendance percentage display
    const percentageValue = document.getElementById('percentageValue');
    percentageValue.textContent = attendancePercentage.toFixed(2) + '%';
}

// JavaScript code to display the current date
const currentDate = new Date();
const dateElement = document.getElementById('date');
dateElement.textContent = currentDate.toLocaleDateString('en-US');
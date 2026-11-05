// Render lo deploy chesaka vacchina backend URL ikkada update cheyochu (Default ga localhost)
const API_BASE_URL = 'http://localhost:5000'; 

// Modal Open / Close
function openModal() {
  document.getElementById('joinModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('joinModal').style.display = 'none';
}

function selectPlan(planName) {
  document.getElementById('mPlan').value = planName;
  openModal();
}

window.onclick = function(event) {
  const modal = document.getElementById('joinModal');
  if (event.target === modal) {
    closeModal();
  }
};

// BMI Calculation
function calculateBMI() {
  const heightVal = parseFloat(document.getElementById('height').value);
  const weightVal = parseFloat(document.getElementById('weight').value);
  const resultDiv = document.getElementById('bmi-result');

  if (!heightVal || !weightVal || heightVal <= 0 || weightVal <= 0) {
    resultDiv.style.color = '#e06d53';
    resultDiv.innerText = 'Please enter valid height and weight.';
    return;
  }

  const heightInMeters = heightVal / 100;
  const bmi = (weightVal / (heightInMeters * heightInMeters)).toFixed(1);
  let status = '';

  if (bmi < 18.5) status = 'Underweight';
  else if (bmi < 24.9) status = 'Normal Weight';
  else if (bmi < 29.9) status = 'Overweight';
  else status = 'Obese';

  resultDiv.style.color = '#1a1a1a';
  resultDiv.innerText = `Your BMI is ${bmi} (${status})`;
}

// Backend API call for Membership Form
document.getElementById('membershipForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const fullName = document.getElementById('mName').value;
  const email = document.getElementById('mEmail').value;
  const phone = document.getElementById('mPhone').value;
  const plan = document.getElementById('mPlan').value;

  try {
    const res = await fetch(`${API_BASE_URL}/api/members/join`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, phone, plan })
    });

    const data = await res.json();
    if (res.ok) {
      alert('🎉 Membership application submitted successfully!');
      document.getElementById('membershipForm').reset();
      closeModal();
    } else {
      alert(data.message || 'Submission failed.');
    }
  } catch (err) {
    console.error(err);
    alert('Server not connected. Check backend server status.');
  }
});
// Render backend URL (trailing slash lekunda)
const API_BASE_URL = 'https://fitfuzion-backend.onrender.com';

// Modal Open / Close
function openModal() {
  const modal = document.getElementById('joinModal');
  if (modal) modal.style.display = 'flex';
}

function closeModal() {
  const modal = document.getElementById('joinModal');
  if (modal) modal.style.display = 'none';
}

function selectPlan(planName) {
  const planInput = document.getElementById('mPlan');
  if (planInput) planInput.value = planName;
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
  const heightVal = parseFloat(document.getElementById('height')?.value);
  const weightVal = parseFloat(document.getElementById('weight')?.value);
  const resultDiv = document.getElementById('bmi-result');

  if (!resultDiv) return;

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
const membershipForm = document.getElementById('membershipForm');
if (membershipForm) {
  membershipForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = membershipForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn ? submitBtn.innerText : 'Submit';

    const fullName = document.getElementById('mName')?.value?.trim();
    const email = document.getElementById('mEmail')?.value?.trim();
    const phone = document.getElementById('mPhone')?.value?.trim();
    const plan = document.getElementById('mPlan')?.value;

    if (!fullName || !email || !phone || !plan) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = 'Submitting...';
      }

      const res = await fetch(`${API_BASE_URL}/api/members/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ fullName, email, phone, plan })
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        alert('🎉 Membership application submitted successfully!');
        membershipForm.reset();
        closeModal();
      } else {
        alert(data.message || `Submission failed with status: ${res.status}`);
      }
    } catch (err) {
      console.error('Fetch error details:', err);
      alert('Server response delay or network error. Please try again in a few seconds!');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = originalBtnText;
      }
    }
  });
}
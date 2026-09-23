// 1. BMI CALCULATOR LOGIC
function calcBMI() {
  const w = parseFloat(document.getElementById("weight").value);
  const h = parseFloat(document.getElementById("height").value) / 100;
  const res = document.getElementById("bmiResult");

  if (!w || !h || w <= 0 || h <= 0) {
    alert("Please enter valid weight & height!");
    return;
  }

  const bmi = (w / (h * h)).toFixed(1);
  let status = "";

  if (bmi < 18.5) status = "Underweight";
  else if (bmi <= 24.9) status = "Healthy Weight";
  else if (bmi <= 29.9) status = "Overweight";
  else status = "Obese";

  res.style.display = "block";
  res.innerHTML = `Your BMI: <span style="color:#ff3366">${bmi}</span> (${status})`;
}

function resetBMI() {
  document.getElementById("weight").value = "";
  document.getElementById("height").value = "";
  document.getElementById("bmiResult").style.display = "none";
}

// 2. JOIN NOW MODAL LOGIC
function openModal(planName) {
  document.getElementById("joinModal").style.display = "flex";
  document.getElementById("selectedPlan").value = "Selected: " + planName;
}

function closeModal() {
  document.getElementById("joinModal").style.display = "none";
}

function submitForm(event) {
  event.preventDefault();
  const name = document.getElementById("custName").value;
  const phone = document.getElementById("custPhone").value;
  const plan = document.getElementById("selectedPlan").value;

  alert(`Awesome, ${name}! Your details have been submitted for ${plan}. We will contact you at ${phone}!`);
  closeModal();
}
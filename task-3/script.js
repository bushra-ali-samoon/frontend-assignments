let currentStep = 0;
const steps = document.querySelectorAll(".step");
const progressBar = document.getElementById("progressBar");

const formData = {
  name: "",
  email: "",
  city: ""
};

// Load saved data
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("formData"));
  if (saved) {
    Object.assign(formData, saved);
    document.getElementById("name").value = formData.name;
    document.getElementById("email").value = formData.email;
    document.getElementById("city").value = formData.city;
  }
};

function showStep() {
  steps.forEach(step => step.classList.remove("active"));
  steps[currentStep].classList.add("active");

  progressBar.style.width = ((currentStep + 1) / steps.length) * 100 + "%";

  if (currentStep === 3) {
    document.getElementById("summary").innerHTML = `
      <strong>Name:</strong> ${formData.name}<br>
      <strong>Email:</strong> ${formData.email}<br>
      <strong>City:</strong> ${formData.city}
    `;
  }
}

function nextStep() {
  if (!validateStep()) return;

  saveData();
  currentStep++;
  showStep();
}

function prevStep() {
  currentStep--;
  showStep();
}

function validateStep() {
  if (currentStep === 0 && !document.getElementById("name").value.trim()) {
    alert("Name is required");
    return false;
  }

  if (currentStep === 1 && !document.getElementById("email").value.trim()) {
    alert("Email is required");
    return false;
  }

  if (currentStep === 2 && !document.getElementById("city").value.trim()) {
    alert("City is required");
    return false;
  }

  return true;
}

function saveData() {
  formData.name = document.getElementById("name").value;
  formData.email = document.getElementById("email").value;
  formData.city = document.getElementById("city").value;

  localStorage.setItem("formData", JSON.stringify(formData));
}

// Submit
document.getElementById("multiForm").addEventListener("submit", e => {
  e.preventDefault();
  alert("Form Submitted Successfully ✅");
  localStorage.removeItem("formData");
});

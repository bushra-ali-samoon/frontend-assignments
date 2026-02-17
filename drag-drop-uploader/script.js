const dropArea = document.getElementById("dropArea");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.querySelector(".progress-container");
const errorDiv = document.getElementById("error");

// Load image from localStorage on refresh
window.onload = () => {
  const savedImage = localStorage.getItem("uploadedImage");
  if (savedImage) {
    preview.innerHTML = `<img src="${savedImage}">`;
  }
};

// Prevent default behavior
["dragenter", "dragover", "dragleave", "drop"].forEach(event => {
  dropArea.addEventListener(event, e => e.preventDefault());
});

// Highlight drop area
dropArea.addEventListener("dragover", () => {
  dropArea.classList.add("dragover");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("dragover");
});

// Handle drop
dropArea.addEventListener("drop", e => {
  dropArea.classList.remove("dragover");
  handleFile(e.dataTransfer.files[0]);
});

// Handle file input
fileInput.addEventListener("change", () => {
  handleFile(fileInput.files[0]);
});

function handleFile(file) {
  errorDiv.textContent = "";

  if (!file) return;

  const validTypes = ["image/jpeg", "image/png", "image/gif"];

  if (!validTypes.includes(file.type)) {
    errorDiv.textContent = "❌ Only JPG, PNG, GIF allowed";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    simulateProgress(() => {
      preview.innerHTML = `<img src="${reader.result}">`;
      localStorage.setItem("uploadedImage", reader.result);
    });
  };

  reader.readAsDataURL(file);
}

// Fake progress bar
function simulateProgress(callback) {
  progressContainer.style.display = "block";
  progressBar.style.width = "0%";

  let progress = 0;

  const interval = setInterval(() => {
    progress += 10;
    progressBar.style.width = progress + "%";

    if (progress >= 100) {
      clearInterval(interval);
      progressContainer.style.display = "none";
      callback();
    }
  }, 200);
}

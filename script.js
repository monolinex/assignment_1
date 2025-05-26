// Simulate Google Analytics tracking with console.log
// Replace with: gtag('event', 'event_name'); when using real GA setup

// Page Load
window.addEventListener('load', () => {
  console.log("GA_TAG_EVENT: page_loaded");
});

// Track button clicks (e.g., Home, About, Contact)
function trackClick(tag) {
  console.log(`GA_TAG_EVENT: ${tag}_clicked`);
}

// Video Play
const video = document.querySelector("video");
if (video) {
  video.addEventListener("play", () => {
    console.log("GA_TAG_EVENT: video_played");
  });
  video.addEventListener("pause", () => {
    console.log("GA_TAG_EVENT: video_paused");
  });
}

// Form Submission
function submitForm() {
  const form = document.getElementById("contactForm");
  const formData = new FormData(form);
  console.log("GA_TAG_EVENT: form_submitted");
  alert("Thanks, your message was sent!");
  form.reset();
}

// Track focus on form fields
const formInputs = document.querySelectorAll("#contactForm input, #contactForm textarea");
formInputs.forEach(input => {
  input.addEventListener("focus", () => {
    console.log(`GA_TAG_EVENT: field_focused_${input.name}`);
  });
});

// File Upload
const fileInput = document.getElementById("fileInput");
if (fileInput) {
  fileInput.addEventListener("change", () => {
    const fileName = fileInput.files[0]?.name || 'unknown';
    console.log(`GA_TAG_EVENT: file_uploaded - ${fileName}`);
  });
}

function handleClick() {
    alert("Thanks for clicking!");
   }
   document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Form submitted! (This is a demo. Backend not connected.)");
   });
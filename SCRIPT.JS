// script.js

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const popup = document.getElementById('popup');
  const popupTitle = document.getElementById('popupTitle');
  const popupPrice = document.getElementById('popupPrice');
  const exploreBtn = document.getElementById('exploreNowBtn');
  const discountBanner = document.getElementById('discountBanner');

  // Dishes array for Explore More popup
  const dishes = [
    { name: "Margherita Pizza", price: "₹199" },
    { name: "Pasta Alfredo", price: "₹249" },
    { name: "Paneer Tikka", price: "₹179" },
    { name: "Veg Biryani", price: "₹229" },
    { name: "Cheeseburger", price: "₹199" },
    { name: "Caesar Salad", price: "₹149" },
    { name: "Gulab Jamun", price: "₹99" },
  ];

  // Track clicks on the discount banner and show discount info
  discountBanner.addEventListener('click', () => {
    alert(
      "Discount Info:\n50% off applied automatically at checkout on all dishes."
    );
    gtag('event', 'discount_banner_click', {
      event_category: 'engagement',
      event_label: 'Discount Banner',
    });
  });

  // Explore More button click - Show all dishes in a popup
  exploreBtn.addEventListener('click', () => {
    let content = "<h3>Our Dishes & Prices</h3><ul>";
    dishes.forEach(dish => {
      content += `<li>${dish.name} - ${dish.price}</li>`;
    });
    content += "</ul><button id='closeExplore'>Close</button>";
    showCustomPopup(content);

    gtag('event', 'explore_more_click', {
      event_category: 'engagement',
      event_label: 'Explore More Button',
    });
  });

  // Show dish popup when clicking on any menu dish image
  document.querySelectorAll('.grid-image').forEach(img => {
    img.addEventListener('click', e => {
      const name = e.target.getAttribute('data-name');
      const price = e.target.getAttribute('data-price');

      popupTitle.textContent = name;
      popupPrice.textContent = `Price: ${price}`;
      popup.style.display = 'block';

      gtag('event', 'dish_click', {
        event_category: 'menu',
        event_label: name,
        value: price.replace(/[₹]/g, ''),
      });
    });
  });

  // Close popup on clicking outside content
  window.onclick = function(event) {
    if (event.target == popup) {
      popup.style.display = "none";
    }
  };

  // Custom popup to show explore dishes list
  function showCustomPopup(htmlContent) {
    const customPopup = document.createElement('div');
    customPopup.id = 'customPopup';
    customPopup.style.position = 'fixed';
    customPopup.style.top = '50%';
    customPopup.style.left = '50%';
    customPopup.style.transform = 'translate(-50%, -50%)';
    customPopup.style.backgroundColor = 'white';
    customPopup.style.padding = '20px';
    customPopup.style.borderRadius = '8px';
    customPopup.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    customPopup.style.zIndex = '1001';
    customPopup.innerHTML = htmlContent;

    // Close button event
    customPopup.querySelector('#closeExplore').addEventListener('click', () => {
      document.body.removeChild(customPopup);
    });

    document.body.appendChild(customPopup);
  }

  // Newsletter subscription button
  const newsletterBtn = document.getElementById('newsletterBtn');
  const newsletterEmail = document.getElementById('newsletterEmail');
  newsletterBtn.addEventListener('click', () => {
    const email = newsletterEmail.value.trim();
    if (validateEmail(email)) {
      alert(`Thank you for subscribing, ${email}!`);
      gtag('event', 'newsletter_subscribe', {
        event_category: 'engagement',
        event_label: 'Newsletter',
        value: email,
      });
      newsletterEmail.value = '';
    } else {
      alert('Please enter a valid email address.');
    }
  });

  // Simple email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Social icon clicks (dummy tracking)
  ['facebookIcon', 'twitterIcon', 'instagramIcon', 'youtubeIcon'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('click', () => {
        gtag('event', 'social_click', {
          event_category: 'engagement',
          event_label: id.replace('Icon', ''),
        });
        alert(`Redirecting to our ${id.replace('Icon', '')} page (demo).`);
      });
    }
  });
});

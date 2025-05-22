// GA4 event function (safety check)
function sendGtagEvent(eventName, params = {}) {
  if (typeof gtag === 'function') {
    gtag('event', eventName, params);
  } else {
    console.warn('gtag function not defined.');
  }
}

// Popup elements
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title');
const popupPrice = document.getElementById('popup-price');
const popupDiscount = document.getElementById('popup-discount');
const popupCloseBtn = document.getElementById('popup-close');

// Show popup for dish
function showDishPopup(dish) {
  const name = dish.dataset.name;
  const price = dish.dataset.price;

  popupTitle.textContent = name;
  popupPrice.textContent = `Price: ${price}`;
  popupDiscount.classList.add('hidden');
  popupDiscount.textContent = '';

  popup.classList.remove('hidden');
  popupCloseBtn.focus();

  // Send GA event
  sendGtagEvent('explore_more_click', {
    event_category: 'menu_interaction',
    event_label: name,
  });
}

// Show popup for discount
function showDiscountPopup(discountBanner) {
  const discountText = discountBanner.dataset.discount;

  popupTitle.textContent = 'Special Discount';
  popupPrice.textContent = discountText;
  popupDiscount.textContent = 'Hurry, limited time offer!';
  popupDiscount.classList.remove('hidden');

  popup.classList.remove('hidden');
  popupCloseBtn.focus();

  // Send GA event
  sendGtagEvent('discount_click', {
    event_category: 'discount_interaction',
    event_label: discountText,
  });
}

// Close popup
popupCloseBtn.addEventListener('click', () => {
  popup.classList.add('hidden');
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.classList.add('hidden');
  }
});

// Dish explore more buttons
const exploreButtons = document.querySelectorAll('.explore-btn');
exploreButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const dish = btn.closest('.dish');
    showDishPopup(dish);
  });
});

// Discount banners click and keyboard accessible
const discountBanners = document.querySelectorAll('.discount-banner');
discountBanners.forEach(banner => {
  banner.addEventListener('click', () => {
    showDiscountPopup(banner);
  });
  banner.addEventListener('keypress', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      showDiscountPopup(banner);
    }
  });
});

// Subscribe form handling with GA4 event tracking
const subscribeForm = document.getElementById('subscribe-form');
const emailInput = document.getElementById('email-input');
const subscribeMessage = document.getElementById('subscribe-message');

subscribeForm.addEventListener('submit', e => {
  e.preventDefault();
  const email = emailInput.value.trim();

  if (!email) {
    subscribeMessage.style.color = 'red';
    subscribeMessage.textContent = 'Please enter a valid email address.';
    return;
  }

  // Mask the email for privacy in GA4 event (optional)
  const maskedEmail = email.replace(/(.{2})(.*)(?=@)/,
    (_, start, middle) => start + '*'.repeat(middle.length));

  // Send custom GA4 event 'newsletter_subscribe'
  sendGtagEvent('newsletter_subscribe', {
    event_category: 'engagement',
    event_label: maskedEmail
  });

  subscribeMessage.style.color = '#4caf50';
  subscribeMessage.textContent = 'Thank you for subscribing!';

  // Clear the input
  emailInput.value = '';
});

// Logo click tracking
const logo = document.querySelector('.logo');
logo.addEventListener('click', () => {
  sendGtagEvent('logo_click', {
    event_category: 'engagement',
    event_label: 'logo_clicked',
  });
});
logo.addEventListener('keypress', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    sendGtagEvent('logo_click', {
      event_category: 'engagement',
      event_label: 'logo_clicked',
    });
  }
});

// Scroll tracking: 50% scroll event, fires once
let scrollTracked = false;
window.addEventListener('scroll', () => {
  if (scrollTracked) return;

  const scrollPosition = window.scrollY + window.innerHeight;
  const pageHeight = document.documentElement.scrollHeight;

  if (scrollPosition >= pageHeight / 2) {
    sendGtagEvent('page_scroll_50', {
      event_category: 'engagement',
      event_label: 'scrolled_50_percent'
    });
    scrollTracked = true;
  }
});

// Function to send a message from the contact form
function sendEmail() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name.trim() !== '' && email.trim() !== '' && message.trim() !== '') {
        const recipientEmail = 'asoneye34@gmail.com';
        const subject = 'Message from Afrospyce Kitchen';
        const body = `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`;
        const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailtoLink;
    } else {
        alert('Please fill out all fields before sending.');
    }
}

// Function to show slides in the gallery
let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".about-slide");

    // Check if slides exist
    if (slides.length === 0) {
        console.error("No slides found.");
        return;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slideIndex++;

    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 4000); // Change slide every 4 seconds
}

// Run the slideshow when the about page is loaded
window.addEventListener("DOMContentLoaded", function () {
    showSlides();
});

let cart = {}; // Object to store selected items and quantities

// Increment quantity
function increment(mealId) {
    const counter = document.getElementById(mealId + "-counter");
    let quantity = parseInt(counter.value);
    quantity++;
    counter.value = quantity;
}

// Decrement quantity
function decrement(mealId) {
    const counter = document.getElementById(mealId + "-counter");
    let quantity = parseInt(counter.value);
    if (quantity > 0) {
        quantity--;
        counter.value = quantity;
    }
}

// Remove item from cart
function removeFromCart(itemId) {
    var itemCounter = document.getElementById(itemId + '-counter');
    var itemCount = parseInt(itemCounter.value);
    if (itemCount > 0) {
        itemCount--;
        itemCounter.value = itemCount;
        updateCart(itemId, itemCount); // Update the cart after removing an item
    }
}

// Update cart and cart summary
function updateCart(itemId, itemCount) {
    cart[itemId] = itemCount;
    updateCartSummary();
}

// Update cart summary in the HTML
function updateCartSummary() {
    var cartSummary = document.getElementById('cart-summary');
    if (!cartSummary) return; // Exit if cart summary element doesn't exist

    // Clear the existing content of cart summary
    cartSummary.innerHTML = '';

    // Iterate through the cart items and display them in the cart summary
    var total = 0;
    for (var itemId in cart) {
        if (cart.hasOwnProperty(itemId)) {
            var itemQuantity            = cart[itemId];
            var itemName = document.getElementById(itemId).querySelector('.item-details h3').textContent;
            var itemPrice = parseFloat(document.getElementById(itemId + "-price").textContent);
            var itemTotal = itemPrice * itemQuantity;
            total += itemTotal;
            var itemSummary = document.createElement('div');
            itemSummary.textContent = `${itemName} x ${itemQuantity} - $${itemTotal.toFixed(2)}`;
            cartSummary.appendChild(itemSummary);
        }
    }

    // Display total in cart summary
    var totalDiv = document.createElement('div');
    totalDiv.innerHTML = `<p class="total">Total: $${total.toFixed(2)}</p>`;
    cartSummary.appendChild(totalDiv);
}

// Add item to cart
function addToCart(mealId) {
    const quantity = parseInt(document.getElementById(mealId + "-counter").value);
    if (quantity > 0) {
        updateCart(mealId, quantity); // Update the cart
        scrollToCartSummary(); // Scroll to the cart summary section
    } else {
        alert("Please select a quantity greater than 0.");
    }
}

// Function to scroll to the cart summary section
function scrollToCartSummary() {
    const cartSummarySection = document.getElementById('cart-summary');
    cartSummarySection.scrollIntoView({ behavior: 'smooth' });
}


// Function to send the order summary via email
function sendOrder() {
    var address = document.getElementById('address').value;
    var name = document.getElementById('name').value;
    var items = '';

    // Construct the order summary
    for (var itemId in cart) {
        if (cart.hasOwnProperty(itemId)) {
            var itemName = document.getElementById(itemId).querySelector('.item-details h3').textContent;
            var itemCount = cart[itemId];
            items += itemName + ': ' + itemCount + '\n';
        }
    }
	

    // Prepare email subject and body
    var subject = 'Order from ' + name;
    var body = 'Delivery Address: ' + address + '\n\n' +
        'Order Summary:\n' + items;

    // Construct mailto link
    var mailtoLink = 'mailto:your-email@example.com' +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

    // Open default email client
    window.location.href = mailtoLink;

    // Reset form after submission
    document.getElementById("contactForm").reset();
}

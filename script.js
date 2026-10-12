// Initialize EmailJS
emailjs.init({
    publicKey: "Pt-jVdI0_JtYeUors"
});

document.getElementById("orderForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let product = document.getElementById("product").value;
    let size = document.getElementById("size").value;
    let quantity = document.getElementById("quantity").value;
    let address = document.getElementById("address").value.trim();

    let valid = true;

    // Clear old errors
    document.querySelectorAll("small").forEach(function(error) {
        error.innerHTML = "";
    });

    // Name validation
    if (name === "") {
        document.getElementById("nameError").innerHTML =
            "Please enter your name.";
        valid = false;
    } else if (!/^[A-Za-z ]+$/.test(name)) {
        document.getElementById("nameError").innerHTML =
            "Name should contain only letters.";
        valid = false;
    }

    // Email validation
    if (email === "") {
        document.getElementById("emailError").innerHTML =
            "Please enter your email.";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById("emailError").innerHTML =
            "Enter a valid email address.";
        valid = false;
    }

    // Phone validation
    if (!/^[0-9]{10}$/.test(phone)) {
        document.getElementById("phoneError").innerHTML =
            "Phone number must contain 10 digits.";
        valid = false;
    }

    // Product validation
    if (product === "") {
        document.getElementById("productError").innerHTML =
            "Please select a T-shirt.";
        valid = false;
    }

    // Size validation
    if (size === "") {
        document.getElementById("sizeError").innerHTML =
            "Please select a size.";
        valid = false;
    }

    // Quantity validation
    if (quantity === "" || quantity < 1 || quantity > 10) {
        document.getElementById("quantityError").innerHTML =
            "Quantity must be between 1 and 10.";
        valid = false;
    }

    // Address validation
    if (address.length < 10) {
        document.getElementById("addressError").innerHTML =
            "Please enter a complete address.";
        valid = false;
    }

    // Stop if validation failed
    if (!valid) {
        return;
    }

    // EmailJS data
    let templateParams = {
        name: name,
        email: email,
        phone: phone,
        product: product,
        size: size,
        quantity: quantity,
        address: address
    };

    // Send email
    emailjs.send(
        "service_2s7s0ws",
        "template_oc4wrxo",
        templateParams
    )
    .then(function(response) {

        alert("🎉 Order placed successfully!");

        document.getElementById("orderForm").reset();

    })
    .catch(function(error) {

        console.error("EmailJS Error:", error);

        alert("❌ Order could not be sent. Please try again.");

    });

});
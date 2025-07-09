/*Name: Dil Humyra Sultana Borna
     ID: 139166227
     Date: 7/12/2024*/

/*Name: Dil Humyra Sultana Borna
     ID: 139166227
     Date: 7/12/2024*/

//Array
const products = [
    { product: "Adirondack Chair", type: "c", price: 100 },
    { product: "Barcelona Chair", type: "c", price: 150 },
    { product: "Chaise Longue", type: "c", price: 500 },
    { product: "Chesterfield Chair", type: "c", price: 800 },
    { product: "Coffee Table", type: "t", price: 900 },
    { product: "Dining Table", type: "t", price: 1500 },
    { product: "Director’s Chair", type: "c", price: 660 },
    { product: "Eames Lounge Chair", type: "c", price: 1000 },
    { product: "Foyer Table", type: "t", price: 600 },
    { product: "Patio Table", type: "t", price: 450 },
    { product: "Rocking Chair", type: "c", price: 350 },
    { product: "Side Table", type: "t", price: 200 },
    { product: "Stacking Chair", type: "c", price: 80 },
    { product: "Wingback Chair", type: "c", price: 950 },
    { product: "Wishbone Chair", type: "c", price: 250 }
];

const container = document.getElementById('product-container');

// Function to create and add chair elements dynamically
function createChairElements() {
    const chairs = products.filter(product => product.type === "c");

    chairs.forEach(chair => {
        const productRow = document.createElement('section'); // Create a section for each chair
        productRow.classList.add('product-row'); // Add class for styling

        // Create a flex container for two columns
        productRow.style.display = 'flex'; // Use flexbox for layout
        productRow.style.justifyContent = 'space-between'; // Space between columns
        productRow.style.alignItems = 'center'; // Center items vertically

        // Column for product name
        const productName = document.createElement('span'); // Use span for product name
        productName.textContent = `${chair.product}`; // Set product name text
        productRow.appendChild(productName); // Append to row
        
        // Column for price and quantity input
        const priceQuantityContainer = document.createElement('span'); // Use span for price and input
        priceQuantityContainer.textContent = `$${chair.price}`; // Set price text
         
        // Create input field for quantity
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.min = '0';
        inputField.placeholder = '0';
        inputField.classList.add('quantity-input'); // Add class for styling
        inputField.style.marginLeft = '10px'; 
        
        priceQuantityContainer.appendChild(inputField); // Append the input field to price container
        productRow.appendChild(priceQuantityContainer); // Append to row
        container.appendChild(productRow); // Append the product row to the container
    });
}

// Event listener to handle double-click event
container.addEventListener('dblclick', () => {
    container.innerHTML = ''; // Clear existing content in the container
    createChairElements(); // Create and add chair elements dynamically
    addSubmitButton(); // Add submit button
});

// Function to add submit button after products are created
function addSubmitButton() {
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    submitButton.classList.add('submit-button'); // Add class for styling
    submitButton.addEventListener('click', handleSubmit); // Event listener for submit button
    container.appendChild(submitButton); // Append the button to the container
}

// Function to handle order submission
function handleSubmit() {
    let totalProducts = 0;
    let totalAmount = 0;

    // Get all input fields from the container
    const inputs = container.getElementsByTagName('input');
    Array.from(inputs).forEach((input, index) => {
        const qty = Number(input.value) || 0; // Convert input value to number, default to 0 if invalid
        if (qty > 0) { // Only count if quantity is more than 0
            totalProducts += qty; // Update total products count
            totalAmount += qty * products[index].price; // Calculate total amount
        }
    });

    // Display total products and total amounts
    alert(`You have ordered ${totalProducts} chairs for a total of $${totalAmount}`);
}
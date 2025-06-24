<script>
    // Event listener for compare price buttons
    document.querySelectorAll('.compare-btn').forEach(button = {
        button.addEventListener('click', async (event) => {
            // Get the product name from the button's data attribute
            const productName = event.target.getAttribute('data-product');
            
            try {
                // Send a POST request to compare prices
                const response = await fetch('http://localhost:5000/compare-price', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productName })
                });

                // Parse the response data
                const data = await response.json();

                // Create a message to display comparison
                let message = "";
                
                // Check if product was found on Amazon
                if (data.amazon.error) {
                    message += "Amazon: " + data.amazon.error + "\n";
                } else {
                    message += `Amazon: ${data.amazon.product} - ₹${data.amazon.price}\n`;
                }

                // Check if product was found on Flipkart
                if (data.flipkart.error) {
                    message += "Flipkart: " + data.flipkart.error + "\n";
                } else {
                    message += `Flipkart: ${data.flipkart.product} - ₹${data.flipkart.price}\n`;
                }

                // Display the comparison result
                alert(message);

            } catch (error) {
                console.error('Error comparing prices:', error);
                alert('Failed to compare prices. Please try again later.');
            }
        })
    });
</script>

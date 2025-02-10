
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('.houseDetails');
    
    form.addEventListener('submit', function(e) {
        // prevent default event action
        e.preventDefault();


        // collect form data
        const formData = {
            GrLivArea: document.getElementById('groundLivingArea').value,
            TotalBsmtSF: document.getElementById('totalBasementSF').value,
            GarageCars: document.getElementById('garageCars').value,
            YearBuilt: document.getElementById('yearBuilt').value,
            HouseAge: document.getElementById('houseAge').value,
            OverallQual: document.getElementById('overallQuality').value,
            ExterQual_encoded: document.getElementById('exteriorQuality').value,
            KitchenQual_encoded: document.getElementById('kitchenQuality').value,
            BsmtQual_encoded: document.getElementById('basementQuality').value,
        };

        // send data to the backend
        fetch('http://localhost:3000/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })

        .then(response => response.json())
        .then(data => {
            if (data.success) {
              alert('Data saved to database!');
              form.reset(); // Clear form
            } else {
              alert('Error: ' + data.error);
            }
          })
        .catch(error => console.error('Error:', error));
    });
});
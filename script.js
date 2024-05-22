document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image file');
        return;
    }

    document.getElementById('loader').style.display = 'block';
    document.getElementById('result').style.display = 'none';

    const reader = new FileReader();
    reader.onload = function() {
        const dataUrl = reader.result;

        // Substitua pela URL do seu endpoint no API Gateway
        const apiUrl = 'https://seu-api-gateway-endpoint.amazonaws.com/prod/analyze-image';

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ image: dataUrl })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('result').style.display = 'block';
            document.getElementById('analysisOutput').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => {
            document.getElementById('loader').style.display = 'none';
            console.error('Error:', error);
            alert('There was an error analyzing the image');
        });
    };
    reader.readAsDataURL(file);
});

document.getElementById('generateButton').addEventListener('click', async () => {
    const prompt = document.getElementById('userPrompt').value;

    if (!prompt) {
        alert('Please enter a prompt.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/generate-design', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        const design = await response.json();

        document.getElementById('designPreview').innerHTML = design.html;
        document.getElementById('htmlCode').textContent = design.html;
        document.getElementById('cssCode').textContent = design.css;
    } catch (error) {
        console.error('Error generating design:', error);
    }
});

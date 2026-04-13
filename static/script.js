// Text Summarization Handler
document.getElementById('textForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const textInput = document.getElementById('textInput').value.trim();
    const textResult = document.getElementById('textResult');
    const textLoading = document.getElementById('textLoading');
    const textError = document.getElementById('textError');
    const textSubmitBtn = document.getElementById('textSubmitBtn');
    
    // Reset displays
    textResult.classList.add('d-none');
    textError.classList.add('d-none');
    
    // Validation
    if (!textInput) {
        showError('textError', 'textErrorMsg', 'Please enter some text');
        return;
    }
    
    if (textInput.length < 10) {
        showError('textError', 'textErrorMsg', 'Text must be at least 10 characters long');
        return;
    }
    
    // Show loading
    textLoading.classList.remove('d-none');
    textSubmitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/summarize-text', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: textInput })
        });
        
        const data = await response.json();
        
        textLoading.classList.add('d-none');
        textSubmitBtn.disabled = false;
        
        if (!response.ok) {
            showError('textError', 'textErrorMsg', data.error || 'An error occurred');
            return;
        }
        
        // Display result
        document.getElementById('textSummary').textContent = data.summary;
        textResult.classList.remove('d-none');
        textResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        textLoading.classList.add('d-none');
        textSubmitBtn.disabled = false;
        showError('textError', 'textErrorMsg', 'Network error: ' + error.message);
    }
});

// PDF Summarization Handler
document.getElementById('pdfForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const pdfInput = document.getElementById('pdfInput');
    const pdfFile = pdfInput.files[0];
    const pdfResult = document.getElementById('pdfResult');
    const pdfLoading = document.getElementById('pdfLoading');
    const pdfError = document.getElementById('pdfError');
    const pdfSubmitBtn = document.getElementById('pdfSubmitBtn');
    
    // Reset displays
    pdfResult.classList.add('d-none');
    pdfError.classList.add('d-none');
    
    // Validation
    if (!pdfFile) {
        showError('pdfError', 'pdfErrorMsg', 'Please select a PDF file');
        return;
    }
    
    if (!pdfFile.name.toLowerCase().endsWith('.pdf')) {
        showError('pdfError', 'pdfErrorMsg', 'Please select a valid PDF file');
        return;
    }
    
    // Check file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (pdfFile.size > maxSize) {
        showError('pdfError', 'pdfErrorMsg', 'File size exceeds 10MB limit');
        return;
    }
    
    // Show loading
    pdfLoading.classList.remove('d-none');
    pdfSubmitBtn.disabled = true;
    
    try {
        const formData = new FormData();
        formData.append('pdf_file', pdfFile);
        
        const response = await fetch('/api/summarize-pdf', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        pdfLoading.classList.add('d-none');
        pdfSubmitBtn.disabled = false;
        
        if (!response.ok) {
            showError('pdfError', 'pdfErrorMsg', data.error || 'An error occurred');
            return;
        }
        
        // Display result
        document.getElementById('pdfSummary').textContent = data.summary;
        pdfResult.classList.remove('d-none');
        pdfResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        pdfLoading.classList.add('d-none');
        pdfSubmitBtn.disabled = false;
        showError('pdfError', 'pdfErrorMsg', 'Network error: ' + error.message);
    }
});

// Text Input Event Listeners
document.getElementById('textInput').addEventListener('input', (e) => {
    const charCount = e.target.value.length;
    document.getElementById('charCount').textContent = charCount;
});

// PDF File Input Event Listeners
document.getElementById('pdfInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const pdfFileName = document.getElementById('pdfFileName');
    const pdfPreview = document.getElementById('pdfPreview');
    
    if (file) {
        pdfFileName.textContent = file.name;
        
        // Show file preview
        document.getElementById('previewFileName').textContent = file.name;
        document.getElementById('previewFileSize').textContent = (file.size / 1024).toFixed(2);
        pdfPreview.classList.remove('d-none');
    } else {
        pdfFileName.textContent = 'No file selected';
        pdfPreview.classList.add('d-none');
    }
});

// Helper function to show errors
function showError(errorContainerId, errorMsgId, message) {
    const errorContainer = document.getElementById(errorContainerId);
    const errorMsg = document.getElementById(errorMsgId);
    errorMsg.textContent = message;
    errorContainer.classList.remove('d-none');
    errorContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Copy to clipboard function
function copyToClipboard(elementId) {
    const text = document.getElementById(elementId).textContent;
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary success message
        const btn = event.target.closest('button');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.classList.add('btn-success');
        btn.classList.remove('btn-outline-secondary');
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-outline-secondary');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy:', err);
        alert('Failed to copy text');
    });
}

// Dark mode toggle (optional enhancement)
document.addEventListener('DOMContentLoaded', () => {
    // You can add keyboard shortcuts here
    console.log('Application loaded successfully!');
});

# Text & PDF Summarizer Web App

A modern, responsive web application for summarizing text and PDF documents using AI (OpenRouter/OpenAI).

## Features

✨ **Modern UI** - Clean, responsive design with gradient backgrounds  
📝 **Text Summarization** - Paste text and get AI-powered summaries  
📄 **PDF Summarization** - Upload PDF files for automatic summarization  
⚡ **Real-time Processing** - Instant feedback with loading indicators  
📋 **Copy to Clipboard** - Easily copy summaries to clipboard  
📱 **Mobile Friendly** - Works perfectly on all devices  
🎨 **Beautiful Design** - Modern UI with Bootstrap 5  

## Installation

### Prerequisites
- Python 3.8+
- OpenRouter API Key (get it at https://openrouter.ai)

### Setup Steps

1. **Navigate to project directory**
   ```bash
   cd e:\Desktop\Pratik.dev\github\RESOURCES\AIA_Project
   ```

2. **Activate virtual environment** (if using opencode-env)
   ```bash
   opencode-env\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create `.env` file** (if not already created)
   ```
   OPENROUTER_API_KEY=your_api_key_here
   ```

5. **Run the Flask app**
   ```bash
   python app.py
   ```

6. **Open in browser**
   - Navigate to `http://localhost:5000`
   - The app will open with both Text and PDF tabs available

## Project Structure

```
AIA_Project/
├── app.py                      # Flask backend API
├── requirements.txt            # Python dependencies
├── templates/
│   └── index.html             # Main HTML interface
├── static/
│   ├── style.css              # Styling
│   └── script.js              # Frontend JavaScript
├── multi_llm.py               # Original multi-LLM module
├── text_summary.py            # Original text summarizer
├── pdf_summary.py             # Original PDF summarizer
└── .env                       # API keys (create this)
```

## Usage

### Text Summarization
1. Click the "Text" tab
2. Paste or type your text (minimum 10 characters)
3. Click "Summarize Text"
4. View and copy the summary

### PDF Summarization
1. Click the "PDF" tab
2. Click "Browse" and select a PDF file
3. Click "Summarize PDF"
4. View and copy the summary

## API Endpoints

### POST `/api/summarize-text`
**Request:**
```json
{
  "text": "Your text here..."
}
```

**Response:**
```json
{
  "summary": "Summary here..."
}
```

### POST `/api/summarize-pdf`
**Request:** (multipart/form-data)
- `pdf_file`: PDF file

**Response:**
```json
{
  "summary": "Summary here..."
}
```

## Configuration

### Modify AI Model
Edit `app.py` and change the model in the API calls:
```python
model="openai/gpt-4o-mini"  # Change this to your preferred model
```

Available models via OpenRouter: https://openrouter.ai/docs/models

### Adjust Token Limits
Edit the token limit in `pdf_summary.py` (currently 4000):
```python
text_to_summarize = text[:4000]  # Increase or decrease as needed
```

## Troubleshooting

### Issue: "API Key not found"
- Make sure `.env` file exists with `OPENROUTER_API_KEY=your_key`
- Restart Flask app after creating `.env`

### Issue: "ModuleNotFoundError"
- Activate virtual environment: `opencode-env\Scripts\activate`
- Install requirements: `pip install -r requirements.txt`

### Issue: Port 5000 already in use
- Change port in `app.py`: `app.run(debug=True, port=5001)`
- Then access at `http://localhost:5001`

### Issue: PDF not being read
- Ensure PDF is not password protected
- Try with a different PDF file
- Check file size (max 10MB)

## Development

### Add New Features
1. Add backend route in `app.py`
2. Add HTML markup in `templates/index.html`
3. Add JavaScript handler in `static/script.js`
4. Add styling in `static/style.css`

### Test Backend
```bash
curl -X POST http://localhost:5000/api/summarize-text \
  -H "Content-Type: application/json" \
  -d '{"text": "Your test text here"}'
```

## Browser Support
- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Full support

## Performance Tips
- Use shorter texts for faster processing
- Split large PDFs into smaller sections
- Cache summaries for repeated requests (can be added)

## Future Enhancements
- [ ] Summary tone selection (formal, casual, technical)
- [ ] Multiple language support
- [ ] Export summaries to PDF/Word
- [ ] Summary history/bookmarks
- [ ] Batch processing for multiple files
- [ ] Custom summarization length
- [ ] Integration with cloud storage (Google Drive, Dropbox)

## License
This project is open source and available under the MIT License.

## Support
For issues or questions, please check the troubleshooting section or create an issue in the repository.

from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from openai import OpenAI
from pypdf import PdfReader
import io

load_dotenv()

app = Flask(__name__)
CORS(app)

# OpenAI setup via OpenRouter
api_key = os.getenv("OPENROUTER_API_KEY")
if not api_key:
    raise ValueError("OPENROUTER_API_KEY not found in .env file!")

# Remove quotes if present (in case of misconfiguration)
api_key = api_key.strip('"').strip("'")

client = OpenAI(
    api_key=api_key,
    base_url="https://openrouter.ai/api/v1"
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/summarize-text', methods=['POST'])
def summarize_text():
    try:
        data = request.json
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({'error': 'Please provide text to summarize'}), 400
        
        if len(text) < 10:
            return jsonify({'error': 'Text is too short to summarize'}), 400
        
        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[
                {"role": "system", "content": "Summarize the following text concisely and clearly."},
                {"role": "user", "content": text}
            ]
        )
        
        summary = response.choices[0].message.content
        return jsonify({'summary': summary}), 200
    
    except Exception as e:
        error_msg = str(e)
        print(f"Text summarization error: {error_msg}")
        return jsonify({'error': f'Server error: {error_msg}'}), 500

@app.route('/api/summarize-pdf', methods=['POST'])
def summarize_pdf():
    try:
        if 'pdf_file' not in request.files:
            return jsonify({'error': 'No PDF file provided'}), 400
        
        pdf_file = request.files['pdf_file']
        
        if pdf_file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        if not pdf_file.filename.lower().endswith('.pdf'):
            return jsonify({'error': 'Please upload a PDF file'}), 400
        
        # Read PDF
        try:
            pdf_bytes = pdf_file.read()
            pdf_reader = PdfReader(io.BytesIO(pdf_bytes))
            
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text()
            
            if not text.strip():
                return jsonify({'error': 'PDF appears to be empty or unreadable'}), 400
            
            # Limit text to avoid token limits
            text_to_summarize = text[:4000]
            
            response = client.chat.completions.create(
                model="openai/gpt-4o-mini",
                messages=[
                    {"role": "system", "content": "Summarize this PDF content in simple, clear terms."},
                    {"role": "user", "content": text_to_summarize}
                ]
            )
            
            summary = response.choices[0].message.content
            return jsonify({'summary': summary}), 200
        
        except Exception as pdf_error:
            error_msg = str(pdf_error)
            print(f"PDF reading error: {error_msg}")
            return jsonify({'error': f'Error reading PDF: {error_msg}'}), 400
    
    except Exception as e:
        error_msg = str(e)
        print(f"PDF summarization error: {error_msg}")
        return jsonify({'error': f'Server error: {error_msg}'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)

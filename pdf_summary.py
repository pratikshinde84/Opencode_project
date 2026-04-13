from pypdf import PdfReader
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)
def read_pdf(file_path):
    reader = PdfReader(file_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def summarize_pdf(text):
    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {"role": "system", "content": "Summarize this PDF content in simple terms."},
            {"role": "user", "content": text[:4000]}  # limit tokens
        ]
    )
    return response.choices[0].message.content

if __name__ == "__main__":
    pdf_text = read_pdf("sample.pdf")
    summary = summarize_pdf(pdf_text)
    print("\nPDF Summary:\n", summary)
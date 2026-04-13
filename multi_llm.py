from openai import OpenAI
import os

# OpenAI setup
client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)
def openai_summary(text):
    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[{"role": "user", "content": f"Summarize: {text}"}]
    )
    return response.choices[0].message.content


# Local LLM using Ollama
import subprocess

def ollama_summary(text):
    result = subprocess.run(
        ["ollama", "run", "llama3", text],
        capture_output=True,
        text=True
    )
    return result.stdout


if __name__ == "__main__":
    text = "Machine learning enables systems to learn automatically..."

    print("\nOpenAI Summary:\n", openai_summary(text))
    print("\nOllama Summary:\n", ollama_summary(text))
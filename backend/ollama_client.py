import requests
import json

URL = "http://localhost:11434/api/chat"


def chat_with_ollama(messages):

    payload = {
        "model": "qwen3:8b",
        "messages": messages,
        "stream": True
    }

    response = requests.post(
        URL,
        json=payload,
        stream=True
    )

    if response.status_code != 200:
        raise Exception(f"Ollama Error: {response.status_code}")

    assistant_reply = ""

    for line in response.iter_lines():

        if not line:
            continue

        chunk = json.loads(line)

        if "message" in chunk:
            assistant_reply += chunk["message"]["content"]

    return assistant_reply
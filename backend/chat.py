import requests
import json

url = "http://localhost:11434/api/chat"

messages = []

print("=" * 50)
print("Welcome to MiniMe!")
print("Type 'exit' to quit.")
print("=" * 50)

while True:

    assistant_reply = ""

    prompt = input("\nYou: ")

    if prompt.lower() == "exit":
        print("\nGoodbye!")
        break

    # Store the user's message
    messages.append({
        "role": "user",
        "content": prompt
    })

    payload = {
        "model": "qwen3:8b",
        "messages": messages,
        "stream": True
    }

    print("\nMiniMe: ", end="", flush=True)

    response = requests.post(
        url,
        json=payload,
        stream=True
    )

    if response.status_code != 200:
        print(f"\nError: {response.status_code}")
        continue

    for line in response.iter_lines():

        if not line:
            continue

        chunk = json.loads(line)

        if "message" in chunk:
            content = chunk["message"]["content"]
            print(content, end="", flush=True)
            assistant_reply += content

    # Store the assistant's reply
    messages.append({
        "role": "assistant",
        "content": assistant_reply
    })

    print()
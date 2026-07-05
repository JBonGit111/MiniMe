import json
from pathlib import Path

# Path to our chat history file
CHAT_HISTORY_FILE = Path("../data/chat_history.json")

# Load previous conversation when the server starts
if CHAT_HISTORY_FILE.exists():
    with open(CHAT_HISTORY_FILE, "r") as file:
        messages = json.load(file)
else:
    messages = []


def save_messages():
    with open(CHAT_HISTORY_FILE, "w") as file:
        json.dump(messages, file, indent=4)


def add_user_message(message):
    messages.append({
        "role": "user",
        "content": message
    })
    save_messages()


def add_assistant_message(message):
    messages.append({
        "role": "assistant",
        "content": message
    })
    save_messages()


def get_messages():
    return messages
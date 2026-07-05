from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import ChatRequest, ChatResponse
from conversation_manager import (
    add_user_message,
    add_assistant_message,
    get_messages,
)
from ollama_client import chat_with_ollama

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "MiniMe backend is running"
    }


@app.post("/chat")
def chat(request: ChatRequest):

    # Store the user's message
    add_user_message(request.message)

    # Get the full conversation
    messages = get_messages()

    # Ask Ollama for a reply
    reply = chat_with_ollama(messages)

    # Store the assistant's reply
    add_assistant_message(reply)

    # Send the reply back to the user
    return ChatResponse(
        reply=reply
    )
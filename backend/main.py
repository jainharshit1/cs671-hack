from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



from fastapi import FastAPI, File, UploadFile, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

@app.post("/upload/")
async def upload_file_or_text(
    file: Optional[UploadFile] = File(None),
    text: Optional[str] = Form(None)
):
    if file:
        if not file.content_type.startswith("audio/"):
            raise HTTPException(status_code=400, detail="Only audio files are accepted.")
        contents = await file.read()
        return {"message": "Audio file received", "filename": file.filename, "type": file.content_type}

    elif text:
        return {"message": "Text received", "text": text}

    else:
        raise HTTPException(status_code=400, detail="No input provided.")


# main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from openai import OpenAI
from dotenv import load_dotenv
from fastapi.security import APIKeyHeader


# Simple API key auth
API_KEY = ""  # For demo purposes
api_key_header = APIKeyHeader(name="X-API-Key")


def get_api_key(api_key: str = Depends(api_key_header)):
    if api_key != API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key",
        )
    return api_key


# Initialize OpenAI client
client = OpenAI(api_key="")


# Define request/response models
class Message(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[Message]
    model: str = "gpt-4"
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = 500


class ChatResponse(BaseModel):
    message: Message
    usage: dict


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest, api_key: str = Depends(get_api_key)):
    try:
        # Convert our Message objects to dicts for OpenAI
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]

        # Call OpenAI API
        response = client.chat.completions.create(
            model=request.model,
            messages=messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens,
        )

        # Extract the assistant's message from the response
        assistant_message = response.choices[0].message

        return ChatResponse(
            message=Message(
                role=assistant_message.role,
                content=assistant_message.content
            ),
            usage={
                "prompt_tokens": response.usage.prompt_tokens,
                "completion_tokens": response.usage.completion_tokens,
                "total_tokens": response.usage.total_tokens
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/models")
async def list_models(api_key: str = Depends(get_api_key)):
    try:
        models = client.models.list()
        # Filter to only include GPT models
        gpt_models = [model.id for model in models.data if "gpt" in model.id.lower()]
        return {"models": gpt_models}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/")
async def root():
    return {"message": "OpenAI Chat API is running"}

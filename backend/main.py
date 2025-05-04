from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi import File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware

from embeddings_senti import table
from infer_emotion import process_and_search, key_extraction, transcribe_audio

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
@app.get("/")
async def root():
    return {"message": "OpenAI Chat API is running"}


@app.post("/api/chatbot")
async def upload_file_or_text(
        file: Optional[UploadFile] = File(None),
        text: Optional[str] = Form(None)
):
    if file:
        if not file.content_type.startswith("audio/"):
            raise HTTPException(status_code=400, detail="Only audio files are accepted.")
        contents = await file.read()
        with open(f"uploaded_{file.filename}", "wb") as f:
            f.write(contents)

        text_chatbot = transcribe_audio("uploaded_recording.webm")
    elif text:
        text_chatbot = text
    else:
        raise HTTPException(status_code=400, detail="No input provided.")

    print("Received text:", text_chatbot)

    keys = key_extraction(text_chatbot)

    print("Extracted keys:", keys)

    results_df, formatted_results = process_and_search(table, keys, limit=10)
    # output_senti = get_refined_recommendations(formatted_results, max_recommendations=10)

    print("Formatted results:", formatted_results)

    titles = [formatted_results["results"][i]["movie_id"] for i in range(len(formatted_results["results"]))]

    print(titles)

    return {"message": "Text received", "text": text_chatbot, "results": titles}

#
# recommendations_df= get_movie_reccs(title_reviews)
#
#    ids_string = get_imdb_ids_from_titles(movie_titles)

# results_df, formatted_results = process_and_search(table, keys, limit=10)
## output_senti = get_refined_recommendations(formatted_results, max_recommendations=5)
# final_output_senti = get_imdbid(output_senti)

#
# output_hist = get_output(recommendations_df)
# final_output_hist = get_imdbid(output_hist)
#

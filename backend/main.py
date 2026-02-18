from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from azure.core.credentials import AzureKeyCredential
from azure.search.documents import SearchClient
import os

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔹 Replace with your Azure details
AZURE_SEARCH_ENDPOINT = "https://your-service-name.search.windows.net"
AZURE_SEARCH_KEY = "your-admin-key"
INDEX_NAME = "your-index-name"

# Create Search Client
search_client = SearchClient(
    endpoint=AZURE_SEARCH_ENDPOINT,
    index_name=INDEX_NAME,
    credential=AzureKeyCredential(AZURE_SEARCH_KEY)
)

@app.get("/")
def home():
    return {"message": "Azure AI Search Backend Running"}

@app.get("/search")
def search(q: str):
    results = search_client.search(search_text=q)

    output = []
    for result in results:
        output.append({
            "title": result.get("title", ""),
            "content

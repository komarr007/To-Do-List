from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mongo_connect
from pydantic import BaseModel
import datetime

class Record(BaseModel):
    title: str
    description: str
    date: str
    status: str

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET"],
    allow_headers=["Content-Type","application/json"],
)

dbname = mongo_connect.get_database('testing')
collection_name = dbname['to_do_list']

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/data")
async def data():
    all_data = []
    for data in mongo_connect.shows_all_data(collection_name, {}, {"_id": 0}):
        all_data.append(data)
    
    return all_data

@app.post("/record")
async def create_record(record: Record):
    id = mongo_connect.generate_id()
    created_at = datetime.datetime.now()
    due_date = datetime.datetime.today() + datetime.timedelta(days=1)
    data = mongo_connect.format_data(id, record.title, record.description, due_date, record.status, created_at)
    mongo_connect.insert_one_document(collection_name, data)
    return {"message": "Success"}
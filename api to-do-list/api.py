from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mongo_connect
from pydantic import BaseModel
import datetime

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
async def create_record(title: str, desc: str):
    id = mongo_connect.generate_id()
    status = "Pending"
    created_at = datetime.datetime.now()
    due_date = datetime.datetime.today() + datetime.timedelta(days=1)
    data = mongo_connect.format_data(id, title, desc, due_date, status, created_at)
    mongo_connect.insert_one_document(collection_name, data)
    return {"message": "Success"}

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mongo_connect

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/data")
async def data():
    all_data = []
    dbname = mongo_connect.get_database('testing')
    collection_name = dbname['to_do_list']
    for data in mongo_connect.shows_all_data(collection_name, {}, {"_id": 0}):
        all_data.append(data)
    
    return all_data
    

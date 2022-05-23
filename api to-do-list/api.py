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
    dbname = mongo_connect.get_database('testing')
    collection_name = dbname['to_do_list']
    return mongo_connect.shows_data(collection_name, {"Tittle":"Tittle1"},{'_id':0})
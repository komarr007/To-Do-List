from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mongo_connect
from pydantic import BaseModel
import datetime

app = FastAPI(
    title="To Do List App",
    description="you want some meta? eat this shit",
    version="0.0.1",
    terms_of_service="http://canuseethemeta?fuckoff.com/terms/",
    contact={
        "name": "RIGAQI???",
        "url": "http://komarr007.github.io/RIGAQI",
        "email": "mariorangga000@gmail.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)

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

@app.put("/update") # update data
async def update_record(id: str, status: str):
    query = {
        "id":id
    }
    new_values = { "$set": {
        "Status":status,
    }
    }
    mongo_connect.update_document(collection_name,query,new_values)
    return {"message":"data updated!"} 

@app.delete("/delete") # delete data
async def delete_record(id: str):
    query = {
        "id":id
    }
    mongo_connect.delete_document(collection_name,query)
    return {"message":"data deleted!"}
from fastapi import FastAPI
import mongo_connect

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/data")
async def data():
    dbname = mongo_connect.get_database('testing')
    collection_name = dbname['to_do_list']
    return mongo_connect.shows_data(collection_name, {"Tittle":"Tittle1"},{'_id':0})
    
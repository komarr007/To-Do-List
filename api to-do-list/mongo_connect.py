from datetime import datetime
import uuid

def get_database(database_name):
    from pymongo import MongoClient
    import pymongo

    CONNECTION_STRING = "localhost:27017"
    client = MongoClient(CONNECTION_STRING)

    return client[database_name]
    
def insert_many_document(collection, document):
    return collection.insert_many(document)

def insert_one_document(collection, document):
    return collection.insert_one(document)

def update_document(collection, query, new_values):
    return collection.update_one(query, new_values)

def shows_one_data(collection_name, *args):
    return collection_name.find_one(*args)

def shows_all_data(collection_name, *args):
    return collection_name.find(*args)

def generate_id():
    return str(uuid.uuid4())

def format_data(Id, Tittle, Description, Due_Date, Status, Created_at):
    return {
        'id': Id,
        'created_at': Created_at,
        'Tittle': Tittle,
        'Description': Description,
        'Due_Date': Due_Date,
        'Status': Status
    }

def delete_document(collection_name, query):
    return collection_name.delete_one(query)
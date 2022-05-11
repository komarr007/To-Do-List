from datetime import datetime

def get_database(database_name):
    from pymongo import MongoClient
    import pymongo

    CONNECTION_STRING = "localhost:27017"
    client = MongoClient(CONNECTION_STRING)

    return client[database_name]
    
def insert_document(collection, document):
    return collection.insert_many(document)

def update_document(collection, query, new_values):
    return collection.update_one(query, new_values)

def shows_data(collection_name, *args):
    return collection_name.find_one(*args)

def format_data(Tittle, Description, Due_Date, Status, created_at):
    return {
        'created_at': created_at,
        'Tittle': Tittle,
        'Description': Description,
        'Due_Date': Due_Date,
        'Status': Status
    }
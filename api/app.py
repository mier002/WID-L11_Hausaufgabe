from fastapi import FastAPI 
 
app = FastAPI() 
 
@app.get("/transformation") 
async def add(ing:int, lat:int): 
    return {"resultat": a+b} 
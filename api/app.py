from fastapi import FastAPI, HTTPException
from pyproj import Transformer
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins=["*"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                   )

lv_wgs = Transformer.from_crs("EPSG:2056", "EPSG:4326")
wgs_lv = Transformer.from_crs("EPSG:4326", "EPSG:2056")


@app.get("/")
async def index():
    return {"message": "Willkommen beim Koordinatentransformations-Webservice!"} #Funktionscheck

#WGS nach LV95
@app.get("/wgs84lv95/")
async def wgs84_to_lv95(lng: float, lat: float):
    
    # Umrechnung nach LV95
    x, y = wgs_lv.transform(lat, lng)
    
    # JSON-Ausgabe
    return {"system": "LV95", "E": x, "N": y}


#LV95 nach WGS
@app.get("/lv95wgs84/")
async def lv95_to_wgs84(E: float, N: float):
    
    #Umrechnung LV95 nach WGS
    lat, lng = lv_wgs.transform(E, N)
    
    #JSON-Ausgabe
    return {"system": "WGS84", "longitude": lng, "latitude": lat}



# Aufruf Browser, wenn Server gestartet
# localhost:8000/lv95wgs84?E=2600000&N=1200000
# localhost:8000/wgs84lv95/?lng=7.439583&lat=46.952405
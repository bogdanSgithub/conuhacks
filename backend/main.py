from sys import setrecursionlimit
from fastapi import FastAPI, HTTPException
from beanie import init_beanie, Document, PydanticObjectId
from fastapi.middleware.cors import CORSMiddleware
from config import database
from typing import List
from pydantic import BaseModel

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080"],  
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Product Model
class Product(Document):
    name: str
    quantity: int
    img : str
    class Settings:
        collection = "products"
    @property
    def id(self) -> str:
        return str(self.pk) 
# Startup event to initialize Beanie
@app.on_event("startup")
async def startup_event():
    await init_beanie(database=database, document_models=[Product])

# Pydantic Model for Product Creation
class ProductCreate(BaseModel):
    name: str
    quantity: int
    img: str


# Create Product
@app.post("/products/", response_model=Product)
async def create_product(product: ProductCreate):
    new_product = Product(**product.dict())
    await new_product.insert()
    return new_product

# Read All Products
@app.get("/products/", response_model=List[Product])
async def get_all_products():
    return await Product.find_all().to_list()

# Read Single Product
@app.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    try:
        product = await Product.get(PydanticObjectId(product_id))
    except:
        raise HTTPException(status_code=400, detail="Invalid Product ID format")

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

# Delete Product
@app.delete("/products/{product_id}")
async def delete_product(product_id: str):
    try:
        product = await Product.get(PydanticObjectId(product_id))
    except:
        raise HTTPException(status_code=400, detail="Invalid Product ID format")

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    await product.delete()
    return {"message": "Product deleted successfully"}

import ProductService from "../service/productService.js";
import { Request } from "express";


class ProductsControllers{
    constructor(private product:ProductService){};

    getProducts(req:Request){
        const filter=req.query.filter
        if (filter) {
            return this.product.FilterQueryProducts(filter as string)
        }
        return this.product.findAll()
    }

    findProductBYid(req:Request){
        const id = +req.params.id;
        return this.product.findProductByID(id);
    }

  AddProduct(req: Request) {
  const { title, price, Description, image } = req.body;

  if (!title || !price || !Description ) {
    return { message: "Please fill all required fields." };
  }

  const NewProduct = { title, price, Description, image };
  return this.product.addNewProducts(NewProduct);
}


    editProduct(req:Request){
        const ID = +req.params.id;
        const edit = req.body;
        return this.product.editProduct(ID,edit)
    }

    deleteProduct(req:Request){
        const ID = +req.params.id;
        return this.product.deleteProduct(ID);
    }


}



export default ProductsControllers

interface Product {
  id: number;
  title: string;
  price: number;
  Description: string;
}
interface NewProducts{
title: string;
  price: number;
  Description: string;
  image:string
}

class ProductsService {
  constructor( private Products:Product[]) {}

  findAll(){
    return this.Products;
  }

 FilterQueryProducts(filterQuery?: string){
        if (filterQuery) {
        const propertiesToFilter = filterQuery.split(',');
        
        const filteredProducts = this.findAll().map((product) => {
            const filterProduct = {
                id: product.id,  
            };

            propertiesToFilter.forEach((property) => {
                if (property in product && property !== 'id') {
                    (filterProduct as any)[property] = (product as any)[property];
                }
            });
            // Ensure the filtered product has at least one property other than 'id'
            return filterProduct;
        }); 

        return filteredProducts;
    } else {
        return this.findAll();
    }
    }

    //find Product By ID
    findProductByID(id:number){
      if (isNaN(id)) {
        return {message:'please enter number ID'};
      }
      const findProduct = this.findAll().find(e=>e.id===id);
      if (findProduct) {
        return findProduct;
      }
      return {message:"is not a found"}
    }

    // add new products
    addNewProducts(NewProducts: NewProducts) {
  const price = Number(NewProducts.price);

  if (
    typeof NewProducts.title !== "string" ||
    typeof NewProducts.Description !== "string" ||
    isNaN(price)
  ) {
    return { message: "The data you entered is incorrect." };
  }

  const NewProduct = {
    id: this.findAll().length + 1,
    title: NewProducts.title.trim(),
    price,
    Description: NewProducts.Description.trim(),
    image: NewProducts.image?.trim() || "/default.jpg"
  };

  this.findAll().push(NewProduct);
  return NewProduct;
}


    // edit product
    
    editProduct(id:number,updata:any){
      if (isNaN(id)) {
        return {message:"please enter id number"};
      }
      const findIndexById = this.findAll().findIndex(e=>e.id===id)
      if (findIndexById ===-1) {
        return {message:"is not a found"};
      }
     const catchProduct = this.findAll()[findIndexById]; 
      this.findAll()[findIndexById]={...catchProduct,...updata}
      return this.findAll()[findIndexById];
    }

    //delete product 

    deleteProduct(id:number){
      if (isNaN(id)) {
        return {message:"please enter id number"};
      }

      const findIndexById = this.findAll().findIndex(e=>e.id===id)
      if (findIndexById ===-1) {
        return {message:"is not a found"}
      }
      const deleted = this.findAll()[findIndexById];
      this.findAll().splice(findIndexById,1)
      return {message:`${JSON.stringify(deleted)} product has been successfully deleted. `};
    }
    }



export default ProductsService
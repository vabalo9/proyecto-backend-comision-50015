
class ProductManager {
    static ultId= 0;
    constructor(){
        this.products=[]
    }

    addProduct(title,description,price,img,code,stock){
        if (!title||!description||!price||!img||!code||!stock) {
            console.log("por favor complete todos los campos para poder ingresar el producto")
        }

        if (this.products.some(item=>item.code===code)) {
           console.log("el codigo ya se encuentra  en algun producto ingresado") 
        }

        const newProduct={id:++ProductManager.ultId,title,description,price,img,code,stock}

        this.products.push(newProduct)
    }

    getProducts(){
        console.log(this.products)
    }

    getProductById(id){
        const product = this.product.find(product=>product.id==id)

        if(!product){console.log("no se encontro el producto buscado")}
        else{console.log("producto hayado")
        return product}
        
    }
}

//testing

const manager = new ProductManager()

manager.addProduct("chaucha", "chaucha para comer saludablemente durante la semana", 50, "turl.png", 3312, 10000000)

manager.getProducts()
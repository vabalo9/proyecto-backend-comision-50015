const fs= require("fs").promises


class ProductManager {
    static ultId= 0;
    constructor(path){
        this.products=[]
        this.path=path
    }

    async addProduct(newObject){
        let {title,description,price,img,code,stock}= newObject
        if (!title||!description||!price||!img||!code||!stock) {
            console.log("por favor complete todos los campos para poder ingresar el producto")
        }

        if (this.products.some(item=>item.code===code)) {
           console.log("el codigo ya se encuentra  en algun producto ingresado") 
        }

        const newProduct={id:++ProductManager.ultId,title,description,price,img,code,stock}

        this.products.push(newProduct)

        await this.guardarArchivo(this.products)
    }

    getProducts(){
        console.log(this.products)
    }

    async getProductById(id){
        try {
            const arrayProductos = await this.readArchive()
            const buscado = arrayProductos.find(item=>item.id===id)
            if(!buscado){
                console.log("no se encontro ningún producto con el id mencionado")
            }else{
                return console.log(buscado)
            }
            
        } catch (error) {
            console.error("no se pudo leer el archivo")
        }
        
        
        
        
        
        
    }

    async readArchive(){
        try {
            const response = await fs.readFile(this.path, "utf-8")
            const arrayProductos = JSON.parse(response)
            return arrayProductos
            
        } catch (error) {
            console.log("no se pudo leer correctamente el archivo")
        }
    }

    async guardarArchivo(arrayProductos){
        try {
         await fs.writeFile(this.path, JSON.stringify(arrayProductos,null, 2))

        } catch (error) {
            console.log("error al guardar el archivo")
        }
    }

    async updateProduct(id, actualicedProduct){
        try {
            const arrayProductos = await this.readArchive()
            const index=arrayProductos.findIndex(item=>item.id===id)

            if(index != -1){
                arrayProductos.splice(index, 1 , actualicedProduct)
                await this.guardarArchivo(arrayProductos)
            }else{
                console.log("no se encontro el producto")
            }
        } catch (error) {
            console.error("no se pudo actualizar el producto")
        }
    }

    async deleteProduct(id){
        try {
            const arrayProductos = await this.readArchive()
            const cantidad = arrayProductos.length
            let prueba = arrayProductos.filter(item=>item.id !== id)
            console.log(prueba)
            if (cantidad>prueba.length) {
                console.log("producto eliminado exitosamente")
            }else{
                console.log("no se pudo eliminar el producto")
            }
            await this.guardarArchivo(prueba)
            
        } catch (error) {
            console.error("inconveniente al momento de intentar eliminar el producto")
        }

    }
}


const manager = new ProductManager("./productos.json")


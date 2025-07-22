const db=require("../models")
const producto=db.models("Producto")
class ProductoController {
    async createProducto(req,res){
        //agregale validaciones al crear una producto, antes de crearla, agregale si ya existe que no cree
        // que no se repita el nombre de la producto, etc.
    }
    async getProductos(req,res){
        //acá solo empleados y administradores 
    }
    async getProductoById(req,res){
        //aqui podrán obtenerlo los clientes, administradores y empleados
    }
    async updateProducto(req,res){
        //aqui iría para actualizarlo podrán hacerlo los empleados y administradores
        //agregale validacion que busque el producto por id si no la encuentra que no te deje actualizar
    }
    async deleteProducto(req,res){
        //Esta se va a usar para el panel administrativo
    }
}
module.exports=new ProductoController();

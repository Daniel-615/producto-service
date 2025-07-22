const db=require("../models")
const productoTalla=db.getModel("ProductoTalla")
class ProductoTallaController {
    async createProductoTalla(req,res){
        //agregale validaciones al crear una categoria, antes de crearla, agregale si ya existe que no cree
        // que no se repita el nombre de la categoria, etc.
    }
    async getProductoTalla(req,res){
        //acá solo empleados y administradores 
    }
    async getProductoTallaById(req,res){
        //aqui podrán obtenerlo los clientes, administradores y empleados
    }
    async updateProductoTalla(req,res){
        //aqui iría para actualizarlo podrán hacerlo los empleados y administradores
        //agregale validacion que busque la categoria por id si no la encuentra que no te deje actualizar
    }
    async deleteProductoTalla(req,res){
        //Esta se va a usar para el panel administrativo
    }
}
module.exports=ProductoTallaController;

const db=require("../models")
const productoColor=db.getModel("ProductoColor")
class ProductoColorController {
    async createProductoColor(req,res){
        //agregale validaciones al crear un productoColor, antes de crearla, agregale si ya existe que no cree
        // que no se repita el Color del producto, etc.
    }
    async getProductoColor(req,res){
        //acá solo empleados y administradores 
    }
    async getProductoColorById(req,res){
        //aqui podrán obtenerlo los clientes, administradores y empleados
        //igual *no te preocupes*, por los roles, yo los voy a manejar desde el gateway.
    }
    async updateProductoColor(req,res){
        //aqui iría para actualizarlo podrán hacerlo los empleados y administradores
        //agregale validacion que busque la categoria por id si no la encuentra que no te deje actualizar
    }
    async deleteProductoColor(req,res){
        //Esta se va a usar para el panel administrativo
    }
}
module.exports=ProductoColorController;

const db=require("../models")
const color=db.models("Color")
class ColorController {
    async createColor(req,res){
        //agregale validaciones al crear un color, antes de crearla, agregale si ya existe que no cree
        // que no se repita el nombre del color, etc.
    }
    async getColores(req,res){
        //acá solo empleados y administradores 
    }
    async getColoresById(req,res){
        //aqui podrán obtenerlo los clientes, administradores y empleados
    }
    async updateColores(req,res){
        //aqui iría para actualizarlo podrán hacerlo los empleados y administradores
        //agregale validacion que busque la categoria por id si no la encuentra que no te deje actualizar
    }
    async deleteCategoria(req,res){
        //Esta se va a usar para el panel administrativo
    }
}
module.exports=new ColorController();

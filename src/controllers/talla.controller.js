const db=require("../models")
const talla=db.models("Talla")
class TallaController {
    async createTalla(req,res){
        //Las validaciones podes agregarlas a la carpeta middleware como funciones y luego solo importarlas
        //agregale validaciones al crear una talla, antes de crearla, agregale si ya existe que no cree
        // que no se repita el nombre de la talla, etc.
    }
    async getTallas(req,res){
        //acá solo empleados y administradores 
    }
    async getTallaById(req,res){
        //aqui podrán obtenerlo los clientes, administradores y empleados
    }
    async updateTalla(req,res){
        //aqui iría para actualizarlo podrán hacerlo los empleados y administradores
        //agregale validacion que busque la talla por id si no la encuentra que no te deje actualizar
    }
    async deleteTalla(req,res){
        //Esta se va a usar para el panel administrativo
    }
}
module.exports=new TallaController();

const db=require("../models")
const marca=db.models("Marca")
class MarcaController {
    async createMarca(req,res){
        //agregale validaciones al crear una marca, antes de crearla, agregale si ya existe que no cree
        // que no se repita el nombre de la marca, etc.
    }
    async getMarcas(req,res){
        //acá solo empleados y administradores 
    }
    async getMarcaById(req,res){
        //aqui podrán obtenerlo los clientes, administradores y empleados
    }
    async updateMarca(req,res){
        //aqui iría para actualizarlo podrán hacerlo los empleados y administradores
        //agregale validacion que busque la marca por id si no la encuentra que no te deje actualizar
    }
    async deleteMarca(req,res){
        //Esta se va a usar para el panel administrativo
    }
}
module.exports=new MarcaController();

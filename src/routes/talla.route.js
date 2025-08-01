const express =require ('express');
const TallaController= require("../controllers/talla.controller.js")
class TallaRoute{
    constructor(app){
        this.router=express.Router();
        this.controller=new TallaController();
        this.registerRoutes();
        app.use("/producto-service/talla",this.router);
    }
    registerRoutes(){
        this.router.post("/",(req,res)=>{
            try{
                this.controller.createTalla(req,res);
            }catch(err){
                console.error("Error en la ruta POST /talla:", err);
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        this.router.get("/:id",(req,res)=>{
            try{
                this.controller.getTallaById(req,res);
            }catch(err){
                console.error("Error en la ruta GET /talla/:id:", err);
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        this.router.get("/",(req,res)=>{
            try{
                this.controller.getTallas(req,res);
            }catch(err){
                console.error("Error en la ruta GET /talla:", err);
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        this.router.put("/:id",(req,res)=>{
            try{
                this.controller.updateTalla(req,res);
            }catch(err){
                console.error("Error en la ruta PUT /talla/:id:", err);
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
        this.router.delete("/:id",(req,res)=>{
            try{
                this.controller.deleteTalla(req,res);
            }catch(err){
                console.error("Error en la ruta DELETE /talla/:id:", err);
                res.status(500).json({ error: "Error en el servidor" });
            }
        })
    }   
}
module.exports=TallaRoute;
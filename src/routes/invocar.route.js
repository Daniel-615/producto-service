const express= require('express');
const InvocarController=require("../controllers/invocar.controller")
class InvocarRoute{
    constructor(app){
        this.router= express.Router();
        this.controller=new InvocarController();
        this.registerRoutes();
        app.use('/producto-service/invocar',this.router);
    }
    registerRoutes(){
        this.router.post(
            '/',
            (req,res)=> this.controller.createInvocar(req,res)
        );
        this.router.patch(
            '/:usuarioId',
            (req,res)=> this.controller.modifyInvocar(req,res)
        );
        this.router.get(
            '/:usuarioId',
            (req,res)=> this.controller.getInvocar(req,res)
        )
    }
}
module.exports= InvocarRoute;
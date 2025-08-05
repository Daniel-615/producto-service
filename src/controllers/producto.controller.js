const db=require("../models")
const Producto =db.getModel("Producto")
class ProductoController {
    async createProducto(req,res) {
        //agregale validaciones al crear una producto, antes de crearla, agregale si ya existe que no cree
        // que no se repita el nombre de la producto, etc.
        const { nombre, descripcion, precio, stock } = req.body;

        if (!nombre || !descripcion || precio === undefined || stock === undefined) {
            return res.status(400).send({ message: "Todos los campos son obligatorios."})
        }

        try {
            const existente = await Producto.findOne({ where: { nombre } });
            if (existente) {
                return res.status(400).send({ message: "El producto ya existe." });
            }

            const nuevoProducto = await Producto.create({ nombre, descripcion, precio, stock });
            res.status(201).send({
                message: "Producto creado exitosamente.",
                producto: nuevoProducto
            });
        } catch (err) {
          res.status(500).send({ message: err.message || "Error al crear el producto."});
        }
    }

    async getProductos(req, res){
        try {
            const productos = await Producto.findAll();
            res.send(productos);
        } catch (err) {
            res.status(500).send({ message: err.message || "Error al obtener los productos."})
        }
    }

    async getProductoById(req, res){
        const id = req.params.id;
        try {
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado."});
            }
            res.send(producto);
            } catch (err) {
            res.status(500).send({ message: "Error al obtener el producto."});
        }
    }
    async updateProducto(req,res){
        const id = req.params.id;
        const { nombre, descripcion, precio, stock } = req.body;

        try {
            const producto = await Producto.findByPk(id);
            if (!producto) {
                return res.status(404).send({ message: "Producto no encontrado."});
            }

            // Validar nombre unico si se cambia
            if (nombre && nombre !== producto.nombre) {
                const existente = await Producto.findOne({ where: { nombre } });
                if (existente) {
                    return res.status(400).send({ message: "Ya existe un producto con ese nombre." });
                }
                producto.nombre = nombre;
            }

            if (descripcion !== undefined) producto.descripcion = descripcion;
            if (precio !== undefined) producto.precio = precio;
            if (stock !== undefined) producto.stock = stock;

            await producto.save();

            res.send({
                message: "Producto actualizado.",
                producto
            });
            } catch (err) {
                res.status(500).send({ message: "Error al actualizar el producto." });
            }
        }

    async deleteProducto(req,res){
        //Esta se va a usar para el panel administrativo
        const id = req.params.id;
        
        try {
            const deleted = await Producto.destroy({ where: { id} });

            if (deleted === 1) {
                res.send({ message: "Producto eliminado exitosamente." });
            } else {
                res.status(404).send({ message: "Producto no encontrado." });
            }
        } catch (err) {
            res.status(500).send({ message: "Error al eliminar el producto." });
        }
    }
}

module.exports=ProductoController;

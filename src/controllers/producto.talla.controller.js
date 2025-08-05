const db = require("../models");
const ProductoTalla = db.getModel("ProductoTalla");

class ProductoTallaController {
    async createProductoTalla(req, res) {
        const { talla } = req.body;

        if (!talla) {
            return res.status(400).send({ message: "El campo talla es obligatorio." });
        }

        try {
            const existente = await ProductoTalla.findOne({ where: { talla } });
            if (existente) {
                return res.status(400).send({ message: "Ya existe una talla con ese nombre." });
            }

            const nuevaTalla = await ProductoTalla.create({ talla });
            res.status(201).send({
                message: "Talla creada exitosamente.",
                talla: nuevaTalla
            });
        } catch (err) {
            res.status(500).send({ message: err.message || "Error al crear la talla." });
        }
    }

    async getProductoTalla(req, res) {
        try {
            const tallas = await ProductoTalla.findAll();
            res.send(tallas);
        } catch (err) {
            res.status(500).send({ message: err.message || "Error al obtener las tallas." });
        }
    }

    async getProductoTallaById(req, res) {
        const id = req.params.id;
        try {
            const talla = await ProductoTalla.findByPk(id);
            if (!talla) {
                return res.status(404).send({ message: "Talla no encontrada." });
            }
            res.send(talla);
        } catch (err) {
            res.status(500).send({ message: "Error al obtener la talla." });
        }
    }

    async updateProductoTalla(req, res) {
        const id = req.params.id;
        const { talla } = req.body;

        try {
            const tallaObj = await ProductoTalla.findByPk(id);
            if (!tallaObj) {
                return res.status(404).send({ message: "Talla no encontrada." });
            }

            // Validar nombre único si se cambia
            if (talla && talla !== tallaObj.talla) {
                const existente = await ProductoTalla.findOne({ where: { talla } });
                if (existente) {
                    return res.status(400).send({ message: "Ya existe una talla con ese nombre." });
                }
                tallaObj.talla = talla;
            }

            await tallaObj.save();

            res.send({
                message: "Talla actualizada.",
                talla: tallaObj
            });
        } catch (err) {
            res.status(500).send({ message: "Error al actualizar la talla." });
        }
    }

    async deleteProductoTalla(req, res) {
        const id = req.params.id;

        try {
            const deleted = await ProductoTalla.destroy({ where: { id } });

            if (deleted === 1) {
                res.send({ message: "Talla eliminada exitosamente." });
            } else {
                res.status(404).send({ message: "Talla no encontrada." });
            }
        } catch (err) {
            res.status(500).send({ message: "Error al eliminar la talla." });
        }
    }
}

module.exports = ProductoTallaController;

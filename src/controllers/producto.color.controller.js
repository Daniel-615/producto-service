const db = require("../models");
const ProductoColor = db.getModel("ProductoColor");

class ProductoColorController {
  async createProductoColor(req, res) {
  const { colorId, productoId } = req.body;
  const imagenUrl = req.body.imagenUrl;
  console.log(req.body.imagenUrl)
  if (!colorId || !productoId) {
    return res.status(400).send({ message: "colorId y productoId son obligatorios." });
  }

  try {
    const existente = await ProductoColor.findOne({
      where: { colorId, productoId }
    });

    if (existente) {
      return res.status(400).send({ message: "Ese producto ya tiene ese color." });
    }

    const nuevoColor = await ProductoColor.create({
      colorId,
      productoId,
      imagenUrl
    });

    res.status(201).send({
      message: "Color de producto creado exitosamente.",
      data: nuevoColor
    });
  } catch (err) {
    res.status(500).send({ message: err.message || "Error al crear el color de producto." });
  }
}


  async getProductoColor(req, res) {
    try {
      const colores = await ProductoColor.findAll();
      res.send(colores);
    } catch (err) {
      res.status(500).send({ message: err.message || "Error al obtener los colores." });
    }
  }

  async getProductoColorById(req, res) {
    const id = req.params.id;
    try {
      const color = await ProductoColor.findByPk(id);
      if (!color) {
        return res.status(404).send({ message: "Color no encontrado." });
      }
      res.send(color);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener el color." });
    }
  }

  async updateProductoColor(req, res) {
    const id = req.params.id;
    const { color } = req.body;
    const imagenUrl = req.body.imagenUrl;

    try {
      const colorObj = await ProductoColor.findByPk(id);
      if (!colorObj) {
        return res.status(404).send({ message: "Color no encontrado." });
      }

      // Validar nombre único si se cambia
      if (color && color !== colorObj.color) {
        const existente = await ProductoColor.findOne({ where: { color } });
        if (existente) {
          return res.status(400).send({ message: "Ya existe un color con ese nombre." });
        }
        colorObj.color = color;
      }

      if (imagenUrl !== undefined) colorObj.imagenUrl = imagenUrl;

      await colorObj.save();

      res.send({
        message: "Color actualizado.",
        color: colorObj
      });
    } catch (err) {
      res.status(500).send({ message: "Error al actualizar el color." });
    }
  }

  async deleteProductoColor(req, res) {
    const id = req.params.id;

    try {
      const deleted = await ProductoColor.destroy({ where: { id } });

      if (deleted === 1) {
        res.send({ message: "Color eliminado exitosamente." });
      } else {
        res.status(404).send({ message: "Color no encontrado." });
      }
    } catch (err) {
      res.status(500).send({ message: "Error al eliminar el color." });
    }
  }
}

module.exports = ProductoColorController;

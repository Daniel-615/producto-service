const db = require("../models");
const Color = db.getModel("Color");

class ColorController {
  async createColor(req, res) {
    const { nombre, codigoHex } = req.body;

    if (!nombre) {
      return res.status(400).send({ message: "El nombre del color es obligatorio." });
    }

    try {
      const existente = await Color.findOne({ where: { nombre } });
      if (existente) {
        return res.status(400).send({ message: "El color ya existe." });
      }

      const nuevoColor = await Color.create({ nombre, codigoHex });
      res.status(201).send({
        message: "Color creado exitosamente.",
        color: nuevoColor,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error al crear el color." });
    }
  }

  async getColores(req, res) {

    try {
      const colores = await Color.findAll();
      res.send(colores);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener los colores." });
    }
  }

  async getColoresById(req, res) {
    const { id } = req.params;

    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).send({ message: "Color no encontrado." });
      }

      res.send(color);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener el color." });
    }
  }

  async updateColores(req, res) {

    const { id } = req.params;
    const { nombre, codigoHex } = req.body;

    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).send({ message: "Color no encontrado." });
      }

      if (nombre) {
        const existente = await Color.findOne({ where: { nombre } });
        if (existente && existente.id !== parseInt(id)) {
          return res.status(400).send({ message: "Ya existe otro color con ese nombre." });
        }
        color.nombre = nombre;
      }

      if (codigoHex !== undefined) {
        color.codigoHex = codigoHex;
      }

      await color.save();

      res.send({
        message: "Color actualizado correctamente.",
        color,
      });
    } catch (err) {
      res.status(500).send({ message: "Error al actualizar el color." });
    }
  }

  async deleteCategoria(req, res) {
    const { id } = req.params;

    try {
      const color = await Color.findByPk(id);
      if (!color) {
        return res.status(404).send({ message: "Color no encontrado." });
      }

      await color.destroy();

      res.send({ message: "Color eliminado exitosamente." });
    } catch (err) {
      res.status(500).send({ message: "Error al eliminar el color." });
    }
  }
}

module.exports = ColorController;

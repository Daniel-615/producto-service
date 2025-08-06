const db = require("../models");
const Categoria = db.getModel("Categoria");

class CategoriaController {
  async createCategoria(req, res) {
    const { nombre } = req.body;

    if (!nombre) {
      return res.status(400).send({ message: "El nombre de la categoría es obligatorio." });
    }

    try {
      const existente = await Categoria.findOne({ where: { nombre } });
      if (existente) {
        return res.status(400).send({ message: "La categoría ya existe." });
      }

      const nuevaCategoria = await Categoria.create({ nombre });
      res.status(201).send({
        message: "Categoría creada exitosamente.",
        categoria: nuevaCategoria,
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error al crear la categoría." });
    }
  }

  async getCategorias(req, res) {
    try {
      const categorias = await Categoria.findAll();
      res.send(categorias);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener las categorías." });
    }
  }

  async getCategoriaById(req, res) {
    const { id } = req.params;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).send({ message: "Categoría no encontrada." });
      }

      res.send(categoria);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener la categoría." });
    }
  }

  async updateCategoria(req, res) {

    const { id } = req.params;
    const { nombre } = req.body;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).send({ message: "Categoría no encontrada." });
      }

      if (nombre) {
        const existeNombre = await Categoria.findOne({ where: { nombre } });
        if (existeNombre && existeNombre.id !== parseInt(id)) {
          return res.status(400).send({ message: "Ya existe otra categoría con ese nombre." });
        }
        categoria.nombre = nombre;
      }

      await categoria.save();

      res.send({
        message: "Categoría actualizada correctamente.",
        categoria,
      });
    } catch (err) {
      res.status(500).send({ message: "Error al actualizar la categoría." });
    }
  }

  async deleteCategoria(req, res) {

    const { id } = req.params;

    try {
      const categoria = await Categoria.findByPk(id);
      if (!categoria) {
        return res.status(404).send({ message: "Categoría no encontrada." });
      }

      await categoria.destroy();

      res.send({ message: "Categoría eliminada exitosamente." });
    } catch (err) {
      res.status(500).send({ message: "Error al eliminar la categoría." });
    }
  }
}

module.exports = CategoriaController;

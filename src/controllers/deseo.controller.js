const db = require("../models");
const Deseo = db.getModel("Deseo");
const Promocion = db.getModel("Promocion");

class DeseoController {
  async createDeseo(req, res) {
    const { usuarioId } = req.params;
    const { promocionId } = req.body;

    if (!usuarioId) {
      return res.status(400).send({ message: "El usuarioId es obligatorio." });
    }

    if (!promocionId) {
      return res.status(400).send({ message: "El promocionId es obligatorio." });
    }

    try {
      const promocion = await Promocion.findByPk(promocionId);
      if (!promocion) {
        return res.status(404).send({ message: "Promoción no encontrada." });
      }

      const nuevoDeseo = await Deseo.create({
        usuarioId,
        promocionId,
      });

      res.status(201).send({
        message: "Deseo creado exitosamente.",
        deseo: nuevoDeseo,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message || "Error al crear el deseo.",
      });
    }
  }

  async getDeseos(req, res) {
    try {
      const deseos = await Deseo.findAll({
        include: [{ model: Promocion, as: "promocion" }],
        order: [["createdAt", "DESC"]],
      });
      res.send(deseos);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener los deseos." });
    }
  }

  async getDeseoById(req, res) {
    const { id } = req.params;

    try {
      const deseo = await Deseo.findByPk(id, {
        include: [{ model: Promocion, as: "promocion" }],
      });

      if (!deseo) {
        return res.status(404).send({ message: "Deseo no encontrado." });
      }

      res.send(deseo);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener el deseo." });
    }
  }


  async consumeDeseo(req, res) {
    const { id } = req.params;

    try {
      const deseo = await Deseo.findByPk(id, {
        include: [{ model: Promocion, as: "promocion" }],
      });

      if (!deseo) {
        return res.status(404).send({ message: "Deseo no encontrado." });
      }

      if (deseo.estado !== "CREADO") {
        return res
          .status(400)
          .send({ message: "El deseo ya fue consumido o expiró." });
      }

      const usosMaximos = deseo.promocion?.usosMaximos || 1;
      const nuevosUsos = deseo.usosRealizados + 1;

      await deseo.update({
        usosRealizados: nuevosUsos,
        estado: nuevosUsos >= usosMaximos ? "CONSUMIDO" : "CREADO",
      });

      res.send({
        message: "Deseo marcado como consumido.",
        deseo,
      });
    } catch (err) {
      res.status(500).send({ message: "Error al consumir el deseo." });
    }
  }


  async deleteDeseo(req, res) {
    const { id } = req.params;

    try {
      const deseo = await Deseo.findByPk(id, {
        include: [{ model: Promocion, as: "promocion" }],
      });

      if (!deseo) {
        return res.status(404).send({ message: "Deseo no encontrado." });
      }

      if (deseo.estado !== "CREADO") {
        return res
          .status(400)
          .send({ message: "Solo se pueden eliminar deseos activos." });
      }

      await deseo.update({ estado: "EXPIRADO" });

      res.send({ message: "Deseo marcado como expirado correctamente." });
    } catch (err) {
      res.status(500).send({ message: "Error al eliminar el deseo." });
    }
  }
}

module.exports = DeseoController;

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

      const nuevoDeseo = await Deseo.create({ usuarioId, promocionId });

      return res.status(201).send({
        success: true,
        message: "Deseo creado exitosamente.",
        deseo: nuevoDeseo,
      });
    } catch (err) {
      console.error("createDeseo error:", err);
      return res.status(500).send({
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
      return res.send(deseos);
    } catch (err) {
      console.error("getDeseos error:", err);
      return res.status(500).send({ message: "Error al obtener los deseos." });
    }
  }


  async getDeseosByUsuario(req, res) {
    const { usuarioId } = req.params;
    if (!usuarioId) {
      return res.status(400).send({ message: "El usuarioId es obligatorio." });
    }

    const { estado, limit } = req.query;
    const where = { usuarioId };
    if (estado) where.estado = String(estado).toUpperCase();

    try {
      const deseos = await Deseo.findAll({
        where,
        include: [{ model: Promocion, as: "promocion" }],
        order: [["createdAt", "DESC"]],
        limit: limit ? Number(limit) : undefined,
      });


      return res.status(200).send({ success: true, data: deseos || [] });
    } catch (err) {
      console.error("getDeseosByUsuario error:", err);
      return res.status(500).send({ message: "Error al obtener los deseos del usuario." });
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
      return res.send(deseo);
    } catch (err) {
      console.error("getDeseoById error:", err);
      return res.status(500).send({ message: "Error al obtener el deseo." });
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
        return res.status(400).send({ message: "El deseo ya fue consumido o expiró." });
      }

      const usosMaximos = deseo.promocion?.usosMaximos || 1;
      const nuevosUsos = (deseo.usosRealizados || 0) + 1;

      await deseo.update({
        usosRealizados: nuevosUsos,
        estado: nuevosUsos >= usosMaximos ? "CONSUMIDO" : "CREADO",
      });

      return res.send({ success: true, message: "Deseo marcado como consumido.", deseo });
    } catch (err) {
      console.error("consumeDeseo error:", err);
      return res.status(500).send({ message: "Error al consumir el deseo." });
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
        return res.status(400).send({ message: "Solo se pueden eliminar deseos activos." });
      }

      await deseo.update({ estado: "EXPIRADO" });
      return res.send({ success: true, message: "Deseo marcado como expirado correctamente." });
    } catch (err) {
      console.error("deleteDeseo error:", err);
      return res.status(500).send({ message: "Error al eliminar el deseo." });
    }
  }
}

module.exports = DeseoController;

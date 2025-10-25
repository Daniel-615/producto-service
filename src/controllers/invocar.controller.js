const db = require("../models");
const Invocar = db.getModel("Invocar");

class InvocarController {
  async createInvocar(req, res) {
    const { usuarioId } = req.body;
    if (!usuarioId) {
      return res.status(400).send({ message: "El usuarioId es obligatorio." });
    }

    try {
      const existeInvocacion = await Invocar.findOne({ where: { usuarioId } });
      if (existeInvocacion) {
        return res
          .status(409)
          .send({ message: "Ya existe una invocación para este usuarioId." });
      }

      await Invocar.create({ usuarioId, invocar: false });

      return res.status(201).send({
        success: true,
        message: "Invocación creada exitosamente.",
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send("Error de servidor al momento de crear una invocación");
    }
  }

  async getInvocar(req, res) {
    const { usuarioId } = req.params;
    if (!usuarioId) {
      return res.status(400).send({ message: "El usuarioId es obligatorio." });
    }

    try {
      const invocar = await Invocar.findOne({ where: { usuarioId } });
      if (!invocar) {
        return res
          .status(404)
          .send({ message: "Invocación no encontrada." });
      }

      return res.status(200).send({
        success: true,
        data: invocar,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send("Error de servidor al momento de obtener una invocación");
    }
  }

  async modifyInvocar(req, res) {
    const { usuarioId } = req.params;
    const { invocar } = req.body;

    if (!usuarioId) {
      return res.status(400).send({ message: "El usuarioId es obligatorio." });
    }

    if (invocar === undefined) {
      return res
        .status(400)
        .send({ message: "El estado de invocar es obligatorio." });
    }

    try {
      const registro = await Invocar.findOne({ where: { usuarioId } });

      if (!registro) {
        return res
          .status(404)
          .send({ message: "Invocación no encontrada." });
      }

      registro.invocar = Boolean(invocar);
      await registro.save();

      return res.status(200).send({
        success: true,
        message: `Invocación modificada exitosamente. Estado: ${registro.invocar}`,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .send("Error de servidor al momento de modificar una invocación");
    }
  }
}

module.exports = InvocarController;

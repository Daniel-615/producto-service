const db = require("../models");
const Promocion = db.getModel("Promocion");

const TIPOS = ["ENVIO_GRATIS", "DESC_FIJO", "DESC_RANDOM"];

function isValidPercent(n) {
  const num = Number(n);
  return Number.isFinite(num) && num >= 0 && num <= 100;
}

function parseDateOrNull(d) {
  if (!d) return null;
  const t = new Date(d);
  return isNaN(t.getTime()) ? null : t;
}

class PromocionController {
  async createPromocion(req, res) {
    try {
      let { tipo, porcentaje, usosMaximos = 1, expiraEl, metadata = {}, activo = true } = req.body || {};

      if (!tipo || !TIPOS.includes(tipo)) {
        return res.status(400).send({ message: "Tipo inválido. Use ENVIO_GRATIS | DESC_FIJO | DESC_RANDOM." });
      }

      if (tipo === "ENVIO_GRATIS") {
        porcentaje = null; 
      } else {
        if (porcentaje === undefined || porcentaje === null || !isValidPercent(porcentaje)) {
          return res.status(400).send({ message: "porcentaje es requerido (0–100) para tipos de descuento." });
        }
      }

      if (!Number.isInteger(usosMaximos) || usosMaximos < 1) {
        return res.status(400).send({ message: "usosMaximos debe ser entero ≥ 1." });
      }

      const fecha = parseDateOrNull(expiraEl);
      if (expiraEl && !fecha) {
        return res.status(400).send({ message: "expiraEl no es una fecha válida." });
      }

      if (metadata && typeof metadata !== "object") {
        return res.status(400).send({ message: "metadata debe ser un objeto JSON." });
      }

      const promo = await Promocion.create({
        tipo,
        porcentaje: porcentaje != null ? Number(porcentaje) : null,
        usosMaximos,
        expiraEl: fecha,
        metadata,
        activo: !!activo
      });

      return res.status(201).send({ message: "Promoción creada.", promocion: promo });
    } catch (err) {
      return res.status(500).send({ message: err.message || "Error al crear la promoción." });
    }
  }

  async getPromociones(req, res) {
    try {
      const { tipo, activo, vigentes } = req.query;
      const where = {};

      if (tipo) {
        if (!TIPOS.includes(tipo)) {
          return res.status(400).send({ message: "tipo inválido." });
        }
        where.tipo = tipo;
      }

      if (activo !== undefined) {
        where.activo = String(activo) === "true";
      }

      if (String(vigentes) === "true") {
        where[db.Sequelize.Op.or] = [
          { expiraEl: null },
          { expiraEl: { [db.Sequelize.Op.gt]: new Date() } }
        ];
      }

      const promos = await Promocion.findAll({
        where,
        order: [["createdAt", "DESC"]],
      });

      return res.send(promos);
    } catch (err) {
      return res.status(500).send({ message: "Error al obtener promociones." });
    }
  }

  async getPromocionById(req, res) {
    try {
      const { id } = req.params;
      const promo = await Promocion.findByPk(id);
      if (!promo) return res.status(404).send({ message: "Promoción no encontrada." });
      return res.send(promo);
    } catch (err) {
      return res.status(500).send({ message: "Error al obtener la promoción." });
    }
  }

  async updatePromocion(req, res) {
    try {
      const { id } = req.params;
      const promo = await Promocion.findByPk(id);
      if (!promo) return res.status(404).send({ message: "Promoción no encontrada." });

      let { tipo, porcentaje, usosMaximos, expiraEl, metadata, activo } = req.body || {};

      if (tipo !== undefined) {
        if (!TIPOS.includes(tipo)) return res.status(400).send({ message: "tipo inválido." });
        promo.tipo = tipo;
        if (tipo === "ENVIO_GRATIS") porcentaje = null;
      }

      if (porcentaje !== undefined) {
        if (promo.tipo === "ENVIO_GRATIS") {
          porcentaje = null;
        } else {
          if (!isValidPercent(porcentaje)) {
            return res.status(400).send({ message: "porcentaje debe estar entre 0–100." });
          }
        }
        promo.porcentaje = porcentaje != null ? Number(porcentaje) : null;
      }

      if (usosMaximos !== undefined) {
        if (!Number.isInteger(usosMaximos) || usosMaximos < 1) {
          return res.status(400).send({ message: "usosMaximos debe ser entero ≥ 1." });
        }
        promo.usosMaximos = usosMaximos;
      }

      if (expiraEl !== undefined) {
        const fecha = parseDateOrNull(expiraEl);
        if (expiraEl && !fecha) {
          return res.status(400).send({ message: "expiraEl no es una fecha válida." });
        }
        promo.expiraEl = fecha;
      }

      if (metadata !== undefined) {
        if (metadata && typeof metadata !== "object") {
          return res.status(400).send({ message: "metadata debe ser un objeto JSON." });
        }
        promo.metadata = metadata || {};
      }

      if (activo !== undefined) {
        promo.activo = !!activo;
      }

      await promo.save();
      return res.send({ message: "Promoción actualizada.", promocion: promo });
    } catch (err) {
      return res.status(500).send({ message: "Error al actualizar la promoción." });
    }
  }

  async deletePromocion(req, res) {
    try {
      const { id } = req.params;
      const promo = await Promocion.findByPk(id);
      if (!promo) return res.status(404).send({ message: "Promoción no encontrada." });

      if (!promo.activo) {
        return res.status(409).send({ message: "La promoción ya está inactiva." });
      }

      await promo.update({ activo: false });
      return res.send({ message: "Promoción desactivada (soft delete)." });
    } catch (err) {
      return res.status(500).send({ message: "Error al desactivar la promoción." });
    }
  }
}

module.exports = PromocionController;

const db = require("../models");
const Producto = db.getModel("Producto");
const Marca = db.getModel("Marca");
const Categoria = db.getModel("Categoria");

class ProductoController {
  async createProducto(req, res) {
    const { nombre, descripcion, precio, stock, marcaId, categoriaId } = req.body;

    if (!nombre || !descripcion || precio === undefined || stock === undefined || !marcaId || !categoriaId) {
      return res.status(400).send({ message: "Todos los campos son obligatorios (incluyendo marcaId y categoriaId)." });
    }

    try {
      // Validar existencia de la marca
      const marca = await Marca.findByPk(marcaId);
      if (!marca) {
        return res.status(400).send({ message: "La marca especificada no existe." });
      }

      // Validar existencia de la categoría
      const categoria = await Categoria.findByPk(categoriaId);
      if (!categoria) {
        return res.status(400).send({ message: "La categoría especificada no existe." });
      }

      // Validar producto único por nombre
      const existente = await Producto.findOne({ where: { nombre } });
      if (existente) {
        return res.status(400).send({ message: "El producto ya existe." });
      }

      const nuevoProducto = await Producto.create({
        nombre,
        descripcion,
        precio,
        stock,
        marcaId,
        categoriaId
      });

      res.status(201).send({
        message: "Producto creado exitosamente.",
        producto: nuevoProducto
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error al crear el producto." });
    }
  }

  async getProductos(req, res) {
    try {
      const productos = await Producto.findAll({
        include:[
            {
                model: Marca, as: 'marca',attributes: ["nombre"]
            },
            {
                model: Categoria, as: 'categoria',attributes: ["nombre"]
            }
        ]
      });
      res.status(200).send({
        message: "Productos obtenidos exitosamente.",
        total: productos.length,
        productos: productos.map(p => ({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          stock: p.stock,
          marcaId: p.marcaId,
          categoriaId: p.categoriaId,
          createdAt: p.createdAt,
          updatedAt: p.updatedAt,
          marca: {
            nombre: p.marca?.nombre || null
          },
          categoria: {
            nombre: p.categoria?.nombre || null
          }
        }))
      });

    } catch (err) {
      res.status(500).send({ message: err.message || "Error al obtener los productos." });
    }
  }

  async getProductoById(req, res) {
    const id = req.params.id;
    try {
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).send({ message: "Producto no encontrado." });
      }
      res.status(200).send(producto);
    } catch (err) {
      res.status(500).send({ message: "Error al obtener el producto." });
    }
  }

  async updateProducto(req, res) {
    const id = req.params.id;
    const { nombre, descripcion, precio, stock} = req.body;

    try {
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).send({ message: "Producto no encontrado." });
      }

      // Validar nombre único si cambia
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

  async deleteProducto(req, res) {
    const id = req.params.id;

    try {
      const deleted = await Producto.destroy({ where: { id } });

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

module.exports = ProductoController;

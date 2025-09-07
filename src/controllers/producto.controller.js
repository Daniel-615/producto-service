const db = require("../models");
const Producto = db.getModel("Producto");
const Marca = db.getModel("Marca");
const Categoria = db.getModel("Categoria");
const ProductoColor = db.getModel("ProductoColor");
const ProductoTallaColor = db.getModel("ProductoTallaColor");
const Talla = db.getModel("Talla");
const Color = db.getModel("Color");

class ProductoController {
  async createProducto(req, res) {
    const { nombre, descripcion, precio, marcaId, categoriaId, peso, alto, ancho, largo } = req.body;

    if (!nombre || !descripcion || precio === undefined || !marcaId || !categoriaId || !peso || !alto || !ancho ||!largo) {
      return res.status(400).send({ message: "Todos los campos son obligatorios (incluyendo marcaId y categoriaId)." });
    }

    try {
      const marca = await Marca.findByPk(marcaId);
      if (!marca) return res.status(400).send({ message: "La marca especificada no existe." });

      const categoria = await Categoria.findByPk(categoriaId);
      if (!categoria) return res.status(400).send({ message: "La categoría especificada no existe." });

      const existente = await Producto.findOne({ where: { nombre } });
      if (existente) return res.status(400).send({ message: "El producto ya existe." });

      const nuevoProducto = await Producto.create({
        nombre,
        descripcion,
        precio,
        marcaId,
        categoriaId,
        peso,
        alto,
        ancho,
        largo
      });

      res.status(201).send({
        message: "Producto creado exitosamente.",
        producto: nuevoProducto
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: err.message || "Error al crear el producto." });
    }
  }

  async getProductos(req, res) {
    try {
      const productos = await Producto.findAll({
        include: [
          { model: Marca, as: "marca", attributes: ["nombre"] },
          { model: Categoria, as: "categoria", attributes: ["nombre"] },
          {
            model: ProductoColor,
            as: "productoColores",
            attributes: ["id", "imagenUrl"],
            include: [
              {
                model: Color,
                as: "colorInfo",
                attributes: ["codigoHex"]
              },
              {
                model: ProductoTallaColor,
                as: "tallasColores", 
                include: [
                  {
                    model: Talla,
                    as: "tallaInfo",
                    attributes: ["valor"]
                  }
                ]
              }
            ]
          }
        ]
      });

      res.status(200).send({
        message: "Productos obtenidos exitosamente.",
        total: productos.length,
        productos: productos.map((p) => ({
          id: p.id,
          nombre: p.nombre,
          descripcion: p.descripcion,
          precio: p.precio,
          ancho: p.ancho,
          alto: p.alto,
          largo: p.largo,
          peso: p.peso,
          marca: { nombre: p.marca?.nombre || null },
          categoria: { nombre: p.categoria?.nombre || null },
          colores: p.productoColores.map((pc) => ({
            id: pc.id,
            imagenUrl: pc.imagenUrl,
            codigoHex: pc.colorInfo?.codigoHex || null,
            tallas: pc.tallasColores.map((tc) => ({
              id: tc.id,
              valor: tc.tallaInfo?.valor || null,
              stock: tc.stock
            }))
          }))
        }))
      });
    } catch (err) {
      res.status(500).send({ message: err.message || "Error al obtener los productos." });
    }
  }

  async getProductoById(req, res) {
    const id = req.params.id;
    try {
      const producto = await Producto.findByPk(id, {
        include: [
          { model: Marca, as: "marca", attributes: ["nombre"] },
          { model: Categoria, as: "categoria", attributes: ["nombre"] },
          {
            model: ProductoColor,
            as: "productoColores",
            attributes: ["id", "imagenUrl"],
            include: [
              {
                model: Color,
                as: "colorInfo",
                attributes: ["codigoHex"]
              },
              {
                model: ProductoTallaColor,
                as: "tallasColores",
                include: [
                  { model: Talla, as: "tallaInfo", attributes: ["valor"] }
                ]
              }
            ]
          }
        ]
      });

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
    const { nombre, descripcion, precio, marcaId, categoriaId, alto, ancho, peso, largo } = req.body;

    try {
      const producto = await Producto.findByPk(id);
      if (!producto) return res.status(404).send({ message: "Producto no encontrado." });

      if (nombre && nombre !== producto.nombre) {
        const existente = await Producto.findOne({ where: { nombre } });
        if (existente) return res.status(400).send({ message: "Ya existe un producto con ese nombre." });
        producto.nombre = nombre;
      }

      if (descripcion !== undefined) producto.descripcion = descripcion;
      if (precio !== undefined) producto.precio = precio;
      if(alto !== undefined ) producto.alto= alto;
      if(ancho !== undefined) producto.ancho= ancho;
      if(peso !== undefined) producto.peso=peso;
      if(largo !== undefined) producto.largo= largo;

      if (marcaId !== undefined) {
        const marca = await Marca.findByPk(marcaId);
        if (!marca) return res.status(400).send({ message: "La marca especificada no existe." });
        producto.marcaId = marcaId;
      }

      if (categoriaId !== undefined) {
        const categoria = await Categoria.findByPk(categoriaId);
        if (!categoria) return res.status(400).send({ message: "La categoría especificada no existe." });
        producto.categoriaId = categoriaId;
      }

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

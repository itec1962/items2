import express from "express";

const app = express();

// ✅ Estado del sistema (en memoria)
// OJO: si Render reinicia, se borra (normal para aprender)
const items = ["Manzana", "Pera", "Uva", "Mango"];

// ✅ 1) middleware para leer JSON en POST
app.use(express.json());

// ✅ 2) CORS "manual" (curva baja) + soporte para POST
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight (el navegador manda OPTIONS antes del POST)
  if (req.method === "OPTIONS") return res.sendStatus(204);

  next();
});

// ✅ 3) GET: devuelve el arreglo actual
app.get("/api/items", (req, res) => {
  res.json(items);
});

// ✅ 4) POST: agrega un item al arreglo
app.post("/api/items", (req, res) => {
  const nuevo = (req.body?.item || "").trim();

  if (!nuevo) {
    return res.status(400).json({ ok: false, error: "Falta 'item' (texto)" });
  }

  items.push(nuevo);

  // Devuelvo el arreglo actualizado para que el UI lo pinte directo
  res.status(201).json({ ok: true, items });
});

// ✅ 5) listen (Render usa PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor listo en puerto", PORT));

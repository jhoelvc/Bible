import { pool } from "../db.js";


export const getItems = async (req, res) => {
	try {
	  const [rows] = await pool.query("SELECT * FROM items");
	  res.json(rows);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const getItem = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("SELECT * FROM items WHERE code = ?", [
		 code
	  ]);
 
	  if (rows.length <= 0) {
		 return res.status(404).json({ message: "Item not found" });
	  }
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const deleteItem = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("DELETE FROM items WHERE code = ?", [code]);
 
	  if (rows.affectedRows <= 0) {
		 return res.status(404).json({ message: "Item not found" });
	  }
 
	  res.sendStatus(204);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const createItem = async (req, res) => {
	try {
	  const { name, price } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO items (name, price) VALUES (?, ?)",
		 [name, price]
	  );

	  res.status(201).json({ code: rows.insertId, name, price });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateItem = async (req, res) => {
	try {
		const { code } = req.params;
		const { name, price } = req.body;
		
		const [result] = await pool.query(
			"UPDATE items SET name = IFNULL(?, name), price = IFNULL(?, price) WHERE code = ?",
			[name, price, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Item not found", error });

		const [rows] = await pool.query("SELECT * FROM items WHERE code = ?", [
			code,
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
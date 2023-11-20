import { pool } from "../db.js";


export const getPackages = async (req, res) => {
	try {
	  const [rows] = await pool.query("SELECT * FROM package");
	  res.json(rows);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const getPackage = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("SELECT * FROM packages WHERE code = ?", [
		 code
	  ]);
 
	  if (rows.length <= 0) {
		 return res.status(404).json({ message: "Package not found" });
	  }
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const deletePackage = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("DELETE FROM package WHERE code = ?", [code]);
 
	  if (rows.affectedRows <= 0) {
		 return res.status(404).json({ message: "Package not found" });
	  }
 
	  res.sendStatus(204);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const createPackage = async (req, res) => {
	try {
	  const { name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO package (name) VALUES (?)",
		 [name]
	  );

	  res.status(201).json({ code: rows.insertId, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updatePackage = async (req, res) => {
	try {
		const { code } = req.params;
		const { name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE package SET name = IFNULL(?, name) WHERE code = ?",
			[name]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Package not found", error });

		const [rows] = await pool.query("SELECT * FROM package WHERE code = ?", [
			code,
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
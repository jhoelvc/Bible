import { pool } from "../db.js";


export const getProviders = async (req, res) => {
	try {
	  const [rows] = await pool.query(`SELECT p.code, p.name, idt.name AS type_document, p.id_number, p.identity_document_type_code FROM provider p INNER JOIN identity_document_type idt ON p.identity_document_type_code = idt.code`);
	  res.json(rows);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const getProvider = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("SELECT * FROM provider WHERE code = ?", [
		 code
	  ]);
 
	  if (rows.length <= 0) {
		 return res.status(404).json({ message: "Provider not found" });
	  }
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const deleteProvider = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("DELETE FROM provider WHERE code = ?", [code]);
 
	  if (rows.affectedRows <= 0) {
		 return res.status(404).json({ message: "Provider not found" });
	  }
 
	  res.sendStatus(204);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const createProvider = async (req, res) => {
	try {
	  const { id_number, identity_document_type_code, name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO provider (id_number, identity_document_type_code, name) VALUES (?, ?, ?)",
		 [id_number, identity_document_type_code, name]
	  );

	  res.status(201).json({ code: rows.insertId, id_number, identity_document_type_code, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateProvider = async (req, res) => {
	try {
		const { code } = req.params;
		const { id_number, identity_document_type_code, name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE provider SET id_number = IFNULL(?, id_number), identity_document_type_code = IFNULL(?, identity_document_type_code), name = IFNULL(?, name) WHERE code = ?",
			[id_number, identity_document_type_code, name, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Provider not found", error });

		const [rows] = await pool.query("SELECT * FROM provider WHERE code = ?", [
			code,
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
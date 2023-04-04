import { pool } from "../db.js";


export const getClients = async (req, res) => {
	try {
	  const [rows] = await pool.query("SELECT * FROM client");
	  res.set('Access-Control-Allow-Origin', '*');
	  res.json(rows);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const getClient = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("SELECT * FROM client WHERE code = ?", [
		 code
	  ]);
 
	  if (rows.length <= 0) {
		 return res.status(404).json({ message: "Client not found" });
	  }
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const deleteClient = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("DELETE FROM client WHERE code = ?", [code]);
 
	  if (rows.affectedRows <= 0) {
		 return res.status(404).json({ message: "Client not found" });
	  }
 
	  res.sendStatus(204);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const createClient = async (req, res) => {
	try {
	  const { firt_name, last_name, id_number, identity_document_type_code } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO client (firt_name, last_name, id_number, identity_document_type_code) VALUES (?, ?, ?, ?)",
		 [firt_name, last_name, id_number, identity_document_type_code]
	  );

	  res.status(201).json({ code: rows.insertId, file_state_code, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateClient = async (req, res) => {
	try {
		const { code } = req.params;
		const { firt_name, last_name, id_number, identity_document_type_code } = req.body;
		
		const [result] = await pool.query(
			"UPDATE client SET firt_name = IFNULL(?, firt_name), last_name = IFNULL(?, last_name), id_number = IFNULL(?, id_number), identity_document_type_code = IFNULL(?, identity_document_type_code) WHERE code = ?",
			[firt_name, last_name, id_number, identity_document_type_code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Client not found", error });

		const [rows] = await pool.query("SELECT * FROM client WHERE code = ?", [
			code,
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
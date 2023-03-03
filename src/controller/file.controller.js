import { pool } from "../db.js";


export const getFiles = async (req, res) => {
	try {
	  const [rows] = await pool.query("SELECT * FROM file");
	  res.json(rows);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const getFile = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("SELECT * FROM file WHERE code = ?", [
		 code
	  ]);
 
	  if (rows.length <= 0) {
		 return res.status(404).json({ message: "File not found" });
	  }
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const deleteFile = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("DELETE FROM file WHERE code = ?", [code]);
 
	  if (rows.affectedRows <= 0) {
		 return res.status(404).json({ message: "File not found" });
	  }
 
	  res.sendStatus(204);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const createFile = async (req, res) => {
	try {
	  const { file_state_code, name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO file (file_state_code, name) VALUES (?, ?)",
		 [file_state_code, name]
	  );

	  res.status(201).json({ code: rows.insertId, file_state_code, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateFile = async (req, res) => {
	try {
		const { code } = req.params;
		const { file_state_code, name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE file SET file_state_code = IFNULL(?, file_state_code), name = IFNULL(?, name) WHERE code = ?",
			[file_state_code, name, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "File not found", error });

		const [rows] = await pool.query("SELECT * FROM file WHERE code = ?", [
			code,
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
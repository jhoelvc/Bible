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
	  const { language_code, client_code, client_endorse_code, file_state_code, name, in_date, out_date } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO file (language_code, client_code, client_endorse_code, file_state_code, name, in_date, out_date ) VALUES (?, ?, ?, ?, ?, ?, ?)",
		 [language_code, client_code, client_endorse_code, file_state_code, name, in_date, out_date ]
	  );

	  res.status(201).json({ code: rows.insertId, language_code, client_code, client_endorse_code, file_state_code, name, in_date, out_date });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateFile = async (req, res) => {
	try {
		const { code } = req.params;
		const { language_code, client_code, client_endorse_code, file_state_code, name, in_date, out_date } = req.body;
		
		const [result] = await pool.query(
			`UPDATE file 
			SET language_code = IFNULL(?, language_code), 
			client_code = IFNULL(?, client_code), 
			client_endorse_code = IFNULL(?, client_endorse_code), 
			in_date = IFNULL(?, in_date),
			out_date = IFNULL(?, out_date),
			name = IFNULL(?, name),
			file_state_code = IFNULL(?, file_state_code)
			WHERE code = ?`,
			[language_code, client_code, client_endorse_code, file_state_code, name, in_date, out_date, code]
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
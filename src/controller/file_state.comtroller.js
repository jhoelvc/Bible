import { pool } from "../db.js";

export const getFileState = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("SELECT * FROM file_state WHERE code = ?" , [
			code
		]);

		if (rows.length <= 0) {
			return res.status(404).json({ message: "File state not found" })
		}

		res.json(rows[0])
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

export const getFilesStates = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM file_state");
		res.json(rows);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

export const deleteFileState = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("DELETE FROM file_state WHERE code = ?", [
			code
		]);

		if (rows.affectedRows <= 0) {
			return res.status(500).json({ message: "File state not found" })
		}

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

 
export const createFileState = async (req, res) => {
	try {
	  const { name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO file_state (name) VALUES (?)",
		 [name]
	  );

	  res.status(201).json({ code: rows.insertId, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateFileState = async (req, res) => {
	try {
		const { code } = req.params;
		const { name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE file_state SET name = IFNULL(?, name) WHERE code = ?",
			[name, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "File state not found", error });

		const [rows] = await pool.query("SELECT * FROM file_state WHERE code = ?", [
			code
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
import { pool } from "../db.js";

export const getIdentityDocumentType = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("SELECT * FROM identity_document_type WHERE code = ?" , [
			code
		]);

		if (rows.length <= 0) {
			return res.status(404).json({ message: "Identity document type not found" })
		}

		res.json(rows[0])
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

export const getIdentityDocumentTypes = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM identity_document_type");
		res.json(rows);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

export const deleteIdentityDocumentType = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("DELETE FROM identity_document_type WHERE code = ?", [
			code
		]);

		if (rows.affectedRows <= 0) {
			return res.status(500).json({ message: "Identity document type not found" })
		}

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

 
export const createIdentityDocumentType = async (req, res) => {
	try {
	  const { name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO identity_document_type (name) VALUES (?)",
		 [name]
	  );

	  res.status(201).json({ code: rows.insertId, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateIdentityDocumentType = async (req, res) => {
	try {
		const { code } = req.params;
		const { name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE identity_document_type SET name = IFNULL(?, name) WHERE code = ?",
			[name, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Identity document type not found", error });

		const [rows] = await pool.query("SELECT * FROM identity_document_type WHERE code = ?", [
			code
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
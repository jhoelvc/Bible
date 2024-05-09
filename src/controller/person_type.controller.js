import { pool } from "../db.js";

export const getPersonType = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("SELECT * FROM person_type WHERE code = ?" , [
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

export const getPersonTypes = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM person_type");
		res.set('Access-Control-Allow-Origin', '*');
		res.json(rows);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

export const deletePersonType = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("DELETE FROM person_type WHERE code = ?", [
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

 
export const createPersonType = async (req, res) => {
	try {
	  const { name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO person_type (name) VALUES (?)",
		 [name]
	  );

	  res.status(201).json({ code: rows.insertId, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updatePersonType = async (req, res) => {
	try {
		const { code } = req.params;
		const { name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE person_type SET name = IFNULL(?, name) WHERE code = ?",
			[name, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "File state not found", error });

		const [rows] = await pool.query("SELECT * FROM person_type WHERE code = ?", [
			code
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
import { pool } from "../db.js";


export const getPersons = async (req, res) => {
	try {
		const { person_type_code } = req.params;
		const [rows] = await pool.query(`
	  SELECT p.code, 
	  p.name, 
	  idt.name AS identity_document_type_name, 
	  p.identity_document_number, 
	  p.identity_document_type_code, 
	  p.person_type_code,
	  p.contact_number
	  FROM person p INNER JOIN identity_document_type idt ON p.identity_document_type_code = idt.code
	  WHERE (? = 0 OR p.person_type_code = ?)
	  `, [person_type_code, person_type_code]);
		res.set('Access-Control-Allow-Origin', '*');
		res.json(rows);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};

export const getPerson = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("SELECT * FROM person WHERE code = ?", [
			code
		]);

		if (rows.length <= 0) {
			return res.status(404).json({ message: "Person not found" });
		}

		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};

export const deletePerson = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("DELETE FROM person WHERE code = ?", [code]);

		if (rows.affectedRows <= 0) {
			return res.status(404).json({ message: "Person not found" });
		}

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};

export const createPerson = async (req, res) => {
	try {
		const { name, contact_number, identity_document_number, identity_document_type_code, person_type_code } = req.body;
		const [rows] = await pool.query(
			"INSERT INTO person (name, contact_number, identity_document_number, identity_document_type_code, person_type_code) VALUES (?, ?, ?, ?, ?)",
			[name, contact_number, identity_document_number, identity_document_type_code, person_type_code]
		);

		res.status(201).json({ code: rows.insertId, name, identity_document_number, identity_document_type_code, person_type_code });
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};

export const updatePerson = async (req, res) => {
	try {
		const { code } = req.params;
		const { name, contact_number, identity_document_number, identity_document_type_code, person_type_code } = req.body;

		const [result] = await pool.query(
			`UPDATE person 
			SET name = IFNULL(?, name), 
			contact_number = IFNULL(?, contact_number), 
			identity_document_number = IFNULL(?, identity_document_number), 
			identity_document_type_code = IFNULL(?, identity_document_type_code),
			person_type_code = IFNULL(?, person_type_code)
			WHERE code = ?`,
			[name, contact_number, identity_document_number, identity_document_type_code, person_type_code, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Person not found", error });

		const [rows] = await pool.query("SELECT * FROM person WHERE code = ?", [
			code,
		]);

		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};
import { pool } from "../db.js";

export const getServiceType = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("SELECT * FROM service_type WHERE code = ?" , [
			code
		]);

		if (rows.length <= 0) {
			return res.status(404).json({ message: "Service type not found" })
		}

		res.json(rows[0])
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

export const getServicesTypes = async (req, res) => {
	try {
		const [rows] = await pool.query("SELECT * FROM service_type");
		res.json(rows);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

export const deleteServiceType = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("DELETE FROM service_type WHERE code = ?", [
			code
		]);

		if (rows.affectedRows <= 0) {
			return res.status(500).json({ message: "Service type not found" })
		}

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong" })
	}
};

 
export const createServiceType = async (req, res) => {
	try {
	  const { name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO service_type (name) VALUES (?)",
		 [name]
	  );

	  res.status(201).json({ code: rows.insertId, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateServiceType = async (req, res) => {
	try {
		const { code } = req.params;
		const { name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE service_type SET name = IFNULL(?, name) WHERE code = ?",
			[name, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Service type not found", error });

		const [rows] = await pool.query("SELECT * FROM service_type WHERE code = ?", [
			code
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
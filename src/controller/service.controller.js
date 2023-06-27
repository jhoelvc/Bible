import { pool } from "../db.js";

export const getServices = async (req, res) => {
	try {
	  const [rows] = await pool.query("SELECT s.code, s.name AS name, st.name AS service_type FROM service s INNER JOIN service_type st ON s.service_type_code = st.code");
	  res.json(rows);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const getService = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("SELECT * FROM service WHERE code = ?", [
		 code
	  ]);
 
	  if (rows.length <= 0) {
		 return res.status(404).json({ message: "Service not found" });
	  }
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const deleteService = async (req, res) => {
	try {
	  const { code } = req.params;
	  const [rows] = await pool.query("DELETE FROM service WHERE code = ?", [code]);
 
	  if (rows.affectedRows <= 0) {
		 return res.status(404).json({ message: "Service not found" });
	  }
 
	  res.sendStatus(204);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const createService = async (req, res) => {
	try {
	  const { service_type_code, service_code_dependency, name } = req.body;
	  const [rows] = await pool.query(
		 "INSERT INTO service (service_type_code, service_code_dependency, name) VALUES (?, ?, ?)",
		 [service_type_code, service_code_dependency, name]
	  );

	  res.status(201).json({ code: rows.insertId, service_type_code, service_code_dependency, name });
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
 
 export const updateService = async (req, res) => {
	try {
		const { code } = req.params;
		const { service_type_code, service_code_dependency, name } = req.body;
		
		const [result] = await pool.query(
			"UPDATE service SET service_type_code = IFNULL(?, service_type_code), service_code_dependency = IFNULL(?, service_code_dependency), name = IFNULL(?, name) WHERE code = ?",
			[service_type_code, service_code_dependency, name]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Service not found", error });

		const [rows] = await pool.query("SELECT * FROM service WHERE code = ?", [
			code,
		]);
 
	  res.json(rows[0]);
	} catch (error) {
	  return res.status(500).json({ message: "Something goes wrong", error });
	}
 };
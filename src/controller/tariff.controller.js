import { pool } from "../db.js";

export const getTariffs = async (req, res) => {
	try {
		const { person_code } = req.params;
		const [rows] = await pool.query(`
      SELECT t.code, 
		t.service_code, 
		s.name AS service_name,
		s.service_type_code,
		st.name AS service_type_name,
		t.person_code, 
		p.name AS person_name, 
		t.price 
      FROM tariff t 
      INNER JOIN service s ON t.service_code = s.code 
		INNER JOIN service_type st ON s.service_type_code = st.code
      INNER JOIN person p ON t.person_code = p.code
		WHERE (? = 0 OR t.person_code = ?)`, [
			person_code,
			person_code
		]);
		res.json(rows);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};

export const getTariff = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("SELECT * FROM tariff WHERE code = ?", [
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

export const deleteTariff = async (req, res) => {
	try {
		const { code } = req.params;
		const [rows] = await pool.query("DELETE FROM tariff WHERE code = ?", [code]);

		if (rows.affectedRows <= 0) {
			return res.status(404).json({ message: "Tariff not found" });
		}

		res.sendStatus(204);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};

export const createTariff = async (req, res) => {
	try {
		const { service_code, person_code, price } = req.body;
		const [exist] = await pool.query("SELECT code FROM tariff WHERE service_code = ? AND person_code = ?", [
			service_code,
			person_code
		]);

		if (exist.length === 0) {
			const [rows] = await pool.query(
				"INSERT INTO tariff (service_code, person_code, price) VALUES (?, ?, ?)",
				[service_code, person_code, price]
			);
			res.status(201).json({ code: rows.insertId, service_code, person_code, price });
		}
		else
			res.status(201).json({ code: -1, message: 'Exists!' });
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};

export const updateTariff = async (req, res) => {
	try {
		const { code } = req.params;
		const { service_code, person_code, price } = req.body;

		const [result] = await pool.query(
			`UPDATE tariff 
			SET service_code = IFNULL(?, service_code), 
			person_code = IFNULL(?, person_code), 
			price = IFNULL(?, price) 
			WHERE code = ?`,
			[service_code, person_code, price, code]
		);

		if (result.affectedRows === 0)
			return res.status(404).json({ message: "Service not found", error });

		const [rows] = await pool.query("SELECT * FROM tariff WHERE code = ?", [
			code,
		]);

		res.json(rows[0]);
	} catch (error) {
		return res.status(500).json({ message: "Something goes wrong", error });
	}
};
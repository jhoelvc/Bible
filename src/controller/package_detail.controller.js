import { pool } from "../db.js";


export const getPackageDetails = async (req, res) => {
   try {
      const [rows] = await pool.query("SELECT * FROM package_detail");
      res.json(rows);
   } catch (error) {
      return res.status(500).json({ message: "Something goes wrong", error });
   }
};

export const getPackageDetail = async (req, res) => {
   try {
      const { code } = req.params;
      const [rows] = await pool.query("SELECT * FROM package_detail WHERE code = ?", [
         code
      ]);

      if (rows.length <= 0) {
         return res.status(404).json({ message: "Package detail not found" });
      }

      res.json(rows[0]);
   } catch (error) {
      return res.status(500).json({ message: "Something goes wrong", error });
   }
};

export const deletePackageDetail = async (req, res) => {
   try {
      const { code } = req.params;
      const [rows] = await pool.query("DELETE FROM package_detail WHERE code = ?", [code]);

      if (rows.affectedRows <= 0) {
         return res.status(404).json({ message: "Package not found" });
      }

      res.sendStatus(204);
   } catch (error) {
      return res.status(500).json({ message: "Something goes wrong", error });
   }
};

export const createPackageDetail = async (req, res) => {
   try {
      const { package_code, service_code, tariff_code, price } = req.body;
      const [rows] = await pool.query(
         "INSERT INTO package_detail (package_code, service_code, tariff_code, price) VALUES (?, ?, ?)",
         [package_code, service_code, tariff_code, price]
      );

      res.status(201).json({ code: rows.insertId, package_code, service_code, tariff_code, price });
   } catch (error) {
      return res.status(500).json({ message: "Something goes wrong", error });
   }
};

export const updatePackageDetail = async (req, res) => {
   try {
      const { code } = req.params;
      const { package_code, service_code, tariff_code, price } = req.body;

      const [result] = await pool.query(
         `UPDATE package_detail 
         SET package_code = IFNULL(?, package_code),
         service_code = IFNULL(?, service_code),
         tariff_code = IFNULL(?, tariff_code),
         price = IFNULL(?, price)
         WHERE code = ?`,
         [package_code, service_code, tariff_code, price]
      );

      if (result.affectedRows === 0)
         return res.status(404).json({ message: "Package not found", error });

      const [rows] = await pool.query("SELECT * FROM package_detail WHERE code = ?", [
         code,
      ]);

      res.json(rows[0]);
   } catch (error) {
      return res.status(500).json({ message: "Something goes wrong", error });
   }
};
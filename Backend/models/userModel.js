import pool from "../config/db.js";
import bcrypt from "bcryptjs";

class User {
  static async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }
}

export default User;

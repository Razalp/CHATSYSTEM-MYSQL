import pool from "../config/db.js";

class Message {
  static async sendMessage(senderId, receiverId, content) {
    const [result] = await pool.execute(
      "INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)",
      [senderId, receiverId, content]
    );
    return result;
  }

  static async getMessagesBetweenUsers(user1, user2) {
    const [rows] = await pool.execute(
      "SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY created_at",
      [user1, user2, user2, user1]
    );
    return rows;
  }
}

export default Message;

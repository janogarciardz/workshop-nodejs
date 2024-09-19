require("dotenv").config();

const pool = require("../db/db");

const getTasks = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tasks");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getTaskById = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM tasks WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [title, description]
    );
    res.status(201).json({ id: result.insertId, title, description });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea actualizada" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const checkCompletedTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "UPDATE tasks SET completed = ? WHERE id = ?",
      [1, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json({ message: "Tarea completada" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error: error });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM tasks WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.status(204).json({ message: "Tarea eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  checkCompletedTask,
  deleteTask,
};

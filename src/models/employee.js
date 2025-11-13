import { pool } from '../config/db.js'

export async function createEmployee({ nome, cargo }) {
  const [result] = await pool.execute(
    'INSERT INTO funcionario (nome, cargo) VALUES (?, ?)',
    [nome, cargo]
  )
  return result.insertId
}

export async function getEmployeeById(id) {
  const [rows] = await pool.execute('SELECT * FROM funcionario WHERE id_funcionario = ?', [id])
  return rows[0]
}

export async function getAllEmployees() {
  const [rows] = await pool.execute('SELECT * FROM funcionario')
  return rows
}

export async function updateEmployee(id, { nome, cargo }) {
  await pool.execute(
    'UPDATE funcionario SET nome = ?, cargo = ? WHERE id_funcionario = ?',
    [nome, cargo, id]
  )
}

export async function deleteEmployee(id) {
  await pool.execute('DELETE FROM funcionario WHERE id_funcionario = ?', [id])
}
import { pool } from '../config/db.js'

export async function createPatient({ nome, data_nascimento, telefone, email }) {
  const [result] = await pool.query(
    'INSERT INTO paciente (nome, data_nascimento, telefone, email) VALUES (?, ?, ?, ?)',
    [nome, data_nascimento, telefone, email]
  )
  return result.insertId
}

export async function getPatientById(id) {
  const [rows] = await pool.query('SELECT * FROM paciente WHERE id_paciente = ?', [id])
  return rows[0]
}

export async function getAllPatients() {
  const [rows] = await pool.query('SELECT * FROM paciente')
  return rows
}

export async function deletePatient(id) {
  await pool.query('DELETE FROM paciente WHERE id_paciente = ?', [id])
}

export async function updatePatient(id, { nome, data_nascimento, telefone, email }) {
   await pool.query(
    'UPDATE paciente SET nome = ?, data_nascimento = ?, telefone = ?, email = ? WHERE id_paciente = ?',
    [nome, data_nascimento, telefone, email, id]
  )
}
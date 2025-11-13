import { pool } from '../config/db.js'

export async function createDoctor({ nome, crm, especialidade_id }) {
  const [result] = await pool.execute(
    'INSERT INTO medico (nome, crm, especialidade) VALUES (?, ?, ?)',
    [nome, crm, especialidade_id]
  )
  return result.insertId
}

export async function getDoctorById(id) {
  const [rows] = await pool.execute('SELECT * FROM medico WHERE id_medico = ?', [id])
  return rows[0]
}

export async function getAllDoctors() {
  const [rows] = await pool.execute(`
    SELECT m.*, e.nome as nome_especialidade 
    FROM medico m
    JOIN especialidade e ON m.especialidade = e.id_especialidade
  `)
  return rows
}

export async function updateDoctor(id, { nome, crm, especialidade_id }) {
  await pool.execute(
    'UPDATE medico SET nome = ?, crm = ?, especialidade = ? WHERE id_medico = ?',
    [nome, crm, especialidade_id, id]
  )
}

export async function deleteDoctor(id) {
  await pool.execute('DELETE FROM medico WHERE id_medico = ?', [id])
}
import { pool } from '../config/db.js'

export async function createAppointment({ data_consulta, observacoes, paciente_id, medico_id }) {
  const [result] = await pool.query(
    'INSERT INTO consulta (data_consulta, observacoes, paciente, medico) VALUES (?, ?, ?, ?)',
    [data_consulta, observacoes, paciente_id, medico_id]
  )
  return result.insertId
}

export async function getAppointmentById(id) {
  const [rows] = await pool.query('SELECT * FROM consulta WHERE id_consulta = ?', [id])
  return rows[0]
}

export async function getAllAppointments() {
  const [rows] = await pool.query(`
    SELECT c.*, p.nome as nome_paciente, m.nome as nome_medico
    FROM consulta c
    JOIN paciente p ON c.paciente = p.id_paciente
    JOIN medico m ON c.medico = m.id_medico
  `)
  return rows
}

export async function updateAppointment(id, { data_consulta, observacoes, paciente_id, medico_id }) {
  await pool.query(
    'UPDATE consulta SET data_consulta = ?, observacoes = ?, paciente = ?, medico = ? WHERE id_consulta = ?',
    [data_consulta, observacoes, paciente_id, medico_id, id]
  )
}

export async function deleteAppointment(id) {
  await pool.query('DELETE FROM consulta WHERE id_consulta = ?', [id])
}
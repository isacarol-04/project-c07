import { pool } from '../config/db.js'

export async function createSpecialty({ nome }) {
  const [result] = await pool.execute(
    'INSERT INTO especialidade (nome) VALUES (?)',
    [nome]
  )
  return result.insertId
}

export async function getSpecialtyById(id) {
  const [rows] = await pool.execute('SELECT * FROM especialidade WHERE id_especialidade = ?', [id])
  return rows[0]
}

export async function getAllSpecialties() {
  const [rows] = await pool.execute('SELECT * FROM especialidade')
  return rows
}

export async function updateSpecialty(id, { nome }) {
  await pool.execute(
    'UPDATE especialidade SET nome = ? WHERE id_especialidade = ?',
    [nome, id]
  )
}

export async function deleteSpecialty(id) {
  await pool.execute('DELETE FROM especialidade WHERE id_especialidade = ?', [id])
}
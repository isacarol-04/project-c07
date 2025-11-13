import { pool } from '../config/db.js'

export async function createExam({ nome_exame, descricao }) {
  const [result] = await pool.query(
    'INSERT INTO exame (nome_exame, descricao) VALUES (?, ?)',
    [nome_exame, descricao]
  )
  return result.insertId
}

export async function getExamById(id) {
  const [rows] = await pool.query('SELECT * FROM exame WHERE id_exame = ?', [id])
  return rows[0]
}

export async function getAllExams() {
  const [rows] = await pool.query('SELECT * FROM exame')
  return rows
}

export async function updateExam(id, { nome_exame, descricao }) {
  await pool.query(
    'UPDATE exame SET nome_exame = ?, descricao = ? WHERE id_exame = ?',
    [nome_exame, descricao, id]
  )
}

export async function deleteExam(id) {
  await pool.query('DELETE FROM exame WHERE id_exame = ?', [id])
}
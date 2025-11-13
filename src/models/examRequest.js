import { pool } from '../config/db.js'

export async function createExamRequest({ data_solicitacao, consulta_id, funcionario_id, exame_id }) {
  const [result] = await pool.query(
    'INSERT INTO solicitacaoExame (data_solicitacao, consulta, funcionario, exame) VALUES (?, ?, ?, ?)',
    [data_solicitacao, consulta_id, funcionario_id, exame_id]
  )
  return result.insertId
}

export async function getExamRequestById(id) {
  const [rows] = await pool.query('SELECT * FROM solicitacaoExame WHERE id_solicitacao_exame = ?', [id])
  return rows[0]
}

export async function getAllExamRequests() {
  const [rows] = await pool.query(`
    SELECT 
      s.*, 
      e.nome_exame, 
      f.nome as nome_funcionario,  
      p.id as id_paciente
      p.nome as nome_paciente,
      m.id_medico,                  
      m.nome as nome_medico       
    FROM solicitacaoExame s
    JOIN exame e ON s.exame = e.id_exame
    JOIN consulta c ON s.consulta = c.id_consulta
    JOIN paciente p ON c.paciente = p.id_paciente
    JOIN medico m ON c.medico = m.id_medico              
    JOIN funcionario f ON s.funcionario = f.id_funcionario  
  `)
  return rows
}

export async function addExamResult(id, resultado) {
  await pool.query(
    'UPDATE solicitacaoExame SET resultado = ? WHERE id_solicitacao_exame = ?',
    [resultado, id]
  )
}

export async function deleteExamRequest(id) {
  await pool.query('DELETE FROM solicitacaoExame WHERE id_solicitacao_exame = ?', [id])
}
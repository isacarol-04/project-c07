import { pool } from './db.js'
import { createPatient } from '../models/patient.js'
import { createSpecialty } from '../models/specialty.js'
import { createDoctor } from '../models/doctor.js'
import { createEmployee } from '../models/employee.js'
import { createExam } from '../models/exam.js'
import { createAppointment } from '../models/appointment.js'
import { createExamRequest } from '../models/examRequest.js'

async function seedDatabase() {
  console.log('🌱 Iniciando o seeding do banco de dados...')

  try {
    // 1. Criar dados independentes
    console.log('Criando especialidades...')
    const cardioId = await createSpecialty({ nome: 'Cardiologia' })
    const dermatoId = await createSpecialty({ nome: 'Dermatologia' })
    console.log(`Especialidades criadas: Cardiologia (ID: ${cardioId}), Dermatologia (ID: ${dermatoId})`)

    console.log('Criando pacientes...')
    const paciente1Id = await createPatient({
      nome: 'Isabelle Pereira',
      data_nascimento: '2004-01-01',
      telefone: '35999998888',
      email: 'isafkene@example.com'
    })
    const paciente2Id = await createPatient({
      nome: 'Lucas Magalhães',
      data_nascimento: '2000-02-15',
      telefone: '35988887777',
      email: 'lucas@example.com'
    })
    console.log(`Pacientes criados: Isabelle (ID: ${paciente1Id}), Lucas (ID: ${paciente2Id})`)

    console.log('Criando funcionários...')
    const func1Id = await createEmployee({ nome: 'Ana Silva', cargo: 'Recepcionista' })
    console.log(`Funcionário criado: Ana (ID: ${func1Id})`)

    console.log('Criando exames...')
    const exame1Id = await createExam({ nome_exame: 'Hemograma Completo', descricao: 'Análise de células sanguíneas' })
    const exame2Id = await createExam({ nome_exame: 'Eletrocardiograma', descricao: 'Análise do ritmo cardíaco' })
    console.log(`Exames criados: Hemograma (ID: ${exame1Id}), Eletro (ID: ${exame2Id})`)

    // 2. Criar dados dependentes (que usam os IDs acima)
    console.log('Criando médicos...')
    const med1Id = await createDoctor({
      nome: 'Dr. Roberto Alves',
      crm: '12345-MG',
      especialidade_id: cardioId
    })
    const med2Id = await createDoctor({
      nome: 'Dra. Ana Costa',
      crm: '54321-MG',
      especialidade_id: dermatoId
    })
    console.log(`Médicos criados: Dr. Roberto (ID: ${med1Id}), Dra. Ana (ID: ${med2Id})`)

    // 3. Criar dados de relacionamento
    console.log('Agendando consultas...')
    const consulta1Id = await createAppointment({
      data_consulta: '2025-11-15',
      observacoes: 'Paciente queixa-se de dor no peito.',
      paciente_id: paciente1Id,
      medico_id: med1Id
    })
    console.log(`Consulta criada: ID ${consulta1Id}`)

    console.log('Solicitando exames...')
    await createExamRequest({
      data_solicitacao: '2025-11-15',
      consulta_id: consulta1Id,
      funcionario_id: func1Id, // Ana registrou
      exame_id: exame1Id // Hemograma
    })
    await createExamRequest({
      data_solicitacao: '2025-11-15',
      consulta_id: consulta1Id,
      funcionario_id: func1Id,
      exame_id: exame2Id // Eletrocardiograma
    })
    console.log('Solicitações de exame criadas.')

    console.log('✅ Seeding concluído com sucesso!')

  } catch (error) {
    console.error('❌ Erro durante o seeding:', error.message)
    if (error.code === 'ER_DUP_ENTRY') {
      console.warn('⚠️  Parece que o banco já foi populado. Se quiser rodar de novo, limpe as tabelas primeiro.')
    }
  } finally {
    await pool.end()
    console.log('Conexão com o banco fechada.')
  }
}

seedDatabase()
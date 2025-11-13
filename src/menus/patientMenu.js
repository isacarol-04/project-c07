import readline from 'readline-sync'
import {
  createPatient,
  getPatientById,
  getAllPatients,
  deletePatient,
  updatePatient, 
} from '../models/patient.js'

export async function patientMenu() {
  while (true) {
    console.log('\n=== MENU PACIENTES ===')
    console.log('1 - Adicionar novo paciente')
    console.log('2 - Buscar paciente por ID')
    console.log('3 - Listar todos os pacientes')
    console.log('4 - Atualizar paciente')
    console.log('5 - Deletar paciente')
    console.log('0 - Voltar ao menu principal')

    const option = readline.question('Escolha: ')

    if (option === '1') {
      const nome = readline.question('Nome: ')
      const data_nascimento = readline.question('Data de Nascimento (AAAA-MM-DD): ')
      const telefone = readline.question('Telefone: ')
      const email = readline.question('Email: ')
      const id = await createPatient({ nome, data_nascimento, telefone, email })
      console.log(`✅ Paciente criado com ID: ${id}`)

    } else if (option === '2') {
      const id = readline.questionInt('ID do Paciente: ')
      const patient = await getPatientById(id)
      if (patient) console.log(patient)
      else console.log('❌ Paciente não encontrado.')

    } else if (option === '3') {
      const patients = await getAllPatients()
      if (patients.length === 0) console.log('Nenhum paciente cadastrado.')
      else patients.forEach(p => console.log(p))

    } else if (option === '4') { // Menu de Update
      const id = readline.questionInt('ID do Paciente para atualizar: ')
      const patient = await getPatientById(id)
      if (!patient) {
        console.log('❌ Paciente não encontrado.')
        continue
      }
      console.log(`Atualizando Paciente: ${patient.nome}`)
      const nome = readline.question(`Nome (${patient.nome}): `) || patient.nome
      const data_nascimento = readline.question(`Data Nasc. (${patient.data_nascimento}): `) || patient.data_nascimento
      const telefone = readline.question(`Telefone (${patient.telefone}): `) || patient.telefone
      const email = readline.question(`Email (${patient.email}): `) || patient.email
      
      await updatePatient(id, { nome, data_nascimento, telefone, email })
      console.log('✅ Paciente atualizado.')

    } else if (option === '5') {
      const id = readline.questionInt('ID do Paciente para deletar: ')
      await deletePatient(id)
      console.log('🗑️ Paciente deletado.')

    } else if (option === '0') {
      break
    } else {
      console.log('Opção inválida.')
    }
  }
}
import readline from 'readline-sync'
import {
  createDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
} from '../models/doctor.js'
import { getAllSpecialties } from '../models/specialty.js' 

export async function doctorMenu() {
  while (true) {
    console.log('\n=== MENU MÉDICOS ===')
    console.log('1 - Adicionar novo médico')
    console.log('2 - Buscar médico por ID')
    console.log('3 - Listar todos os médicos')
    console.log('4 - Atualizar médico')
    console.log('5 - Deletar médico')
    console.log('0 - Voltar ao menu principal')

    const option = readline.question('Escolha: ')

    if (option === '1') {
      const nome = readline.question('Nome: ')
      const crm = readline.question('CRM: ')
      
      console.log('--- Especialidades Disponíveis ---')
      const especialidades = await getAllSpecialties()
      especialidades.forEach(e => console.log(`ID: ${e.id_especialidade} - ${e.nome}`))
      console.log('----------------------------------')
      
      const especialidade_id = readline.questionInt('ID da Especialidade: ')
      
      const id = await createDoctor({ nome, crm, especialidade_id })
      console.log(`✅ Médico criado com ID: ${id}`)
      
    } else if (option === '2') {
      const id = readline.questionInt('ID do Médico: ')
      const item = await getDoctorById(id)
      if (item) console.log(item)
      else console.log('❌ Médico não encontrado.')
      
    } else if (option === '3') {
      const items = await getAllDoctors()
      if (items.length === 0) console.log('Nenhum médico cadastrado.')
      else items.forEach(i => console.log(i))
      
    } else if (option === '4') {
      const id = readline.questionInt('ID do Médico para atualizar: ')
      const item = await getDoctorById(id)
      if (!item) {
        console.log('❌ Médico não encontrado.')
        continue
      }
      
      const nome = readline.question(`Nome (${item.nome}): `) || item.nome
      const crm = readline.question(`CRM (${item.crm}): `) || item.crm
      
      console.log('--- Especialidades Disponíveis ---')
      const especialidades = await getAllSpecialties()
      especialidades.forEach(e => console.log(`ID: ${e.id_especialidade} - ${e.nome}`))
      console.log('----------------------------------')
      
      const especialidade_id = readline.questionInt(`ID Especialidade (${item.especialidade}): `) || item.especialidade
      
      await updateDoctor(id, { nome, crm, especialidade_id })
      console.log('✅ Médico atualizado.')
      
    } else if (option === '5') {
      const id = readline.questionInt('ID do Médico para deletar: ')
      await deleteDoctor(id)
      console.log('🗑️ Médico deletado.')
      
    } else if (option === '0') {
      break
    } else {
      console.log('Opção inválida.')
    }
  }
}
import readline from 'readline-sync'
import {
  createAppointment,
  getAppointmentById,
  getAllAppointments,
  updateAppointment,
  deleteAppointment,
} from '../models/appointment.js'

export async function appointmentMenu() {
  while (true) {
    console.log('\n=== MENU CONSULTAS ===')
    console.log('1 - Agendar nova consulta')
    console.log('2 - Buscar consulta por ID')
    console.log('3 - Listar todas as consultas')
    console.log('4 - Atualizar consulta')
    console.log('5 - Deletar consulta')
    console.log('0 - Voltar ao menu principal')

    const option = readline.question('Escolha: ')

    if (option === '1') {
      const data_consulta = readline.question('Data da Consulta (AAAA-MM-DD): ')
      const observacoes = readline.question('Observações: ')
      const paciente_id = readline.questionInt('ID do Paciente: ')
      const medico_id = readline.questionInt('ID do Médico: ')
      
      const id = await createAppointment({ data_consulta, observacoes, paciente_id, medico_id })
      console.log(`✅ Consulta agendada com ID: ${id}`)
      
    } else if (option === '2') {
      const id = readline.questionInt('ID da Consulta: ')
      const item = await getAppointmentById(id)
      if (item) console.log(item)
      else console.log('❌ Consulta não encontrada.')
      
    } else if (option === '3') {
      const items = await getAllAppointments()
      if (items.length === 0) console.log('Nenhuma consulta agendada.')
      else items.forEach(i => console.log(i))
      
    } else if (option === '4') {
      const id = readline.questionInt('ID da Consulta para atualizar: ')
      const item = await getAppointmentById(id)
      if (!item) {
        console.log('❌ Consulta não encontrada.')
        continue
      }
      
      const data_consulta = readline.question(`Data (${item.data_consulta}): `) || item.data_consulta
      const observacoes = readline.question(`Observações (${item.observacoes}): `) || item.observacoes
      const paciente_id = readline.questionInt(`ID Paciente (${item.paciente}): `) || item.paciente
      const medico_id = readline.questionInt(`ID Médico (${item.medico}): `) || item.medico
      
      await updateAppointment(id, { data_consulta, observacoes, paciente_id, medico_id })
      console.log('✅ Consulta atualizada.')
      
    } else if (option === '5') {
      const id = readline.questionInt('ID da Consulta para deletar: ')
      await deleteAppointment(id)
      console.log('🗑️ Consulta deletada.')
      
    } else if (option === '0') {
      break
    } else {
      console.log('Opção inválida.')
    }
  }
}
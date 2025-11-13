import readline from 'readline-sync'
import { patientMenu } from './patientMenu.js'
import { specialtyMenu } from './specialtyMenu.js'
import { doctorMenu } from './doctorMenu.js'
import { employeeMenu } from './employeeMenu.js'
import { examMenu } from './examMenu.js'
import { appointmentMenu } from './appointmentMenu.js'
import { examRequestMenu } from './examRequestMenu.js'

export async function mainMenu() {
  while (true) {
    console.log('\n=== CLINIC SYSTEM ===')
    console.log('1 - Gerenciar Pacientes')
    console.log('2 - Gerenciar Especialidades')
    console.log('3 - Gerenciar Médicos')
    console.log('4 - Gerenciar Funcionários')
    console.log('5 - Gerenciar Exames')
    console.log('6 - Gerenciar Consultas')
    console.log('7 - Gerenciar Solicitações de Exames')
    console.log('0 - Sair')

    const option = readline.question('Escolha: ')

    switch (option) {
      case '1':
        await patientMenu()
        break
      case '2':
        await specialtyMenu()
        break
      case '3':
        await doctorMenu()
        break
      case '4':
        await employeeMenu()
        break
      case '5':
        await examMenu()
        break
      case '6':
        await appointmentMenu()
        break
      case '7':
        await examRequestMenu()
        break
      case '0':
        console.log('👋 Saindo do sistema...')
        return
      default:
        console.log('Opção inválida.')
    }
  }
}
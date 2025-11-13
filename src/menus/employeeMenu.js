import readline from 'readline-sync'
import {
  createEmployee,
  getEmployeeById,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from '../models/employee.js'

export async function employeeMenu() {
  while (true) {
    console.log('\n=== MENU FUNCIONÁRIOS ===')
    console.log('1 - Adicionar novo funcionário')
    console.log('2 - Buscar funcionário por ID')
    console.log('3 - Listar todos os funcionários')
    console.log('4 - Atualizar funcionário')
    console.log('5 - Deletar funcionário')
    console.log('0 - Voltar ao menu principal')

    const option = readline.question('Escolha: ')

    if (option === '1') {
      const nome = readline.question('Nome: ')
      const cargo = readline.question('Cargo: ')

      const id = await createEmployee({ nome, cargo })
      console.log(`✅ Funcionário criado com ID: ${id}`)

    } else if (option === '2') {
      const id = readline.questionInt('ID do Funcionário: ')
      const item = await getEmployeeById(id)

      if (item) console.log(item)
      else console.log('❌ Funcionário não encontrado.')

    } else if (option === '3') {
      const items = await getAllEmployees()

      if (items.length === 0) console.log('Nenhum funcionário cadastrado.')
      else items.forEach(i => console.log(i))

    } else if (option === '4') {
      const id = readline.questionInt('ID do Funcionário para atualizar: ')
      const item = await getEmployeeById(id)

      if (!item) {
        console.log('❌ Funcionário não encontrado.')
        continue
      }

      const nome = readline.question(`Nome (${item.nome}): `) || item.nome
      const cargo = readline.question(`Cargo (${item.cargo}): `) || item.cargo

      await updateEmployee(id, { nome, cargo })
      console.log('✅ Funcionário atualizado.')

    } else if (option === '5') {
      const id = readline.questionInt('ID do Funcionário para deletar: ')

      await deleteEmployee(id)
      console.log('🗑️ Funcionário deletado.')
      
    } else if (option === '0') {
      break
    } else {
      console.log('Opção inválida.')
    }
  }
}
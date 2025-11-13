import readline from 'readline-sync'
import {
  createExamRequest,
  getExamRequestById,
  getAllExamRequests,
  addExamResult,
  deleteExamRequest,
} from '../models/examRequest.js'

export async function examRequestMenu() {
  while (true) {
    console.log('\n=== MENU SOLICITAÇÃO DE EXAMES ===')
    console.log('1 - Criar nova solicitação')
    console.log('2 - Adicionar resultado a uma solicitação')
    console.log('3 - Buscar solicitação por ID')
    console.log('4 - Listar todas as solicitações')
    console.log('5 - Deletar solicitação')
    console.log('0 - Voltar ao menu principal')

    const option = readline.question('Escolha: ')

    if (option === '1') {
      const data_solicitacao = readline.question('Data da Solicitação (AAAA-MM-DD): ')
      const consulta_id = readline.questionInt('ID da Consulta: ')
      const funcionario_id = readline.questionInt('ID do Funcionário (que está registrando): ')
      const exame_id = readline.questionInt('ID do Exame: ')
      
      const id = await createExamRequest({ data_solicitacao, consulta_id, funcionario_id, exame_id })
      console.log(`✅ Solicitação criada com ID: ${id}`)
      
    } else if (option === '2') {
      const id = readline.questionInt('ID da Solicitação de Exame: ')
      const item = await getExamRequestById(id)
      if (!item) {
        console.log('❌ Solicitação não encontrada.')
        continue
      }
      const resultado = readline.question('Digite o resultado: ')
      await addExamResult(id, resultado)
      console.log('✅ Resultado adicionado.')

    } else if (option === '3') {
      const id = readline.questionInt('ID da Solicitação: ')
      const item = await getExamRequestById(id)
      if (item) console.log(item)
      else console.log('❌ Solicitação não encontrada.')
      
    } else if (option === '4') {
      const items = await getAllExamRequests()
      if (items.length === 0) console.log('Nenhuma solicitação cadastrada.')
      else items.forEach(i => console.log(i))
      
    } else if (option === '5') {
      const id = readline.questionInt('ID da Solicitação para deletar: ')
      await deleteExamRequest(id)
      console.log('🗑️ Solicitação deletada.')
      
    } else if (option === '0') {
      break
    } else {
      console.log('Opção inválida.')
    }
  }
}
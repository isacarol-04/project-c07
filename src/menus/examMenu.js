import readline from 'readline-sync'
import {
  createExam,
  getExamById,
  getAllExams,
  updateExam,
  deleteExam,
} from '../models/exam.js'

export async function examMenu() {
  while (true) {
    console.log('\n=== MENU EXAMES ===')
    console.log('1 - Adicionar novo exame')
    console.log('2 - Buscar exame por ID')
    console.log('3 - Listar todos os exames')
    console.log('4 - Atualizar exame')
    console.log('5 - Deletar exame')
    console.log('0 - Voltar ao menu principal')

    const option = readline.question('Escolha: ')

    if (option === '1') {
      const nome_exame = readline.question('Nome do Exame: ')
      const descricao = readline.question('Descrição: ')
      const id = await createExam({ nome_exame, descricao })
      console.log(`✅ Exame criado com ID: ${id}`)
    } else if (option === '2') {
      const id = readline.questionInt('ID do Exame: ')
      const item = await getExamById(id)
      if (item) console.log(item)
      else console.log('❌ Exame não encontrado.')
    } else if (option === '3') {
      const items = await getAllExams()
      if (items.length === 0) console.log('Nenhum exame cadastrado.')
      else items.forEach(i => console.log(i))
    } else if (option === '4') {
      const id = readline.questionInt('ID do Exame para atualizar: ')
      const item = await getExamById(id)
      if (!item) {
        console.log('❌ Exame não encontrado.')
        continue
      }
      const nome_exame = readline.question(`Nome (${item.nome_exame}): `) || item.nome_exame
      const descricao = readline.question(`Descrição (${item.descricao}): `) || item.descricao
      await updateExam(id, { nome_exame, descricao })
      console.log('✅ Exame atualizado.')
    } else if (option === '5') {
      const id = readline.questionInt('ID do Exame para deletar: ')
      await deleteExam(id)
      console.log('🗑️ Exame deletado.')
    } else if (option === '0') {
      break
    } else {
      console.log('Opção inválida.')
    }
  }
}
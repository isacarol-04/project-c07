import readline from 'readline-sync'
import {
  createSpecialty,
  getSpecialtyById,
  getAllSpecialties,
  updateSpecialty,
  deleteSpecialty,
} from '../models/specialty.js'

export async function specialtyMenu() {
  while (true) {
    console.log('\n=== MENU ESPECIALIDADES ===')
    console.log('1 - Adicionar nova especialidade')
    console.log('2 - Buscar especialidade por ID')
    console.log('3 - Listar todas as especialidades')
    console.log('4 - Atualizar especialidade')
    console.log('5 - Deletar especialidade')
    console.log('0 - Voltar ao menu principal')

    const option = readline.question('Escolha: ')

    if (option === '1') {
      const nome = readline.question('Nome da Especialidade: ')
      const id = await createSpecialty({ nome })
      console.log(`✅ Especialidade criada com ID: ${id}`)
    } else if (option === '2') {
      const id = readline.questionInt('ID da Especialidade: ')
      const item = await getSpecialtyById(id)
      if (item) console.log(item)
      else console.log('❌ Especialidade não encontrada.')
    } else if (option === '3') {
      const items = await getAllSpecialties()
      if (items.length === 0) console.log('Nenhuma especialidade cadastrada.')
      else items.forEach(i => console.log(i))
    } else if (option === '4') {
      const id = readline.questionInt('ID da Especialidade para atualizar: ')
      const item = await getSpecialtyById(id)
      if (!item) {
        console.log('❌ Especialidade não encontrada.')
        continue
      }
      const nome = readline.question(`Nome (${item.nome}): `) || item.nome
      await updateSpecialty(id, { nome })
      console.log('✅ Especialidade atualizada.')
    } else if (option === '5') {
      const id = readline.questionInt('ID da Especialidade para deletar: ')
      await deleteSpecialty(id)
      console.log('🗑️ Especialidade deletada.')
    } else if (option === '0') {
      break
    } else {
      console.log('Opção inválida.')
    }
  }
}
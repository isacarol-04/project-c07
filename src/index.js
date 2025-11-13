import { testConnection } from './config/db.js'
import { mainMenu } from './menus/mainMenu.js'

async function main() {
  await testConnection()
  await mainMenu()
  process.exit(0)
}

main()
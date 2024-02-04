// themeSelector.js
const { Command } = require('commander')
const inquirer = require('inquirer')
const { exec } = require('child_process')
const program = new Command()

const fs = require('fs')
const path = require('path')
const envPath = path.join(__dirname, '.env')
// eslint-disable-next-line
function updateEnvFile(theme) {
  let content = ''
  if (fs.existsSync(envPath)) {
    content = fs.readFileSync(envPath, 'utf8')
  }

  const lines = content.split('\n')
  const themeLineIndex = lines.findIndex((line) =>
    line.startsWith('ACTIVE_THEME=')
  )

  if (themeLineIndex !== -1) {
    lines[themeLineIndex] = `ACTIVE_THEME=${theme}`
  } else {
    lines.push(`ACTIVE_THEME=${theme}`)
  }

  fs.writeFileSync(envPath, lines.join('\n'))
}

program.version('1.0.0').description('Select a theme for the React app')

const questions = [
  {
    type: 'list',
    name: 'theme',
    message: 'What theme do you want to use?',
    choices: ['default'],
    default: 'default'
  }
]

program
  .command('select')
  .description('Select a theme')
  .action(() => {
    inquirer.prompt(questions).then((answers) => {
      updateEnvFile(answers.theme)

      console.log(`Selected theme: ${answers.theme}`)
      exec('npm run dev:base -- --open')
    })
  })

program.parse(process.argv)

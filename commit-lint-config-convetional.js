'use strict'

module.exports = {
  prompter: function (cz, commit) {
    cz.prompt([
      {
        type: 'list',
        name: 'type',
        message: "Select the type of change that you're committing",
        choices: [
          { value: 'feat', name: 'feat:    New feature' },
          { value: 'fix', name: 'fix:    For a bug fix' },
          {
            value: 'docs',
            name: 'docs:    Change the docs'
          },
          {
            value: 'style',
            name: 'style:    Changes that not affect the code behaviour\n            (white spaces, styles, etc.)'
          },
          {
            value: 'refactor',
            name: 'refactor:     Refactor the code'
          },
          {
            value: 'perf',
            name: 'perf:     Improve the code performance'
          },
          {
            value: 'test',
            name: 'test:     Add tests'
          },
          {
            value: 'chore',
            name: 'chore:    Change on the build process, new libraries, etc'
          },
          { value: 'revert', name: 'revert:    Revert to a commit' }
        ]
      },
      {
        type: 'input',
        name: 'subject',
        message: 'What is the changes? \n'
      }
    ]).then((answers) => {
      const commitMessage = `${answers.type}: ${answers.subject} `
      commit(commitMessage)
    })
  }
}

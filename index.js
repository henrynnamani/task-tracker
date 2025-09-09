#!/usr/bin/env node
const fs = require('fs')

// Capture the arguments passed into the CLI
const args = process.argv.slice(2);

if(args.includes('--add') || args.includes('-a')) {
    const index = args.indexOf('--add') !== -1 ? args.indexOf('--add') + 1 : args.indexOf('-a') + 1;

    const description = args[index]

    fs.readFile('task.json', 'utf8', (err, data) => {
        if (err) {
          console.error('Error reading file:', err);
          return;
        }

        const currentTasks = JSON.parse(data);

        const task = {
            "id": currentTasks.length + 1,
            "description": description,
            "status": "todo",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }

        currentTasks.push(task)

        const jsonString = JSON.stringify(currentTasks, null, 2);

      fs.writeFile('task.json', jsonString, 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
          return;
        }
        console.log('Data successfully written to file 🤗');
      });
      });

      process.exit()
}

if(args.includes('--update') || args.includes('-u')) {
    const index = args.indexOf('--update') !== -1 ? args.indexOf('--update') + 1 : args.indexOf('-u') + 1;
    const description = args.indexOf('--update') !== -1 ? args.indexOf('--update') + 2 : args.indexOf('-u') + 2;

    fs.readFile('task.json', 'utf-8', (err, data) => {
        if(err) {
            console.log('Error reading file')
        }

        const parseData = JSON.parse(data)

        const tasks = parseData.map((task) => {
            if(String(task.id) === args[index]) {
                return {
                    ...task,
                    "description": args[description],
                    "updatedAt": new Date()
                }
            }

            return task
        })

        const jsonString = JSON.stringify(tasks, null, 2)

        fs.writeFile('task.json', jsonString, 'utf8', (err) => {
            if (err) {
              console.error('Error writing to file:', err);
              return;
            }
          });

          console.log('Data successfully updated 💌')
    })
}

if(args.includes('--mark-in-progress')) {
    const index = args.indexOf('--mark-in-progress') !== -1 && args.indexOf('--mark-in-progress') + 1;

    fs.readFile('task.json', 'utf-8', (err, data) => {
        if(err) {
            console.log('Error reading file')
        }

        const parseData = JSON.parse(data)

        const tasks = parseData.map((task) => {
            if(String(task.id) === args[index]) {
                return {
                    ...task,
                    "status": "in-progress"
                }
            }

            return task
        })

        const jsonString = JSON.stringify(tasks, null, 2)

        fs.writeFile('task.json', jsonString, 'utf8', (err) => {
            if (err) {
              console.error('Error writing to file:', err);
              return;
            }
          });

          console.log('Task updated 💌')
    })
}

if(args.includes('--mark-done')) {
    const index = args.indexOf('--mark-done') !== -1 && args.indexOf('--mark-done') + 1;

    fs.readFile('task.json', 'utf-8', (err, data) => {
        if(err) {
            console.log('Error reading file')
        }

        const parseData = JSON.parse(data)

        const tasks = parseData.map((task) => {
            if(String(task.id) === args[index]) {
                return {
                    ...task,
                    "status": "done"
                }
            }

            return task
        })

        const jsonString = JSON.stringify(tasks, null, 2)

        fs.writeFile('task.json', jsonString, 'utf8', (err) => {
            if (err) {
              console.error('Error writing to file:', err);
              return;
            }
          });

          console.log('Task updated 💌')
    })
}

if(args.includes('--delete') || args.includes('-d')) {
    const index = args.indexOf('--delete') !== -1 ? args.indexOf('--delete') + 1 : args.indexOf('-d') + 1;

    fs.readFile('task.json', 'utf-8', (err, data) => {
        if(err) {
            console.log('Error reading file')
        }

        const parseData = JSON.parse(data)

        const tasks = parseData.filter((task) => String(task.id) !== args[index])

        const jsonString = JSON.stringify(tasks, null, 2)

        fs.writeFile('task.json', jsonString, (err) => {
            if(err) {
                console.log('Error writing to file')
            }
        }) 

        console.log('Data successfully deleted ❤️‍🔥')
    })
}

if(args.includes('--list') || args.includes('-d')) {
    const index = args.indexOf('--list') !== -1 ? args.indexOf('--list') + 1 : args.indexOf('-d') + 1;

    fs.readFile('task.json', 'utf-8', (err, data) => {
        if(err) {
            console.log('Error reading file')
        }

        const parseData = JSON.parse(data)

        const tasks = parseData.filter((task) => String(task.id) !== args[index])

        const jsonString = JSON.stringify(tasks, null, 2)

        fs.writeFile('task.json', jsonString, (err) => {
            if(err) {
                console.log('Error writing to file')
            }
        }) 

        console.log('Data successfully deleted ❤️‍🔥')
    })
}

// Display the CLI version
if (args.includes('--version') || args.includes('-v')) {
  console.log('Tarc Version 1.0.0 \nBuilt in recovery of heartbreak 💔.');
  process.exit();
}
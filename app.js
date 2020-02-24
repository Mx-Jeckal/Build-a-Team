const Manager = require("./lib/Manager")
const Employee = require("./lib/Employee")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const inquirer = require("inquirer")
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const baseQues = [{
    type: "input",
    name: "name",
    message: "What is your name?"
}, {
    type: "list",
    name: "id",
    message: "What is your ID?",
    choices: [1, 2, 3, 4, 5]
}, {
    type: "input",
    name: "email",
    message: "What is your email address?"

}]

function promptUser() {
    return inquirer.prompt(baseQues)
        .then(answers => {
            console.log(answers)
            let user = new Employee(answers.name, answers.id, answers.email)
            console.log("Your name is: " + user.getName())
            return inquirer.prompt({
                type: "list",
                name: "role",
                message: "What is your role?",
                choices: ["Manager", "Intern", "Engineer"]
            }).then(answers => {
                if (answers.role == "Manager") {
                    user = new Manager()
                    user.role = answers.role
                    user.getRole()
                    console.log("You're the manager! " + user.getRole())
                }
            })
        })

    // console.log()
}
promptUser()

// async function init() {
//     console.log("hi")
//     try {
//         const answers = await promptUser();

//         const html = new Employee(answers);

//         await writeFileAsync("./output/manager.html", toString(html));

//         console.log("Successfully wrote to index.html");
//     } catch (err) {
//         console.log(err);
//     }
// }

// init();
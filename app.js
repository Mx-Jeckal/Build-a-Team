const Manager = require("./lib/Manager")
const Employee = require("./lib/Employee")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const inquirer = require("inquirer")
const fs = require("fs");
const util = require("util");

const employees = [];

// let choices = ["Manager", "Engineer", "Intern"]

// const baseQues = [{
//     type: "input",
//     name: "name",
//     message: "User's first name?"
// }, {
//     type: "input",
//     name: "id",
//     message: "What is their ID?",
// }, {
//     type: "input",
//     name: "email",
//     message: "What is their email address?"

// }]

function addMember() {
    inquirer.prompt([{
            message: "Enter team member's name",
            name: "name"
        },
        {
            type: "list",
            message: "Select team member's role",
            choices: [
                "Engineer",
                "Intern",
                "Manager"
            ],
            name: "role"
        },
        {
            message: "Enter team member's id",
            name: "id"
        },
        {
            message: "Enter team member's email address",
            name: "email"
        }
    ]).then(function({ name, role, id, email }) {
        let roleInfo = "";
        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } else if (role === "Intern") {
            roleInfo = "school name";
        } else {
            roleInfo = "office phone number";
        }
        // .then((roleInfo) => {
        //     // console.log(answers)
        // var newMember = new Employee(answers.name, answers.id, answers.email)
        //     // console.log(user)
        // return inquirer.prompt({
        //         type: "list",
        //         name: "role",
        //         message: "What type of employee would you like to add?",
        //         choices: choices
        //     })
        //     .then(roleInfo => {
        inquirer.prompt([{
                    message: `Enter team member's ${roleInfo}`,
                    name: "roleInfo"
                },
                {
                    type: "list",
                    message: "Would you like to add more team members?",
                    choices: [
                        "yes",
                        "no"
                    ],
                    name: "moreMembers"
                }
            ])
            .then(function({ roleInfo, moreMembers }) {
                let newMember;
                if (role === "Engineer") {
                    newMember = new Engineer(name, id, email, roleInfo);
                } else if (role === "Intern") {
                    newMember = new Intern(name, id, email, roleInfo);
                } else {
                    newMember = new Manager(name, id, email, roleInfo);
                }
                employees.push(newMember);
                // if (roleInfo.role == "Manager") {
                //     choices = ["Intern", "Engineer"]
                //     newManagement = new Manager();
                //     newManagement.name = newMember.name;
                //     newManagement.id = newMember.id;
                //     newManagement.email = newMember.email;
                //     newManagement.getRole();
                //     console.log("You're the manager! " + newManagement.getRole());
                //     return inquirer.prompt({
                //             type: "input",
                //             name: "officeNumber",
                //             message: "What is your office number?",
                //         })
                //         // using the Manager class we're setting the user answer to their input
                //         .then(answers => {
                //             newManagement.officeNumber = answers.officeNumber
                //             console.log("Your office number is: " + newManagement.getOfficeNumber())
                //         });

                // } else if (roleInfo.role == "Intern") {
                //     let newIntern = new Intern();
                //     newIntern.getRole()
                //     console.log("You're a lowly intern.. " + newIntern.getRole())
                //     return inquirer.prompt({
                //             type: "input",
                //             name: "school",
                //             message: "What is the name of your school?",
                //         })
                //         // using the intern class we're setting the user answer to their input
                //         .then(answers => {
                //             newIntern.school = answers.school
                //             console.log("You attend " + newIntern.getSchool() + " school!")
                //         });
                // } else if (roleInfo.role == "Engineer") {
                //     let newEngineer = new Engineer();
                //     newEngineer.getRole()
                //     console.log("You're an engineer!.. " + newEngineer.getRole())
                //     return inquirer.prompt({
                //             type: "input",
                //             name: "github",
                //             message: "What is your GitHub username?",
                //         })
                //         // using the intern class we're setting the user answer to their input
                //         .then(answers => {
                //             newEngineer.github = answers.school
                //             console.log("Your GitHub name is: " + newEngineer.getGithub())
                //         });
                // }

                addHtml(newMember)
                    .then(function() {
                        if (moreMembers === "yes") {
                            addMember();
                        } else {
                            finishHtml();
                        }
                    })
            });
    });
}

// console.log(newManagement)
// async function init() {
//     try {
//         const answers = await newManagement;

//         const html = managerHTML(answers);

//         await writeFileAsync("./templates/manager.html", html);

//         console.log("Successfully wrote to manager.html");
//     } catch (err) {
//         console.log(err);
//     }
// }

// init();

startHtml();
addMember();

function addHtml(member) {
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-md-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header prima">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-md-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./team.html", data, function(err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });

}

function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
       <div class = "jumbotron">
       <h1 class = "display-2 text-center">Team Members</h1>
       </div>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./team.html", html, function(err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}


function finishHtml() {
    const html = ` 
    </div>
    </div>
    </body>
    </html>`;

    fs.appendFile("./team.html", html, function(err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}
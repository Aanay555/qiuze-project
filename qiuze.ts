#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

const apilink:string = "https://opentdb.com/api.php?amount=6&category=18&difficulty=medium&type=multiple";
let fatchData = async (data:string) => {
    let fetchquize:any = await fetch(data)
    let res = await fetchquize.json()
    return res.results;
};
let data = await fatchData(apilink);
let startqiuze = async () => {
    let score:number = 0
    //for user name
    let name = await inquirer.prompt(
        {
            type: "input",
            name: "fname",
            message:" what is your name?"
        })
        for(let b=1; b<=5; b++){
        let answers = [...data[b].incorrect_answers,data[b].correct_answer];
        let ans = await inquirer.prompt(
            {
                type: "list",
                name: "quiz",
                message: data[b].question,
                choices:answers.map((val:any) => val),
            });
        
        if(ans.quiz == data[b].correct_answer){
            ++score;
            console.log(chalk.bold.italic.blue("Correct"))
        }
        else {
            console.log(`correct answer is ${chalk.bold.italic.green(data[b].correct_answer)}`)
        }
    }
        console.log(`Dear ${chalk.red.bold(name.fname)}, your score is ${chalk.green.bold(score)} out of ${chalk.yellow.bold("5")}`);
    };
    startqiuze();
    


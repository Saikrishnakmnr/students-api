const { urlencoded } = require('express');
const express = require('express');
const req = require('express/lib/request');
const { append } = require('express/lib/response');
const rival = express();


const fs = require("fs");
const { stringify } = require('querystring');

jsonData =fs.readFileSync('./students.json')
console.log(jsonData)

studentsDataFromFile = jsonData.toString()
const students = JSON.parse(studentsDataFromFile)
// console.log(typeof students)

rival.use(express.json())
rival.use(urlencoded({extended:true}))

// const students = [
//     {
//             "rollno":1,
//               "name":"md.sohel",
//               "standard":"2nd",
//              "gender":"male",
//              "age":8,
//              "transport":"bus",
//               "rank":"first"
//     }
// ]


rival.get('/students',(req,res)=>{
    res.send(students)
})


rival.get('/students/search-by-gender',(req,res)=>{
    console.log(req.query)
    res.send(students)
})

rival.get('/students/search-by-rollno/:rollno',(req,res)=>{
 const   filterarray=  students.filter((stud)=>stud.rollno == req.params.rollno)
    res.send(filterarray)
})

rival.get('/students/search-by-transport',(req,res)=>{
    const transportarray = students.filter((stud)=>stud.transport == req.query.transport)
    
    res.send(transportarray)
})

rival.get('/students/rank/:rank',(req,res)=>{
    const rankarray = students.filter((student)=>student.rank == req.params.rank)
    res.send(rankarray)
})


rival.post('/students/create',(req,res)=>{
    console.log(req.body)
   

    newStudents = {"rollno":students.length + 1, ...req.body}
    students.push(newStudents)
    fs.writeFileSync('./students.json',JSON.stringify(students))
    res.send(students)
})



rival.put('/students/update/:rollno',(req,res)=>{
   const  updatedStudents = students.map((students)=>{
        if(students.rollno.toString() === req.params.rollno){
            const  updatedStudents = {
                ...students,
                ...req.body
            }
            return updatedStudents;
        }
        else{
            return students;
        }
    })

    fs.writeFileSync('./students.json',JSON.stringify(updatedStudents))
    res.send(updatedStudents)
})


rival.delete('/students/delete/:rollno',(req,res)=>{
    console.log(req.params)
 const   remainingStudents = students.filter((students)=>(students.rollno != req.params.rollno))
 fs.writeFileSync('./students.json',JSON.stringify(remainingStudents))
 res.send(remainingStudents)
})
rival.listen(5000)

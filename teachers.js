const { urlencoded } = require('express');
const express = require('express');
const techapp = express()

techapp.use(express.json())
techapp.use(express.urlencoded({extended:true}))


 const fs = require("fs")

// jsonData=fs.readFileSync('./teachers.json')
// console.log(jsonData)
// console.log('stage2')
// teachersDataFromFile = jsonData.toString()
//  const teachers = JSON.parse(teachersDataFromFile)
// console.log('stage3')


//applying promise 
function readFile(filename){
  console.log('stage-1')
  return new Promise((resolve,reject)=>{
const teachersdata = fs.readFile('./teachers.json',(err, data)=>{
   
    console.log('stage-2')
    if(err){
        reject('error in reading file')
    }
    else{
        
  const  teachersDataFromFile = data.toString()
   const teachers = JSON.parse(teachersDataFromFile) 

   resolve(teachers)

    }
})
})



 } 
 console.log('stage-3')
   let teachers = []
     async function  loadteachers(){ 
          teachers =await readFile('./teachers.json')
    console.log(teachers)
 }loadteachers();
 console.log('stage-4')

// console.log(fileDataPromise) //promise pending
// fileDataPromise.then((result)=>{
//   console.log(result)
// })

// .catch((err)=>{
//     console.log(err)
// })
// console.log('stage-4')

techapp.get('/',(req,res)=>{
    res.send(teachers)
})

techapp.get('/teachers',(req,res)=>{
    res.send(teachers)
})

techapp.get('/teachers/gender/:gender',(req,res)=>{
    const genderarray = teachers.filter((teacher)=>teacher.gender === req.params.gender)
    res.send(genderarray)
})

techapp.get('/teachers/search-by-yoe/:min/:max',(req,res)=>{
 const experiencearray = teachers.filter((teacher)=>(teacher.yoe >= req.params.min)&&(teacher.yoe<= req.params.max))
 res.send(experiencearray)
})

techapp.post('/teachers/create',(req,res)=>{
    console.log(req.body)
   const newTeachers = { id:teachers.length +1 , ...req.body}
     teachers.push(newTeachers)
    // fs.writeFileSync('./teachers.json',JSON.stringify(teachers))
    save(teachers)
    res.send(teachers)
})


techapp.put('/teachers/update/:id',(req,res)=>{
   const updatedTeacher = teachers.map((teachers)=>{
          if(teachers.id == req.params.id){
            const updatedTeacher={
                ...teachers,
                ...req.body
            }
            return updatedTeacher;
          }else{
              return teachers;
          }
    })

    // fs.writeFileSync('teachers.json',JSON.stringify(updatedTeacher))
    save(updatedTeacher)
    res.send(updatedTeacher)
})

techapp.delete('/teachers/delete/:id',(req,res)=>{
 const remainingteachers =   teachers.filter((teach)=>(teach.id != req.params.id))
    // fs.writeFileSync('./teachers.json',JSON.stringify(remainingteachers))
    save(remainingteachers)
    res.send(remainingteachers)
})


function save(changes){
    fs.writeFileSync('./teachers.json',JSON.stringify(changes))
}


techapp.listen(5500)
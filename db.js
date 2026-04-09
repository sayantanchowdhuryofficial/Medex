const DB={

init(){
if(!localStorage.getItem("medex_db")){
localStorage.setItem("medex_db",JSON.stringify({
patients:[],
doctors:[],
appointments:[],
logs:[]
}))
}
},

get(){
return JSON.parse(localStorage.getItem("medex_db"))
},

set(data){
localStorage.setItem("medex_db",JSON.stringify(data))
},

uid(){
return Date.now()+Math.floor(Math.random()*1000)
},

log(msg){
const db=this.get()
db.logs.push({
time:new Date().toLocaleString(),
msg
})
this.set(db)
},

addPatient(name,age){
const db=this.get()

db.patients.push({
id:this.uid(),
name,
age,
created:new Date().toLocaleString()
})

this.log("Patient added: "+name)
this.set(db)
},

deletePatient(id){
const db=this.get()
db.patients=db.patients.filter(p=>p.id!==id)
this.log("Patient deleted")
this.set(db)
},

addDoctor(name,spec){
const db=this.get()

db.doctors.push({
id:this.uid(),
name,
spec
})

this.log("Doctor added: "+name)
this.set(db)
},

getDoctors(){
return this.get().doctors
},

addAppointment(patient,doctor){
const db=this.get()

db.appointments.push({
id:this.uid(),
patient,
doctor,
time:new Date().toLocaleString()
})

this.log("Appointment: "+patient+" → "+doctor)
this.set(db)
},

getAppointments(){
return this.get().appointments
},

getPatients(){
return this.get().patients
},

getStats(){
const db=this.get()
return{
patients:db.patients.length,
doctors:db.doctors.length,
appointments:db.appointments.length
}
},

getLogs(){
return this.get().logs.slice(-10).reverse()
},

reset(){
localStorage.removeItem("medex_db")
this.init()
}

}

DB.init()

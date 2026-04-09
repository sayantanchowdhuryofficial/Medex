const AI={

respond(input){

const q=input.toLowerCase().trim()

if(!q) return "Ask something."

if(this.match(q,["hi","hello","hey"]))
return "Hello 👋 I am Medex AI. Ask me about patients, doctors, or health."

if(this.match(q,["who are you","what are you"]))
return "I am Medex AI assistant designed to help manage healthcare data."

if(this.match(q,["help"]))
return "You can ask about patients, doctors, appointments, or symptoms."

if(this.match(q,["how many patients","patient count"]))
return "Total patients: "+DB.getPatients().length

if(this.match(q,["how many doctors","doctor count"]))
return "Total doctors: "+DB.getDoctors().length

if(this.match(q,["appointments","appointment count"]))
return "Total appointments: "+DB.getAppointments().length

if(this.match(q,["list patients","show patients"]))
return this.listPatients()

if(this.match(q,["list doctors","show doctors"]))
return this.listDoctors()

if(this.match(q,["latest activity","logs"]))
return this.logs()

if(this.match(q,["fever","temperature"]))
return "Fever may indicate infection. Stay hydrated and consult doctor if needed."

if(this.match(q,["headache","migraine"]))
return "Headache may be due to stress or dehydration. Take rest."

if(this.match(q,["cold","cough"]))
return "Cold/cough common. If persistent, consult doctor."

if(q.includes("?"))
return "That’s a complex query. For accuracy, consult a medical professional."

return "Try asking about patients, doctors, appointments or symptoms."
},

match(q,arr){
return arr.some(w=>q.includes(w))
},

listPatients(){
const p=DB.getPatients()
if(p.length===0) return "No patients available."
return p.slice(0,5).map(x=>x.name+"("+x.age+")").join(", ")
},

listDoctors(){
const d=DB.getDoctors()
if(d.length===0) return "No doctors available."
return d.map(x=>x.name+"("+x.spec+")").join(", ")
},

logs(){
const logs=DB.getLogs()
if(logs.length===0) return "No activity yet."
return logs.map(l=>l.msg).join(" | ")
}

}

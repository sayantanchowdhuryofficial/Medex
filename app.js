const PASSWORD="1234"

function login(){
if(password.value===PASSWORD){
login.style.display="none"
app.classList.remove("hidden")
nav("dashboard")
}else alert("Wrong Access Key")
}

function nav(id){

document.getElementById("title").innerText=id.toUpperCase()

;["dashboard","patients","doctors","appointments","ai"].forEach(x=>{
document.getElementById(x).classList.add("hidden")
})

document.getElementById(id).classList.remove("hidden")

renderAll()
}

function addPatient(){
const name=pname.value.trim()
const age=page.value.trim()

if(!name||!age) return alert("Fill all fields")

DB.addPatient(name,age)

pname.value=""
page.value=""

renderPatients()
renderStats()
}

function deletePatient(id){
DB.deletePatient(id)
renderPatients()
renderStats()
}

function renderPatients(){
const list=DB.getPatients()

patientList.innerHTML=list.map(p=>`
<div class="card">
<b>${p.name}</b> (${p.age})
<button onclick="deletePatient(${p.id})">Delete</button>
</div>
`).join("")
}

function addDoctor(){
const name=dname.value.trim()
const spec=dspec.value.trim()

if(!name||!spec) return alert("Fill all fields")

DB.addDoctor(name,spec)

dname.value=""
dspec.value=""

renderDoctors()
renderStats()
loadDoctors()
}

function renderDoctors(){
const list=DB.getDoctors()

doctorList.innerHTML=list.map(d=>`
<div class="card">
<b>${d.name}</b> (${d.spec})
</div>
`).join("")
}

function loadDoctors(){
const list=DB.getDoctors()

ap_doctor.innerHTML=list.map(d=>`
<option>${d.name} (${d.spec})</option>
`).join("")
}

function addAppointment(){
const patient=ap_patient.value.trim()
const doctor=ap_doctor.value

if(!patient||!doctor) return alert("Fill all fields")

DB.addAppointment(patient,doctor)

ap_patient.value=""

renderAppointments()
renderStats()
}

function renderAppointments(){
const list=DB.getAppointments()

appointmentList.innerHTML=list.map(a=>`
<div class="card">
${a.patient} → ${a.doctor}
</div>
`).join("")
}

let chartInstance=null

function renderChart(){

const ctx=document.getElementById("chart")

const stats=DB.getStats()

if(chartInstance) chartInstance.destroy()

chartInstance=new Chart(ctx,{
type:"bar",
data:{
labels:["Patients","Doctors","Appointments"],
datasets:[{
label:"System Data",
data:[stats.patients,stats.doctors,stats.appointments]
}]
}
})
}

function renderStats(){
const stats=DB.getStats()

statPatients.innerText="Patients: "+stats.patients
statDoctors.innerText="Doctors: "+stats.doctors
statAppointments.innerText="Appointments: "+stats.appointments
}

function askAI(){
const q=question.value.trim()
if(!q) return

chat.innerHTML+=`
<p>🧑 ${q}</p>
<p>🤖 ${AI.respond(q)}</p>
`

chat.scrollTop=chat.scrollHeight
question.value=""
}

function resetSystem(){
if(confirm("Reset all data?")){
DB.reset()
location.reload()
}
}

function renderAll(){
renderPatients()
renderDoctors()
renderAppointments()
renderStats()
renderChart()
loadDoctors()
}



const PASSWORD = "1234";


function login(){
  const val = document.getElementById("password").value;

  if(val === PASSWORD){
    document.getElementById("login").style.display = "none";
    document.getElementById("app").classList.remove("hidden");
    nav("dashboard");
  } else {
    alert("Wrong Access Key");
  }
}


function nav(section){

  document.getElementById("title").innerText = section.toUpperCase();

  ["dashboard","patients","ai"].forEach(id=>{
    document.getElementById(id).classList.add("hidden");
  });

  document.getElementById(section).classList.remove("hidden");

  renderAll();
}



function addPatient(){
  const name = document.getElementById("pname").value;
  const age = document.getElementById("page").value;

  if(!name || !age) return alert("Enter all fields");

  DB.addPatient(name, age);

  document.getElementById("pname").value = "";
  document.getElementById("page").value = "";

  renderPatients();
}

function deletePatient(id){
  DB.deletePatient(id);
  renderPatients();
}



function renderPatients(){
  const list = DB.getPatients();

  const container = document.getElementById("patientList");

  container.innerHTML = list.map(p => `
    <div class="card">
      <b>${p.name}</b> (${p.age})
      <button onclick="deletePatient(${p.id})">Delete</button>
    </div>
  `).join("");
}



function renderStats(){

  const patients = DB.getPatients().length;
  const appointments = DB.getAppointments().length;

  document.getElementById("statPatients").innerText = "Patients: " + patients;
  document.getElementById("statAppointments").innerText = "Appointments: " + appointments;
}

let chartInstance = null;

function renderChart(){

  const ctx = document.getElementById("chart");

  const data = [
    DB.getPatients().length,
    DB.getAppointments().length
  ];

  if(chartInstance){
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx,{
    type:"bar",
    data:{
      labels:["Patients","Appointments"],
      datasets:[{
        label:"System Data",
        data:data
      }]
    }
  });
}



function askAI(){

  const input = document.getElementById("question");
  const chat = document.getElementById("chat");

  const q = input.value;

  if(!q) return;

  const res = AI.respond(q);

  chat.innerHTML += `
    <p>🧑 ${q}</p>
    <p>🤖 ${res}</p>
  `;

  chat.scrollTop = chat.scrollHeight;

  input.value = "";
}



function resetSystem(){
  if(confirm("Reset all data?")){
    DB.reset();
    location.reload();
  }
}


function renderAll(){
  renderPatients();
  renderStats();
  renderChart();
}

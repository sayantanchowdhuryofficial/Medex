const PASSWORD="1234";

// LOGIN
function login(){
  if(document.getElementById("pass").value===PASSWORD){
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    show('dashboard');
  } else alert("Wrong Password");
}

// NAV
function show(id){
  ["dashboard","patients","appointments","bot"].forEach(x=>{
    document.getElementById(x).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
  loadAll();
}

// PATIENT
function addPatient(){
  let d=JSON.parse(localStorage.getItem("patients")||"[]");
  d.push({
    name:document.getElementById("pname").value,
    age:document.getElementById("page").value
  });
  localStorage.setItem("patients",JSON.stringify(d));
  loadPatients();
}

function loadPatients(){
  let d=JSON.parse(localStorage.getItem("patients")||"[]");
  document.getElementById("plist").innerHTML=
    d.map(x=>`<p>${x.name} (${x.age})</p>`).join("");
}

// APPOINTMENT
function addAppointment(){
  let d=JSON.parse(localStorage.getItem("appointments")||"[]");
  d.push({
    p:document.getElementById("apname").value,
    d:document.getElementById("docname").value
  });
  localStorage.setItem("appointments",JSON.stringify(d));
  loadAppointments();
}

function loadAppointments(){
  let d=JSON.parse(localStorage.getItem("appointments")||"[]");
  document.getElementById("alist").innerHTML=
    d.map(x=>`<p>${x.p} → ${x.d}</p>`).join("");
}

// CHART
function loadChart(){
  let ctx=document.getElementById("chart");
  new Chart(ctx,{
    type:'bar',
    data:{
      labels:['Patients','Appointments'],
      datasets:[{
        label:'System Data',
        data:[
          JSON.parse(localStorage.getItem("patients")||"[]").length,
          JSON.parse(localStorage.getItem("appointments")||"[]").length
        ]
      }]
    }
  });
}

// AI BOT
function askBot(){
  let q=document.getElementById("q").value.toLowerCase();
  let chat=document.getElementById("chat");

  let ans="";

  if(q.includes("fever")) ans="Take rest, drink fluids, consult doctor.";
  else if(q.includes("headache")) ans="Stay hydrated and rest.";
  else if(q.includes("appointment")) ans="Go to appointment section.";
  else ans="I am Medex AI. Consult doctor for serious issues.";

  chat.innerHTML += `<p>🧑 ${q}</p><p>🤖 ${ans}</p>`;
}

// LOAD
function loadAll(){
  loadPatients();
  loadAppointments();
  loadChart();
}

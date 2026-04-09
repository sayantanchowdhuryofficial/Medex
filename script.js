const PASSWORD = "1234";

// LOGIN
function login(){
  if(document.getElementById("pass").value === PASSWORD){
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
  } else {
    alert("Wrong Password");
  }
}

// NAVIGATION
function showSection(id){
  ["patients","doctors","appointments","admin"].forEach(x=>{
    document.getElementById(x).classList.add("hidden");
  });
  document.getElementById(id).classList.remove("hidden");
  loadAll();
}

// PATIENT
function addPatient(){
  let data = JSON.parse(localStorage.getItem("patients")||"[]");
  data.push({
    name:document.getElementById("pname").value,
    age:document.getElementById("page").value
  });
  localStorage.setItem("patients",JSON.stringify(data));
  loadPatients();
}

function loadPatients(){
  let data = JSON.parse(localStorage.getItem("patients")||"[]");
  document.getElementById("plist").innerHTML =
    data.map(x=>`<p>${x.name} (${x.age})</p>`).join("");
}

// DOCTOR
function addDoctor(){
  let data = JSON.parse(localStorage.getItem("doctors")||"[]");
  data.push(document.getElementById("dname").value);
  localStorage.setItem("doctors",JSON.stringify(data));
  loadDoctors();
}

function loadDoctors(){
  let data = JSON.parse(localStorage.getItem("doctors")||"[]");
  document.getElementById("dlist").innerHTML =
    data.map(x=>`<p>${x}</p>`).join("");
}

// APPOINTMENT
function addAppointment(){
  let data = JSON.parse(localStorage.getItem("appointments")||"[]");
  data.push({
    p:document.getElementById("apname").value,
    d:document.getElementById("docname").value
  });
  localStorage.setItem("appointments",JSON.stringify(data));
  loadAppointments();
}

function loadAppointments(){
  let data = JSON.parse(localStorage.getItem("appointments")||"[]");
  document.getElementById("alist").innerHTML =
    data.map(x=>`<p>${x.p} → ${x.d}</p>`).join("");
}

// STATS
function loadStats(){
  document.getElementById("stats").innerHTML = `
  Patients: ${JSON.parse(localStorage.getItem("patients")||"[]").length}<br>
  Doctors: ${JSON.parse(localStorage.getItem("doctors")||"[]").length}<br>
  Appointments: ${JSON.parse(localStorage.getItem("appointments")||"[]").length}`;
}

// SEARCH
function searchPatient(){
  let data = JSON.parse(localStorage.getItem("patients")||"[]");
  let res = data.filter(x =>
    x.name.toLowerCase().includes(
      document.getElementById("search").value.toLowerCase()
    )
  );
  document.getElementById("result").innerHTML =
    res.map(x=>x.name).join(", ");
}

// PRESCRIPTION
function savePrescription(){
  localStorage.setItem("prescription",
    document.getElementById("pres").value);
  alert("Prescription Saved");
}

// LOAD ALL
function loadAll(){
  loadPatients();
  loadDoctors();
  loadAppointments();
  loadStats();
}

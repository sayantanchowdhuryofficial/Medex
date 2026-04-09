const PASSWORD="1234";
    document.getElementById("login").classList.add("hidden");
    document.getElementById("app").classList.remove("hidden");
    show('dashboard');
  } else alert("Wrong Password");
}

function show(id){
  ["dashboard","patients","bot"].forEach(x=>{
    document.getElementById(x).classList.add("hidden")
  })
  document.getElementById(id).classList.remove("hidden");
  document.getElementById("title").innerText=id.toUpperCase();
  loadAll();
}

function addPatient(){
  let d=JSON.parse(localStorage.getItem("patients")||"[]");
  d.push({name:pname.value,age:page.value});
  localStorage.setItem("patients",JSON.stringify(d));
  loadPatients();
}

function deletePatient(i){
  let d=JSON.parse(localStorage.getItem("patients")||"[]");
  d.splice(i,1);
  localStorage.setItem("patients",JSON.stringify(d));
  loadPatients();
}

function loadPatients(){
  let d=JSON.parse(localStorage.getItem("patients")||"[]");
  plist.innerHTML=d.map((x,i)=>`<div>${x.name} (${x.age}) <button onclick="deletePatient(${i})">X</button></div>`).join("");
}

function loadStats(){
  let p=JSON.parse(localStorage.getItem("patients")||"[]").length;
  pcount.innerText="Patients: "+p;
  acount.innerText="Records Active";
}

function loadChart(){
  let ctx=document.getElementById("chart");
  new Chart(ctx,{type:'bar',data:{labels:['Patients'],datasets:[{data:[JSON.parse(localStorage.getItem("patients")||"[]").length]}]}});
}

function askBot(){
  let q=document.getElementById("q").value.toLowerCase();
  let chat=document.getElementById("chat");

  let ans="";

  if(q.includes("fever")) ans="Possible viral. Stay hydrated.";
  else if(q.includes("pain")) ans="Rest and consult doctor.";
  else if(q.includes("hello")) ans="Hello, I am Medex AI.";
  else ans="I recommend professional consultation.";

  chat.innerHTML+=`<p>🧑 ${q}</p><p>🤖 ${ans}</p>`;
}

function clearData(){
  localStorage.clear();
  location.reload();
}

function loadAll(){
  loadPatients();
  loadStats();
  loadChart();
}

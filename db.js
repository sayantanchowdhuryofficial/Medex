

const DB = {


  init(){
    if(!localStorage.getItem("medex_db")){
      const base = {
        patients: [],
        appointments: [],
        logs: []
      };
      localStorage.setItem("medex_db", JSON.stringify(base));
    }
  },


  get(){
    return JSON.parse(localStorage.getItem("medex_db"));
  },

 
  set(data){
    localStorage.setItem("medex_db", JSON.stringify(data));
  },


  addPatient(name, age){
    const db = this.get();

    const patient = {
      id: Date.now(),
      name,
      age,
      created: new Date().toLocaleString()
    };

    db.patients.push(patient);
    db.logs.push(`Patient added: ${name}`);

    this.set(db);
  },

 
  deletePatient(id){
    const db = this.get();

    db.patients = db.patients.filter(p => p.id !== id);
    db.logs.push(`Patient deleted`);

    this.set(db);
  },


  getPatients(){
    return this.get().patients;
  },

  
  addAppointment(patient, doctor){
    const db = this.get();

    db.appointments.push({
      id: Date.now(),
      patient,
      doctor,
      time: new Date().toLocaleString()
    });

    db.logs.push(`Appointment booked for ${patient}`);

    this.set(db);
  },

    
  getAppointments(){
    return this.get().appointments;
  },

  reset(){
    localStorage.removeItem("medex_db");
    this.init();
  }

};


DB.init();

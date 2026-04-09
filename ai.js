

const AI = {

  respond(input){

    const q = input.toLowerCase();

    
    if(this.match(q, ["hello","hi","hey"])) 
      return "Hello 👋 I am Medex AI. How can I help you?";

    if(this.match(q, ["fever","temperature"]))
      return "Fever detected 🤒. Stay hydrated, take rest, and consult a doctor if it persists.";

    if(this.match(q, ["headache","migraine"]))
      return "Headache may be due to stress or dehydration. Drink water and rest.";

    if(this.match(q, ["covid","corona"]))
      return "If symptoms match COVID-19, please isolate and take a medical test.";

    if(this.match(q, ["appointment","book"]))
      return "To book an appointment, go to the Appointments section.";

    if(this.match(q, ["patient","list"]))
      return this.patientSummary();

    if(this.match(q, ["help","what can you do"]))
      return "I can help with symptoms, patient data, and system guidance.";

    
    if(q.includes("how many patients")){
      return `There are currently ${DB.getPatients().length} patients in the system.`;
    }

   
    return this.smartFallback(q);
  },

 
  match(q, keywords){
    return keywords.some(word => q.includes(word));
  },

  
  patientSummary(){
    const patients = DB.getPatients();

    if(patients.length === 0) return "No patients found.";

    return patients.slice(0,5)
      .map(p => `${p.name} (${p.age})`)
      .join(", ");
  },

 
  smartFallback(q){

    if(q.length < 3) return "Please ask something meaningful.";

    if(q.includes("?"))
      return "That's an interesting question. I recommend consulting a doctor for accurate advice.";

    return "I am still learning 🤖. Try asking about symptoms, patients, or appointments.";
  }

};

// this is just a peace of code to fix the last part of the code:
// document.getElementById('Demographics-page').style.display = 'none';
// document.getElementById('welcome-page').style.display = 'none';
// document.getElementById('symptoms-exam-page').style.display = 'none';
// document.getElementById('investigation-page').style.display = 'block';
// until here


/////////////////////// Demographics and Past Medical History ///////////////////////////////

//Next button
document.getElementById('demoToSymp').addEventListener('click', function () {
    if (filled(1)) {
        document.getElementById('Demographics-page').style.display = 'none';
        document.getElementById('welcome-page').style.display = 'none';
        document.getElementById('symptoms-exam-page').style.display = 'block';

        var now = new Date();
        var year = now.getFullYear();
        var month = ('0' + (now.getMonth() + 1)).slice(-2);
        var day = ('0' + now.getDate()).slice(-2);
        var hours = ('0' + now.getHours()).slice(-2);
        var minutes = ('0' + now.getMinutes()).slice(-2);
        var seconds = ('0' + now.getSeconds()).slice(-2);
        var formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        document.getElementById('date-time').value = formattedDateTime;
        
    } else {
        alert("Please Fill Out All The Items");
    }
});

// Stroke switch
document.getElementById('stroke-yes').addEventListener('click', function() {
    document.getElementById('stroke-date').style.display = 'block';
    document.getElementById('stroke-date').style.removeProperty("display");
});
document.getElementById('stroke-na').addEventListener('click', function() {
    document.getElementById('stroke-date').style.display = 'none';
});
document.getElementById('stroke-no').addEventListener('click', function() {
    document.getElementById('stroke-date').style.display = 'none';
});


document.getElementById('age').addEventListener('input', function() {
    if (this.value < 1 || this.value>120) {
      this.value = '';
    }
});


//////////////////////////// Symptoms and Exam //////////////////////////////

document.getElementById('sympToInvest').addEventListener('click', function () {
    if (filled(2)) {
        document.getElementById('symptoms-exam-page').style.display = 'none';
        document.getElementById('investigation-page').style.display = 'block';
    } else {
        alert("Please Fill Out All The Items");
    }
});

document.getElementById('sympToDemo').addEventListener('click', function() {
    document.getElementById('Demographics-page').style.display = 'block';
    document.getElementById('symptoms-exam-page').style.display = 'none';
});


document.getElementById('Days').addEventListener('input', function() {
    if (this.value < 0 || this.value > 30) {
      this.value = '';
    }
});

document.getElementById('Hours').addEventListener('input', function() {
    if (this.value < 0 || this.value > 23) {
      this.value = '';
    }
});

document.getElementById('Minutes').addEventListener('input', function() {
    if (this.value < 0 || this.value > 59) {
      this.value = '';
    }
});


///////////////////////////////// Investigation and Imaging ////////////////////////

document.getElementById('investToSymp').addEventListener('click', function() {
    document.getElementById('symptoms-exam-page').style.display = 'block';
    document.getElementById('investigation-page').style.display = 'none';
});

// CT or MRI head
document.getElementById('ct-head-yes').addEventListener('click', function() {
        document.getElementById('divInfraction').style.removeProperty("display");
        document.getElementById('divHemorrhage').style.removeProperty("display");
        document.getElementById('div-hemmorrhage-side').style.removeProperty("display");
        document.getElementById('div-infraction-side').style.removeProperty("display");
});
document.getElementById('ct-head-no').addEventListener('click', function() {
    document.getElementById('divInfraction').style.display = 'none';
    document.getElementById('divHemorrhage').style.display = 'none';
    document.getElementById('div-hemmorrhage-side').style.display = 'none';
    document.getElementById('div-infraction-side').style.display = 'none';
});

// Infraction
document.getElementById('infraction-no').addEventListener('click', function() {
    document.getElementById('div-infraction-side').style.display = 'none';
});
document.getElementById('infraction-yes').addEventListener('click', function() {
    document.getElementById('div-infraction-side').style.removeProperty("display");
});

// Hemorrhage
document.getElementById('hemorrhage-no').addEventListener('click', function() {
    document.getElementById('div-hemmorrhage-side').style.display = 'none';
});
document.getElementById('hemorrhage-yes').addEventListener('click', function() {
    document.getElementById('div-hemmorrhage-side').style.removeProperty("display");
});

//CTA-Carotid
document.getElementById('cta-no').addEventListener('click', function() {
    document.getElementById('div-carotid-side').style.display = 'none';
});
document.getElementById('cta-yes').addEventListener('click', function() {
    document.getElementById('div-carotid-side').style.removeProperty("display");
});



function getInfo(path) {
    const form = document.getElementById(path);
    const formData = new FormData(form);
    const patientInfo = {};
  
    formData.forEach((value, key) => {
      // If the key already exists, it's a group of radio buttons, append the value to an array
      if (patientInfo[key]) {
        if (!Array.isArray(patientInfo[key])) {
          patientInfo[key] = [patientInfo[key]];
        }
        patientInfo[key].push(value);
      } else {
        patientInfo[key] = value;
      }
    });
  
    // Display the collected information
    // alert(JSON.stringify(patientInfo, null, 2));
  
    // You can also process this information as needed
    return patientInfo;
  }
  
  
function filled(formNumber) {
    if (formNumber === 1) {
        temp = getInfo("patient-info-form");
        if (Object.keys(temp).length != 11 || temp['age'] == '') {
            return false;
        }
    } else if (formNumber === 2) {
        temp = getInfo("symptoms-exam-form");
        if ( temp.Days == '' || temp.Hours == '' || temp.Minutes == '') {
            return false;
        }
    } else if (formNumber === 3) {
        temp = getInfo("investigation-imaging-form");
    }
    return true
}

document.getElementById('finish-button').addEventListener('click', function () {

    demographicsData = getInfo("patient-info-form");
    symptomsData = getInfo("symptoms-exam-form");
    investigationData = getInfo("investigation-imaging-form");

    comments = {};
    prioList = [];

    // We add the rules here
    comments['Resolution'] = "";
    if (symptomsData['Resolution'] == 'None') {
        comments['Resolution'] = "Neurology consult is required";
        prioList.push("Neurology");
    }

    comments['Hemorrhage'] = "";
    if (investigationData['Hemorrhage']=="Yes") {
        comments['Hemorrhage'] = "Neurology consult is required";
        prioList.push("Neurology");
    }

    comments['Arrhythmia'] = "";
    if (demographicsData['Arrhythmia']=="Yes") {
        comments['Arrhythmia'] = "Cardiology consult is required";
        prioList.push("Cardiology");
    }

    comments['Weakness'] = "";
    if (symptomsData['Weakness']=="Yes") {
        comments['Weakness'] = "Vascular surgery consult is required";
        prioList.push("Vascular");
    }

    comments['Facial'] = "";
    if (symptomsData['Facial']=="Yes") {
        comments['Facial'] = "Vascular surgery consult is required";
        prioList.push("Vascular");
    }

    comments['CTA'] = "";
    if (investigationData['CTA']=="Yes") {
        comments['CTA'] = "Vascular surgery consult is required";
        prioList.push("Vascular");
    }

    comments['ECG'] = "";
    if (investigationData['ECG']=="Yes") {
        comments['ECG'] = "Cardiology surgery consult is required";
        prioList.push("Cardiology");
    }

    comments['message1'] = "";
    if (investigationData['CTA'] == "Yes" && investigationData['Infraction'] == "Yes" && investigationData['ECG'] == "Yes") { 
        comments['message1'] = "(CTA-Carotid & Infraction & ECG Atrial Fibrillation) -> Vascular surgery consult is required";
        prioList.push("Vascular");
    }

    comments['message2'] = "";
    if (investigationData['CTA'] == "Yes" && investigationData['ECG'] == "Yes") { 
        comments['message2'] = "(CTA-Carotid & ECG Atrial Fibrillation) -> Vascular surgery consult is required";
        prioList.push("Vascular");
    }

    comments['message3'] = "";
    if (investigationData['Infraction'] == "Yes" && investigationData['ECG'] == "Yes") { 
        comments['message3'] = "(Infraction & ECG Atrial Fibrillation) -> Cardiology consult is required";
        prioList.push("Cardiology");
    }


    prioComment = commenting(prioList);
    
    
    const summaryContent = `
        <h3>Demographics and Past Medical History</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                   
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Age</td>
                    <td>${demographicsData.age}</td>
                    
                </tr>
                <tr>
                    <td>Gender</td>
                    <td>${demographicsData.gender}</td>
                    
                </tr>
                <tr>
                    <td>Myocardial Infarction</td>
                    <td>${demographicsData.Myocardial}</td>
                    
                </tr>
                <tr>
                    <td>Arrhythmia</td>
                    <td>${demographicsData.Arrhythmia}</td>
                    
                </tr>
                <tr>
                    <td>History of Stroke or TIA</td>
                    <td>${demographicsData.Stroke}</td>
                    
                </tr>
                <tr>
                    <td>Date Of Stroke</td>
                    <td>${demographicsData["date-stroke"]}</td>
                    
                </tr>
                <tr>
                    <td>HTN</td>
                    <td>${demographicsData.HTN}</td>
                   
                </tr>
                <tr>
                    <td>DM</td>
                    <td>${demographicsData.DM}</td>
                  
                </tr>
                <tr>
                    <td>Smoking</td>
                    <td>${demographicsData.Smoking}</td>
                   
                </tr>
                <tr>
                    <td>Functional Status</td>
                    <td>${demographicsData.Functional}</td>
                  
                </tr>
                <tr>
                    <td>Code Status</td>
                    <td>${demographicsData.Status}</td>
                 
                </tr>
            </tbody>
        </table>
        <h3>Symptoms and Exam</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                   
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Onset of Symptoms</td>
                    <td>${symptomsData['date-time']}</td>
                  
                </tr>
                <tr>
                    <td>Weakness</td>
                    <td>${symptomsData.Weakness}</td>
                  
                </tr>
                <tr>
                    <td>Side of Weakness</td>
                    <td>${symptomsData.Side}</td>
                  
                </tr>
                <tr>
                    <td>Aphasia</td>
                    <td>${symptomsData.Aphasia}</td>
                   
                </tr>
                <tr>
                    <td>Facial Droop</td>
                    <td>${symptomsData.Facial}</td>
                  
                </tr>
                <tr>
                    <td>Visual Symptoms</td>
                    <td>${symptomsData.Visual}</td>
                   
                </tr>
                <tr>
                    <td>Duration of Symptoms</td>
                    <td>${symptomsData.Days} Days</td>
                   
                </tr>
                <tr>
                    <td>Resolution of Symptoms</td>
                    <td>${symptomsData.Resolution}</td>
                  
                </tr>
            </tbody>
        </table>
        <h3>Investigation and Imaging</h3>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th></th>
                    <th></th>
                    
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>CTA-Carotid</td>
                    <td>${investigationData.CTA}</td>
                    
                </tr>
                <tr>
                    <td>Side of Carotid Stenosis</td>
                    <td>${investigationData.Carotid_Stenosis_Side}</td>
                    
                </tr>
                <tr>
                    <td>CT-Head</td>
                    <td>${investigationData.CT}</td>
                    
                </tr>
                <tr>
                    <td>Infraction</td>
                    <td>${investigationData.Infraction}</td>
                    
                </tr>
                <tr>
                    <td>Side of Infarction</td>
                    <td>${investigationData.Infarction_Side}</td>
                    
                </tr>
                <tr>
                    <td>Hemorrhage</td>
                    <td>${investigationData.Hemorrhage}</td>
                </tr>
                <tr>
                    <td>Side of Hemorrhage</td>
                    <td>${investigationData.Hemorrhage_Side}</td>
                </tr>
                <tr>
                    <td>ECG Atrial Fibrillation</td>
                    <td>${investigationData.ECG}</td>
                </tr>
            </tbody>
        </table>
        <h3>Recommendations</h3>
        <p>Priority 1 : ${prioComment[1]}</p>
        <p>Priority 2 : ${prioComment[2]}</p>
        <p>Priority 3 : ${prioComment[3]}</p>
    `;

    document.getElementById('summary-content').innerHTML = summaryContent;

    document.getElementById('investigation-page').style.display = 'none';
    document.getElementById('summary-page').style.display = 'block';

    // Additional processing and triage logic here
});

function commenting(list){
    counter = 1;
    prioComment = {1:'N/A',2:'N/A',3:'N/A'};

    if(list.includes("Neurology")){
        prioComment[counter] = "Neurology consult is required";
        counter++;
    }

    if(list.includes("Vascular")){
        prioComment[counter] = "Vascular consult is required";
        counter++;
    }

    if(list.includes("Cardiology")){
        prioComment[counter] = "Cardiology consult is required";
    }
    return prioComment
}
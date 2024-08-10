// document.getElementById('welcomeToDemo').addEventListener('click', function () {
//     document.getElementById('welcome-page').style.display = 'none';
//     document.getElementById('Demographics-page').style.display = 'block';
// });

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

// document.getElementById('demoTowelcome').addEventListener('click', function() {
//     document.getElementById('welcome-page').style.display = 'block';
//     document.getElementById('Demographics-page').style.display = 'none';
// });

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

document.getElementById('investToSymp').addEventListener('click', function() {
    document.getElementById('symptoms-exam-page').style.display = 'block';
    document.getElementById('investigation-page').style.display = 'none';
});

document.getElementById('ct-head-no').addEventListener('click', function() {
        document.getElementById('divInfraction').style.display = 'none';
        document.getElementById('divHemorrhage').style.display = 'none';
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
        if (Object.keys(temp).length != 10 || temp['age'] == '') {
            return false;
        }
    } else if (formNumber === 2) {
        temp = getInfo("symptoms-exam-form");
        if (Object.keys(temp).length != 8 || temp["date-time"] == '' || temp['Days'] == '') {
            return false;
        }
    } else if (formNumber === 3) {
        temp = getInfo("investigation-imaging-form");
    }
    return true
}
  
document.getElementById('age').addEventListener('input', function() {
    if (this.value < 1 || this.value>120) {
      this.value = '';
    }
});
  
document.getElementById('Days').addEventListener('input', function() {
    if (this.value < 1 || this.value > 30) {
      this.value = '';
    }
});

document.getElementById('finish-button').addEventListener('click', function () {

    demographicsData = getInfo("patient-info-form");
    symptomsData = getInfo("symptoms-exam-form");
    investigationData = getInfo("investigation-imaging-form");

    comments = {}

    // We add the rules here
    comments['Resolution'] = "";
    if (symptomsData['Resolution'] == 'None') {
        comments['Resolution'] = "Neurology consult is mandated";
    }

    comments['Hemorrhage'] = "";
    if (investigationData['Hemorrhage']=="Yes") {
        comments['Hemorrhage'] = "Neurology consult is required as priority 1";
    }

    comments['Arrhythmia'] = "";
    if (demographicsData['Arrhythmia']=="Yes") {
        comments['Arrhythmia'] = "Cardiology consult is required";
    }

    comments['Weakness'] = "";
    if (symptomsData['Weakness']=="Yes") {
        comments['Weakness'] = "Vascular surgery consult is required";
    }

    comments['Facial'] = "";
    if (symptomsData['Facial']=="Yes") {
        comments['Facial'] = "Vascular surgery consult is required";
    }

    comments['CTA'] = "";
    if (investigationData['CTA']=="Yes") {
        comments['CTA'] = "Vascular surgery consult is required";
    }

    comments['ECG'] = "";
    if (investigationData['ECG']=="Yes") {
        comments['ECG'] = "Cardiology surgery consult is required";
    }

    comments['message1'] = "";
    if (investigationData['CTA'] == "Yes" && investigationData['Infraction'] == "Yes" && investigationData['ECG'] == "Yes") { 
        comments['message1'] = "(CTA-Carotid & Infraction & ECG Atrial Fibrillation) -> Vascular surgery consult is required";
    }

    comments['message2'] = "";
    if (investigationData['CTA'] == "Yes" && investigationData['ECG'] == "Yes") { 
        comments['message2'] = "(CTA-Carotid & ECG Atrial Fibrillation) -> Vascular surgery consult is required";
    }

    comments['message3'] = "";
    if (investigationData['Infraction'] == "Yes" && investigationData['ECG'] == "Yes") { 
        comments['message3'] = "(Infraction & ECG Atrial Fibrillation) -> Cardiology consult is required";
    }

    
    
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
                    <td>Stroke or TIA</td>
                    <td>${demographicsData.Stroke}</td>
                    
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
                    <td>Date/Time</td>
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
                    <td>Facial Drool</td>
                    <td>${symptomsData.Facial}</td>
                  
                </tr>
                <tr>
                    <td>Visual Symptoms</td>
                    <td>${symptomsData.Visual}</td>
                   
                </tr>
                <tr>
                    <td>Days of Symptoms</td>
                    <td>${symptomsData.Days}</td>
                   
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
                    <td>CT-Head</td>
                    <td>${investigationData.CT}</td>
                    
                </tr>
                <tr>
                    <td>Infraction</td>
                    <td>${investigationData.Infraction}</td>
                    
                </tr>
                <tr>
                    <td>Hemorrhage</td>
                    <td>${investigationData.Hemorrhage}</td>
                </tr>
                <tr>
                    <td>ECG Atrial Fibrillation</td>
                    <td>${investigationData.ECG}</td>
                </tr>
            </tbody>
        </table>
        <h3>Recommendations</h3>
        <p>${comments['message1']}</p>
        <p>${comments['message2']}</p>
    `;

    document.getElementById('summary-content').innerHTML = summaryContent;

    document.getElementById('investigation-page').style.display = 'none';
    document.getElementById('summary-page').style.display = 'block';

    // Additional processing and triage logic here
});
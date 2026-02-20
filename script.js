document.addEventListener("DOMContentLoaded", loadPatients);

const form = document.getElementById("patientForm");
const patientList = document.getElementById("patientList");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const disease = document.getElementById("disease").value;

    const patient = { name, age, disease };

    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.push(patient);

    localStorage.setItem("patients", JSON.stringify(patients));

    form.reset();
    loadPatients();
});

function loadPatients() {
    patientList.innerHTML = "";
    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    patients.forEach((patient, index) => {
        const row = `
            <tr>
                <td>${patient.name}</td>
                <td>${patient.age}</td>
                <td>${patient.disease}</td>
                <td>
                    <button class="delete-btn" onclick="deletePatient(${index})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
        patientList.innerHTML += row;
    });
}

function deletePatient(index) {
    let patients = JSON.parse(localStorage.getItem("patients")) || [];
    patients.splice(index, 1);
    localStorage.setItem("patients", JSON.stringify(patients));
    loadPatients();
}

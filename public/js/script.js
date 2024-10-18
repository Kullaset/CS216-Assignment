document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');

    if (passwordField.type === 'password') {
        passwordField.type = 'text'; 
        eyeIcon.classList.remove('ri-eye-off-fill'); 
        eyeIcon.classList.add('ri-eye-fill'); 
    } else {
        passwordField.type = 'password'; 
        eyeIcon.classList.remove('ri-eye-fill'); 
        eyeIcon.classList.add('ri-eye-off-fill'); 
    }
});


function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value; 
    const role = document.getElementById('role').value; 

   
   document.getElementById('usernameError').innerText = '';
   document.getElementById('passwordError').innerText = '';
   document.getElementById('roleError').innerText = ''; 

   let isValid = true; 

   if (!username) {
       document.getElementById('usernameError').innerText = "Please enter your username."; 
       isValid = false; 
   }

   if (!password) {
       document.getElementById('passwordError').innerText = "Please enter your password."; 
       isValid = false; 
   }

   if (!role) {
       document.getElementById('roleError').innerText = "Please select your role."; 
       isValid = false; 
   }

   if (!isValid) {
       return; 
   }

   
   console.log("Logging in with:", username, password, role);
   




    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key' : 'TU067e7e038bb745d249ccaf7f433cc76127de376e1e8c88764b762fdf64c93ad859015597850cca41060d213dceecb516'
        },
        body: JSON.stringify({ "UserName" : username, "PassWord" : password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            if (data.type === "student") {
                document.getElementById('message').innerHTML = `
                    <strong>Status:</strong> ${data.message}<br>
                    <strong>Type:</strong> ${data.type}<br>
                    <strong>Username:</strong> ${data.username}<br>
                    <strong>Display Name (TH):</strong> ${data.displayname_th}<br>
                    <strong>Display Name (EN):</strong> ${data.displayname_en}<br>
                    <strong>Email:</strong> ${data.email}<br>
                    <strong>Department:</strong> ${data.department}<br>
                    <strong>Faculty:</strong> ${data.faculty}<br>
                    <strong>Student Status:</strong> ${data.tu_status}
                `;
            } else if (data.type === "employee") {
                document.getElementById('message').innerHTML = `
                    <strong>Status:</strong> ${data.message}<br>
                    <strong>Type:</strong> ${data.type}<br>
                    <strong>Username:</strong> ${data.username}<br>
                    <strong>Display Name (TH):</strong> ${data.displayname_th}<br>
                    <strong>Display Name (EN):</strong> ${data.displayname_en}<br>
                    <strong>Email:</strong> ${data.email}<br>
                    <strong>Department:</strong> ${data.department}<br>
                    <strong>Organization:</strong> ${data.organization}<br>
                    <strong>Work Status:</strong> ${data.StatusWork === "1" ? "Active" : "Not Active"}<br>
                    <strong>Employee Status:</strong> ${data.StatusEmp}
                `;
            }
        } else {
            document.getElementById('message').innerHTML = `<strong>Error:</strong> ${data.message}`;
        }
    })
    .catch(error => console.error('Error:', error));
}







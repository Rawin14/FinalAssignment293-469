function togglePasswordVisibility() {
    var passwordField = document.getElementById("password");
    if (passwordField.type === "password") {
      passwordField.type = "text";
    } else {
      passwordField.type = "password";
    }
  }

//   function requestCaptcha() {
//     var captchaVerified = confirm("Please confirm you are not a robot.");
//     if (!captchaVerified) {
//       document.getElementById("captchaAlert").style.display = "block";
//     } else {
//       document.getElementById("captchaAlert").style.display = "none";
//     }
//   }

//   function validateLogin() {
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     var captchaAlert = document.getElementById("captchaAlert").style.display;

//     if (username === "" || password === "") {
//       alert("Please fill out all fields.");
//       return false;
//     }

//     if (captchaAlert === "block") {
//       alert("Please verify the CAPTCHA.");
//       return false;
//     }

//     // var deviceRecognized = confirm("Is this a recognized device?");
//     // if (!deviceRecognized) {
//     //   alert("New device detected. Please verify your login via email.");
//     // }

//     return true;
//   }

const token = document.cookie.split('; ').find(row => row.startsWith('token='));

console.log(token);

if (token) {
  // If token exists, show the profile dropdown and hide login/register
  document.getElementById('profile-link').style.display = 'block';
  document.getElementById('login-register').style.display = 'none';
} else {
  // If no token, show login and register links
  document.getElementById('profile-link').style.display = 'none';
  document.getElementById('login-register').style.display = 'block';
}

 // Check if user is logged in by checking for the token
 document.querySelector('.dropdown-toggle').addEventListener('click', function(event) {
  event.preventDefault();  // Prevent default link behavior
  const dropdownMenu = this.nextElementSibling;  // Find the dropdown menu
  dropdownMenu.classList.toggle('show');  // Toggle the visibility of the dropdown
});
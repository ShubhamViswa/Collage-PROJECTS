function register() {
  let user = {
    name: name.value,
    email: email.value,
    password: password.value
  };

  localStorage.setItem("user", JSON.stringify(user));
  alert("Registered successfully!");
  window.location.href = "index.html";
}

function login() {
  let savedUser = JSON.parse(localStorage.getItem("user"));

  if(email.value === savedUser.email && password.value === savedUser.password){
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials");
  }
}

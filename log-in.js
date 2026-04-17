document.getElementById("sign_in_btn").addEventListener("click", function () {
  // get_input_number
  const user_name = document.getElementById("username_input").value;
  const password = document.getElementById("password_input").value;
  if (user_name === "admin" && password === "admin123") {
    alert("login success");
    // window.location.replace("\home.html");
    window.location.assign("\home.html");
  }
  else{
    alert("login failed");
    return;
  }
});

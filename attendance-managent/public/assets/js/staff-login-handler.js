$(document).ready(() => {
  console.log("staff login handler loaded")
  let loginForm = $("#staff-login-form")

  loginForm.on("submit", function (e) {
    e.preventDefault()
    let formData = new FormData($(this)[0])

    let emailId = formData.get("email")
    let password = formData.get("password")

    if (emailId == "" || password == "")
      return alert("Email or password invalid")
  })
})

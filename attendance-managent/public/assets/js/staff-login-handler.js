window.addEventListener("DOMContentLoaded", () => {
  console.log("staff login handler loaded")

  let loginForm = document.querySelector("#staff-login-form")

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault()

    let userName = document.querySelector("#username").value
    let password = document.querySelector("#password").value

    if (!userName || !password) return showInvalidLoginDetails()

    getStaffLogin(userName, password)
  })

  async function getStaffLogin(userName, password) {
    let _response = await fetch("/staff/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    })

    let _data = await _response.json()

    if (!_data.success) return showInvalidLoginDetails()
    console.log(_data, '---')

    if (_data.success) {
      window.location.assign("/staff/dashboard")
    }
  }

  function showInvalidLoginDetails() {
    showEl([".invalid-login-message"])
    setTimeout(() => hideEl([".invalid-login-message"]), 1400)
  }
})

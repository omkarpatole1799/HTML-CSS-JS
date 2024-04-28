window.addEventListener("DOMContentLoaded", () => {
  console.log("staff login handler loaded")

  let loginForm = document.querySelector("#staff-login-form")
  let loginType
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault()

    let userName = document.querySelector("#username").value
    let password = document.querySelector("#password").value
    let isAdminType = document.querySelector("#admin-login").checked
    let isStudentType = document.querySelector("#std-login").checked

    loginType = isAdminType ? "admin" : isStudentType ? "student" : null

    if (!userName || !password || !loginType) return showInvalidLoginDetails()

    getStaffLogin(userName, password, loginType)
  })

  async function getStaffLogin(userName, password, loginType) {
    let _response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password, loginType }),
    })

    let _data = await _response.json()

    if (!_data.success) return showInvalidLoginDetails()
    console.log(_data, "---")

    if (_data.success) {
      if (loginType == "admin") {
        window.location.assign("/staff/dashboard")
      }
      if (loginType == "student") {
        window.location.assign("/student/dashboard")
      }
    }
  }

  function showInvalidLoginDetails() {
    showEl([".invalid-login-message"])
    setTimeout(() => hideEl([".invalid-login-message"]), 1400)
  }
})

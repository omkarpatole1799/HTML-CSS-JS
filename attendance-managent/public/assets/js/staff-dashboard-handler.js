$(document).ready(() => {
  console.log("staff-dashboard-handler.js loaded")

  let addStudentForm = $("#add-student-form")

  addStudentForm.on("submit", function (e) {
    e.preventDefault()

    let formData = new FormData($(this)[0])

    saveStudentData(formData)
  })

  async function saveStudentData(formData) {
    await fetch("/staff/save-student", {
      method: "POST",
      body: formData,
    })
  }
})

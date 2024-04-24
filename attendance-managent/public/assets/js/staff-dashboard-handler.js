window.addEventListener("DOMContentLoaded", () => {
  console.log("staff-dashboard-handler.js loaded")
  getStudentsList()

  let addStudentForm = document.getElementById("add-student-form")

  addStudentForm.addEventListener("submit", function (e) {
    e.preventDefault()

    let studentData = {}

    let s_name = document.querySelector(".student-name")
    let s_mobile = document.querySelector(".mobile-no")
    let s_department = document.querySelector(".department")
    let s_year = document.querySelector(".year")

    studentData["s_name"] = s_name.value
    studentData["s_mobile"] = s_mobile.value
    studentData["s_department"] = s_department.value
    studentData["s_year"] = s_year.value
    saveStudentData(studentData)
  })

  async function saveStudentData(formData) {
    let _response = await fetch("/staff/save-student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    let _data = await _response.json()

    if (_data.success) {
      alert(_data.message)
      addStudentForm.reset()

      getStudentsList()
    }
  }

  async function getStudentsList() {
    let _response = await fetch("/staff/students-list")
    let _data = await _response.json()

    console.log(_data, "--")
    if (_data.success) {
      printStudentsTable(_data.data)
    }
  }

  function printStudentsTable(list) {
    console.log("print students list")
    let studentListTbody = document.querySelector(".student-list-tbody")

    let _html = list
      .map((el, i) => {
        return `
          <tr class='text-center'>
            <td>${i + 1}</td>
            <td>${el.id}</td>
            <td>${el.s_name}</td>
            <td>${el.s_mobile}</td>
            <td>${el.s_department}</td>
            <td>${el.s_year}</td>
            <td>
              <button class='btn btn-outline-danger btn-sm'>x</button>
            </td>
          </tr>
      `
      })
      .join(" ")
    studentListTbody.innerHTML = _html
  }
})

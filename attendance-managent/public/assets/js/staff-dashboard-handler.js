window.addEventListener("DOMContentLoaded", () => {
  // hideEl([".students-list, .add-std-form", ".add-sub-form"])
  console.log("staff-dashboard-handler.js loaded")
  getStudentsList()

  let studentsListAll
  let deleteStudBtn
  let addStudentForm = document.getElementById("add-student-form")

  let addStdBtn = document.querySelector(".add-std-btn")
  let stdListBtn = document.querySelector(".std-list-btn")
  let addSubBtn = document.querySelector(".add-sub-btn")

  stdListBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".students-list"])
    hideEl([".add-std-form", ".add-sub-form-container"])
  })

  addStdBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".add-std-form"])
    hideEl([".students-list", ".add-sub-form-container"])
  })

  addSubBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".add-sub-form-container"])
    hideEl([".add-std-form", ".students-list"])
  })

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
    if (_data.success) {
      studentsListAll = _data.data
      printStudentsTable(studentsListAll)
    }
  }

  function printStudentsTable(list) {
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
              <button class='btn btn-outline-danger btn-sm delete-student-btn' data-id='${
                el.id
              }'>x</button>
            </td>
          </tr>
      `
      })
      .join(" ")
    studentListTbody.innerHTML = _html
    refresh()
  }

  function refresh() {
    deleteStudBtn = document.querySelectorAll(".delete-student-btn")
    deleteStudent()
  }

  function deleteStudent() {
    deleteStudBtn.forEach(btn => {
      btn.addEventListener("click", async function (e) {
        e.preventDefault(0)
        let deleteId = this.getAttribute("data-id")
        if (!confirm(`Do you want to delete student id = ${deleteId}`))
          return false

        if (!deleteId) return alert("Invalid student ID")

        let _response = await fetch("/staff/delete-student", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ deleteId }),
        })
        let _data = await _response.json()

        if (_data.success) {
          alert(_data.message)
          getStudentsList()
        }
      })
    })
  }

  // add subject submit

  class AddSubject {
    constructor() {
      let addSubForm = document.querySelector("#add-sub-form")
      this._printSubjectList()
      addSubForm.addEventListener("submit", this._addSubject.bind(this))
    }

    async _addSubject(e) {
      e.preventDefault()
      let formData = {
        sub_name: document.querySelector(".sub-name").value,
        sub_year: document.querySelector(".sub-year").value,
        sub_department: document.querySelector(".sub-department").value,
      }

      if (!formData.sub_name || !formData.sub_year || !formData.sub_department)
        return alert("Please enter valid inputs")

      let _response = await fetch("/staff/add-subject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData }),
      })

      let _data = await _response.json()
      if (_data.success) {
        this._printSubjectList()
        return alert(_data.message)
      } else return alert("Something went wrong")
    }

    async _printSubjectList() {
      let _response = await fetch("/staff/subject-list")
      let _data = await _response.json()

      if (_data.data.length == 0) return

      let subListTbody = document.querySelector(".sub-list-tbody")
      let _html = _data.data.map(el => {
        return `
          <tr>
            <th>Sr No</th>
            <th>${el.sub_name}</th>
            <th>${el.sub_department}</th>
            <th>${el.sub_year}</th>
            <th>
              <button class='btn btn-danger btn-sm'>x</button>
            </th>
          </tr>
        `
      }).join(' ')
      subListTbody.innerHTML = _html
    }
  }

  const addSubject = new AddSubject()
})

window.addEventListener("DOMContentLoaded", () => {
  console.log("staff-dashboard-handler.js loaded")
  hideEl([
    ".students-list",
    ".add-sub-form-container",
    ".sub-list-container",
    ".add-std-form",
  ])
  ;(function setAdminName() {
    document.querySelector(".admin-name").innerText = "(" + loggedInYear + ")"
  })()

  getStudentsList()

  let subYear = document.querySelector(".sub-year")
  let year = document.querySelector(".year")

  year.value = subYear.value = loggedInYear

  let studentsListAll
  let deleteStudBtn
  let addStudentForm = document.getElementById("add-student-form")

  let stdListBtn = document.querySelector(".std-list-btn")
  let addStdBtn = document.querySelector(".add-std-btn")
  let addSubBtn = document.querySelector(".add-sub-btn")
  let subListBtn = document.querySelector(".sub-list-btn")
  let addAttBtn = document.querySelector(".add-att-btn")

  stdListBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".students-list"])
    hideEl([
      ".add-std-form",
      ".add-sub-form-container",
      ".add-att-container",
      ".sub-list-container",
    ])
  })

  addStdBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".add-std-form"])
    hideEl([
      ".students-list",
      ".add-sub-form-container",
      ".add-att-container",
      ".sub-list-container",
    ])
  })

  subListBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".sub-list-container"])
    hideEl([
      ".add-std-form",
      ".students-list",
      ".add-att-container",
      ".add-sub-form-container",
    ])
  })
  addSubBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".add-sub-form-container"])
    hideEl([
      ".add-std-form",
      ".students-list",
      ".add-att-container",
      ".sub-list-container",
    ])
  })

  addAttBtn.addEventListener("click", e => {
    e.preventDefault()
    showEl([".add-att-container"])
    hideEl([
      ".add-sub-form-container",
      ".add-std-form",
      ".students-list",
      ".sub-list-container",
    ])
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

  async function getStudentsList(department = "") {
    let _response = await fetch(
      `/staff/students-list?department=${department}&year=${loggedInYear}`
    )
    let _data = await _response.json()
    if (_data.success) {
      studentsListAll = _data.data
      printStudentsTable(studentsListAll)
    }
  }

  function printStudentsTable(list) {
    console.log(list, "students list")
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

      console.log(_data.data)
      let subListTbody = document.querySelector(".sub-list-tbody")
      let _html = _data.data
        .map(el => {
          return `
          <tr>
            <td>Sr No</td>
            <td>${el.sub_name}</td>
            <td>${el.sub_department}</td>
            <td>${el.sub_year}</td>
            <td>
              <button class='btn btn-danger btn-sm delete-sub-btn' data-id="${el.id}">x</button>
            </td>
          </tr>
        `
        })
        .join(" ")
      subListTbody.innerHTML = _html

      this._deleteSubjectBtnActivate()
    }
    _deleteSubjectBtnActivate() {
      document.querySelectorAll(".delete-sub-btn").forEach(el => {
        el.addEventListener("click", async function () {
          let deleteId = this.getAttribute("data-id")

          let _response = await fetch("/staff/delete-subject", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ deleteId }),
          })

          let _data = await _response.json()
          console.log(_data)
          if (_data.success) {
            window.location.reload()
          }
        })
      })
    }
  }

  const addSubject = new AddSubject()

  // add attendance

  let attDept = document.querySelector("#att-dept")
  let searchStdBtn = document.querySelector("#search-std-btn")
  let attSub = document.querySelector("#att-sub")
  let attDate = document.querySelector("#att-date")

  attDept.addEventListener("change", function () {
    getSubjects(this.value)
  })

  async function getSubjects(department) {
    let _response = await fetch(
      `/staff/subject-list?department=${department}&year=${loggedInYear}`
    )
    let _data = await _response.json()
    console.log(_data)
    if (_data.data.length == 0) {
      attSub.innerHTML = `<option value=''>-- Select Subject--</option>`
      return
    }
    if (_data.success) {
      let _html = _data.data.map(el => `<option>${el.sub_name}</option>`)
      attSub.innerHTML =
        `<option value="">-- Select Subject --</option>` + _html
    }
  }

  searchStdBtn.addEventListener("click", async function (e) {
    e.preventDefault()

    console.log(attDate.value)
    if (!attDate.value) return alert("Please Select Attendance Date!")
    if (!attDept.value) return alert("Please Select Department!")
    if (!attSub.value) return alert("Please Select Subject!")

    let department = attDept.value
    let year = loggedInYear
    console.log(department, year)

    getStudentsList(department)
  })
})

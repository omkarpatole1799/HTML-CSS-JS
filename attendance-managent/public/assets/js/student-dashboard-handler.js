window.addEventListener("DOMContentLoaded", () => {
  console.log("student-dashboard-handler.js loaded")
  let subject = document.querySelector("#subject")
  let date = document.querySelector(".date")
  let searchAttBtn = document.querySelector(".search-att-btn")
  let stdAttTbody = document.querySelector(".std-att-tbody")

  document.querySelector(".student-name").innerText = s_name
  // setTodaysDate()
  getSubjectsList(studentId)
  getStudentsAttPercentage(studentId)

  // function setTodaysDate() {
  //   let d = new Date()

  //   date.value = `${d.getFullYear()}-0${d.getMonth() + 1}-${d.getDate()}`
  // }

  async function getSubjectsList(studentId) {
    let _res = await fetch("/student/subjects-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId }),
    })

    let _data = await _res.json()

    console.log(_data)

    renderStudentSubjects(_data.data[0].subjects)
  }

  async function getStudentsAttPercentage() {
    let _res = await fetch("/student/att-percentage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ studentId, date: date.value }),
    })

    let _data = await _res.json()

    console.log(_data)
  }

  function renderStudentSubjects(subjects) {
    let _html = subjects.map(sub => {
      return `<option value='${sub}'>${sub}</option>`
    })
    subject.innerHTML = `<option value=''>-- Select Subject --</option>` + _html
  }

  searchAttBtn.addEventListener("click", async function () {
    let _subject = subject.value
    let _date = date.value

    console.log(_subject, _date)
    let _response = await fetch("/student/get-attendance-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _subject, _date, studentId }),
    })

    let _data = await _response.json()
    console.log(_data, "this")
    printStudentAttendance(_data.data)
  })

  function printStudentAttendance(attendanceList) {
    let _html
    if (attendanceList.length == 0)
      _html = `<tr class='text-center'><td colspan='5'>No Data Found</td></tr>`
    else
      _html = attendanceList.map((el, i) => {
        return `
            <tr>
              <td>${i + 1}</td>
              <td>${el.subject}</td>
              <td>${el.date.split("T")[0]}</td>
              <td>${el.status == 1 ? "Present" : "Absent"}</td>
            </tr>`
      })

    stdAttTbody.innerHTML = _html
  }
})

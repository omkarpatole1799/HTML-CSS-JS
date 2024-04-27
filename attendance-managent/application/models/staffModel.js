const db = require("../config/db-connect.js")
const staffModel = {
  saveStudentData: data => {
    return db.execute(
      `INSERT INTO 
                students
                (s_name, s_mobile, s_department, s_year)
                VALUES (?, ?, ?, ?)`,
      [data.s_name, data.s_mobile, data.s_department, data.s_year]
    )
  },

  getStudentsList: (department, year) => {
    if (!department) {
      return db.execute(`SELECT * FROM students WHERE s_year = ?`, [year])
    }

    if (department) {
      return db.execute(
        `SELECT * FROM students WHERE s_year = ? AND s_department = ?`,
        [year, department]
      )
    }
  },

  deleteStudent: sId => {
    return db.execute(`DELETE FROM students where id = ?`, [+sId])
  },

  getSubList: (department, year) => {
    if (department)
      return db.execute(
        "SELECT * FROM subjects WHERE sub_department=? AND sub_year=?",
        [department, year]
      )
    else return db.execute("SELECT * FROM subjects")
  },

  addSubject: ({ formData: data }) => {
    console.log(data, "in model")
    return db.execute(
      `INSERT INTO subjects (sub_name, sub_department, sub_year) VALUES (?, ?, ?)`,
      [data.sub_name, data.sub_department, data.sub_year]
    )
  },

  deleteSubject: subId => {
    return db.execute(`DELETE FROM subjects WHERE id = ?`, [subId])
  },

  // staff authentication

  loginStaff: ({ userName, password }) => {
    console.log(userName, password)
    return db.execute(
      `SELECT * FROM staff_login WHERE username = ? AND password = ? LIMIT 1`,
      [userName, password]
    )
  },

  // save attendance

  saveAttendance: ([attendance, details]) => {
    // console.log(attendance, details,'-in modal')
    let { year, date, department, subject } = details["details"]
    let query = `INSERT INTO 
                    attendance (year, department, subject, student_id, status, date)
                  VALUES ?`
    let insertArry = []
    attendance["attendance"].forEach(el =>
      insertArry.push([
        year,
        department,
        subject,
        el.id,
        el.att == "present" ? 1 : 0,
        date,
      ])
    )

    return db.query(query, [insertArry])
  },
}

module.exports = staffModel

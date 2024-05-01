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

  getSubList: (year, department) => {
    if (department) {
      return db.execute(
        "SELECT * FROM subjects WHERE sub_year =? AND sub_department = ?",
        [year, department.toLowerCase()]
      )
    } else {
      return db.execute("SELECT * FROM subjects WHERE sub_year = ?", [year])
    }
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
  loginStudent: ({ userName, password }) => {
    return db.execute(
      `SELECT s_name, id AS username, s_mobile AS password FROM students WHERE id = '${userName}' AND s_mobile = '${password}' LIMIT 1`
    )

    // return db.execute(
    //   `SELECT
    //       stds.s_name,
    //       stds.id AS username,
    //       stds.s_mobile AS password,
    //       stds.s_department,
    //       stds.s_year,
    //       JSON_ARRAYAGG(sub_name) AS subjects
    //   FROM
    //       students AS stds
    //           JOIN
    //       subjects AS subs
    //   WHERE
    //       stds.id = 1 AND s_mobile = 1 AND
    //       subs.sub_year = 'BE'
    //   LIMIT 1`
    // )
  },

  // save attendance
  deleteOldRecords: ([attendance, details]) => {
    let s_id = attendance["attendance"].map(el => el.id).toString()
    let query = `DELETE FROM attendance WHERE student_id IN (${s_id})`
    return db.query(query)
  },

  saveAttendance: ([attendance, details]) => {
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

  _isFilled: async data => {
    let query = `SELECT 
                    students.s_name,
                    students.id,
                    year,
                    department,
                    subject,
                    student_id,
                    status,
                    date
                FROM
                    students
                        LEFT JOIN
                    attendance ON attendance.student_id = students.id
                WHERE
                    year = '${data.year}' AND department = '${data.department}'
                        AND subject = '${data.subject}'
                        AND date = '${data.date}'`
    return db.query(query)
  },

  checkAttFilled: async data => {
    console.log(data, "--in model")
    let query = `SELECT 
                    att.id AS attendance_id,
                    std.id,
                    std.s_name,
                    year,
                    department,
                    subject,
                    student_id,
                    status,
                    date
                FROM
                    (SELECT * FROM  students WHERE s_department = ? AND s_year = ?) AS std
                      LEFT JOIN
                    (SELECT * FROM attendance WHERE date = ? AND subject = ?)  AS att
                    ON std.id = att.student_id
                    AND att.year = std.s_year
                    AND att.department = std.s_department`
    return db.execute(query, [
      data.department,
      data.year,
      data.date,
      data.subject,
    ])
  },

  deletePreviousAtt: async data => {
    let id = data.deleteAttId.map(el => el.attendance_id)
    console.log(id)
    let query = `DELETE FROM attendance WHERE id in (${[...id]})`
    console.log(query, "-query")
    return db.execute(query)
  },
}

module.exports = staffModel

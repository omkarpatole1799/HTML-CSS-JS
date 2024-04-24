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

  getStudentsList: () => {
    return db.execute(`SELECT * FROM students`)
  },
}

module.exports = staffModel

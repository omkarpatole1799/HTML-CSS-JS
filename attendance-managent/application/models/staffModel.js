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

  deleteStudent: sId => {
    return db.execute(`DELETE FROM students where id = ?`, [+sId])
  },

  getSubList: () => {
    return db.execute("SELECT * FROM subjects")
  },

  addSubject: ({ formData: data }) => {
    console.log(data, "in model")
    return db.execute(
      `INSERT INTO subjects (sub_name, sub_department, sub_year) VALUES (?, ?, ?)`,
      [data.sub_name, data.sub_department, data.sub_year]
    )
  },
}

module.exports = staffModel

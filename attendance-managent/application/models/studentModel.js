const db = require("../config/db-connect.js")
const studentModel = {
  studentSubjects: studentId => {
    return db.execute(`
                    SELECT 
                    stds.s_name,
                    stds.id AS username,
                    stds.s_mobile AS password,
                    stds.s_department,
                    stds.s_year,
                    JSON_ARRAYAGG(sub_name) AS subjects
                FROM
                    students AS stds
                        JOIN
                    subjects AS subs
                WHERE
                    stds.id = ${studentId} AND stds.s_year = subs.sub_year AND stds.s_department = subs.sub_department
                LIMIT 1`)
  },

  attPercentage: ({ studentId, date }) => {
    // prettier-ignore
    let query = `SELECT 
                    subject,
                    count(date)
                FROM
                    attendance
                WHERE
                    student_id = ${studentId} AND DATE_FORMAT(date,'%m') = ${date.split("-")[1].split("")[1]} 
                GROUP BY subject;`
    return db.execute(query)
  },

  getAttendanceData: ({ _subject, _date, studentId }) => {
    console.log(_subject, _date, studentId)
    let query = `
                SELECT 
                *
            FROM
                attendance
            WHERE
                student_id = ${studentId} AND date = '${_date}' AND subject = '${_subject}';`
    return db.execute(query)
  },
}

module.exports = studentModel

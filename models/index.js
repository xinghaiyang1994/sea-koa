const query = require('./query')

module.exports = {
    insertData (value) {
        let sql = `INSERT INTO user (name, password) VALUES(?, ?)`
        return query(sql, value)
    },
    findDataByPage (name, num, pageSize) {
        let sql = `SELECT * FROM user WHERE name = "${name}" ORDER BY id DESC LIMIT ${(num - 1) * pageSize}, ${pageSize}`
        return query(sql)
    },
    deleteData (id) {
        let sql = `DELETE FROM user WHERE id = ${id}`
        return query(sql)
    },
    updateData (id, value) {
        let sql = `UPDATE user SET name = ? , password = ? WHERE id = ${id}`
        return query(sql, value)
    }
}


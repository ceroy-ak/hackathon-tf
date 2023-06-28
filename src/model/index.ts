import mysql, { ResultSetHeader } from 'mysql2'

export const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
})

async function mysqlHealthCheck(): Promise<boolean> {
    return new Promise((resolve, reject) => {
        connection.execute('SELECT 1', (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

async function saveTemplate(
    template: object,
    accountId?: string
): Promise<number> {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO hackathon.templates (template, accountId) VALUES (?, ?)`
        const queryValues = [template, accountId || null]
        connection.execute(query, queryValues, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve((results as ResultSetHeader).insertId)
            }
        })
    })
}

async function fetchAllTemplates(): Promise<object[]> {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM hackathon.templates`
        connection.execute(query, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results as object[])
            }
        })
    })
}

async function fetchTemplateByAccountId(accountId: string): Promise<object[]> {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM hackathon.templates WHERE accountId = ?`
        connection.execute(query, [accountId], (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results as object[])
            }
        })
    })
}

async function deleteTemplateById(templateId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM hackathon.templates WHERE id = ?`
        connection.execute(query, [templateId], (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}

async function deleteAllTemplate(): Promise<void> {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM hackathon.templates`
        connection.execute(query, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

export {
    mysqlHealthCheck,
    saveTemplate,
    fetchAllTemplates,
    fetchTemplateByAccountId,
    deleteTemplateById,
    deleteAllTemplate,
}

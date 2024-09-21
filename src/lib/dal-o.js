    
    import Worker from './worker.js?worker'

    let db
    let worker = new Worker()
    worker.addEventListener('message', ({data})=>{
        if(data.ready === true){
            db = data.db
        }
    })

    export function select(table, fields = 'ID, Name', conditions = '1', orders = 1){
        // debugger
        if(!db) return
        let sql = `SELECT ${fields} FROM ${table} WHERE ${conditions} ORDER BY ${orders}`
        // log(sql, debug)
        return db.exec(sql, { rowMode: "object" })
    }
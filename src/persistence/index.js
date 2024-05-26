import * as ExpoSQLite from "expo-sqlite"

const db = ExpoSQLite.openDatabase("sessions.db") //SE ABRE UNA BASE DE DATOS QUE VA A ESTAR DENTRO DE LA MEMORIA DEL CELULAR, NO FUNCIONA EN WEB

export const initSQLiteDB = () => {
    
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Define SQL statement. BEWARE of PARENTHESIS
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS sessions (localId TEXT PRIMARY KEY NOT NULL, email TEXT NOT NULL, token TEXT NOT NULL);",
                [], //Parameters
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //Transaction error
            )
        })
    })
    
    return promise

    //GENERAMOS UNA PROMESA PORQUE TENEMOS UNA TRANSACCION CON LA BAE DE DATOS, LA CUAL NO SABEMOS CUANTO PUEDE TARDAR
}

export const insertSession = ({
    email,
    localId,
    token
}) => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Define SQL statement. BEWARE of PARENTHESIS
            tx.executeSql(
                'INSERT INTO sessions (localId, email, token) VALUES (?, ?, ?);',
                [localId, email, token], //Parameters
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //Transaction error
            )
        })
    })
    return promise
}

export const getSession = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Define SQL statement. BEWARE of PARENTHESIS
            tx.executeSql(
                'SELECT * from sessions',
                [], //Parameters
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //Transaction error
            )
        })
    })
    return promise
}

export const dropSessionsTable = () => {
    
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Define SQL statement. BEWARE of PARENTHESIS
            tx.executeSql(
                "DROP TABLE IF EXISTS sessions",
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //Transaction error
            )
        })
    })
    
    return promise
}

export const truncateSessionsTable = () => {
    
    const promise = new Promise((resolve, reject) => {
        db.transaction((tx) => {
            //Define SQL statement. BEWARE of PARENTHESIS
            tx.executeSql(
                "DELETE FROM sessions",
                [], //Parameters
                (_, result) => resolve(result), //Resolve trasaction
                (_, error) => reject(error) //Transaction error
            )
        })
    })

    return promise
}
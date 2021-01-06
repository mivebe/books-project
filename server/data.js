import mariadb from "mariadb";

const pool = mariadb.createPool({
    user: "root",
    host: "localhost",
    port: "3306",
    password: "1997",
    database: "bambook",
});
export default pool
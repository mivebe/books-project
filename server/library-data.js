import pool from "./data.js";


// const getBy = async (column, value) => {
//     const sql = `
//           SELECT id, name, isBorrowed, unlisted
//           FROM books
//           WHERE ${column} = ?
//       `;

//     const result = await pool.query(sql, [value]);

//     return result[0];
//   };

const retrieveAllBooks = async () => {
    const sql = `
          SELECT *
          FROM books
      `;

    const res = await pool.query(sql);

    return [...res]

};
export default { retrieveAllBooks }


const getAllBooks = (data) => async (search) => {
    return await data.retrieveAllListedBooks(search);
}

export default {
    getAllBooks,
}
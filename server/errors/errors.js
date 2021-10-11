
export const userErrors = {
    /** Such a record does not exist (when it is expected to exist) */
    NONEXISTANT_USER: "This user does not exist.",
    DUPLICATE_USERNAME: 'Username already exists',
    DUPLICATE_EMAIL: "Email is already taken",
    /** The requirements do not allow such an operation */
    INVALID_SIGNIN: 'Invalid username/password',
    USERNAME_REQUIRED: 'Username is required',
    PASSWORD_REQUIRED: 'Password is required',
    FIRST_NAME_REQUIRED: 'First name is required',
    LAST_NAME_REQUIRED: 'Last name is required',
    USERNAME_LENGTH_CHECK: 'Username should be a string in range [3..25]',
    PASSWORD_LENGTH_CHECK: 'Password should be a string in range [3..25]',
    FIRST_NAME_LENGTH_CHECK: 'First name should be a string in range [3..25]',
    LAST_NAME_LENGTH_CHECK: 'Last name should be a string in range [3..25]',
};

export const idErrors = {
    ID_TYPE_MUST_BE_NUMBER: 'Parameter id must be a number!',
};

export const queryErrors = {
    INVALID_LIMIT: 'Invalid limit value!',
    INVALID_OFFSET: 'Invalid offset value!',
};

export const bookErrors = {
    TITLE_IS_REQUIRED: 'Title is required!',
    TITLE_MUST_BE_A_VALID_STRING: "Title must be a valid string!",
    AUTHOR_IS_REQUIRED: 'Author name is required!',
    AUTHOR_MUST_BE_A_VALID_STRING: "Author name must be a valid string!",
    AUTHOR_ALREADY_EXISTS: "Author already exists!",
    GENRE_IS_REQUIRED: 'Genre is required!',
    GENRE_MUST_BE_A_VALID_STRING: "Genre must be a valid string!",
    DESCRIPTION_IS_REQUIRED: 'Description is required!',
    DESCRIPTION_MUST_BE_A_VALID_STRING: "Description must be a valid string!",
    PUBLISHDATE_IS_REQUIRED: 'Publishdate is required!',
    PUBLISHDATE_MUST_BE_A_VALID_YEAR: "Publishdate must be a valid number!",
    COPIES_IS_REQUIRED: 'Number of copies is required!',
    COPIES_MUST_BE_A_VALID_NUMBER: "Number of copies must be a valid number!",
    INVALID_BOOK_ID: "Invlid book ID!",
    BOOK_ALREADY_EXISTS: "This book already exists!",
    NO_AVAILABLE_COPIES: "There are no more available copies of this book.",
    NO_MATCHING_RENTED_BOOK: "This user has no such rented book.",
    INVALID_BOOK_RATE: "Rating must be a nnumber from 1-10",
    BOOK_CREATION_SUCCESS: "New Book Created Successfully!",
    AUTHOR_CREATION_SUCCESS: "New Author Created Successfully!",
};

export const commentErrors = {
    COMMENT_IS_REQUIRED: "Comment is required.",
    COMMENT_CONSTRAINTS: "Comments must be between 3 and 200 symbols.",
    COMMENT_DOES_NOT_EXIST: "Comment does not exist.",
    COMMENT_NOT_ACCESSIBLE: "You have no access to this commentary."
}

export const categoriesErrors = {
    CATEGORY_EXIST: 'Category with that name already exist!',
    CATEGORY_NAME_MUST_BE_STRING: 'Category name must contain letters only!',
    CATEGORY_LENGTH_ATLEAST_TWO: 'Category name must be atleast 2 symbols!',
};

export const userErrors = {
    /** Such a record does not exist (when it is expected to exist) */
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

export const quizzesErrors = {
    QUIZ_NAME_EXIST: 'Quiz with that name alreaady exist!',
    IS_MULTIPLE_NOT_CORECT_USED:
        'If isMultiple is checked you need to select more then 1 corect answers!',
    POSIBLE_ANSWERS_LESS_THEN_CORRECT:
        'Posible answers must be more then correct ones!',
    ATLEAST_TWO_ANSWERS: 'There must be atleast two answers!',
    POINTS_RANGE: 'Points for the question must be between (1-6)!',
    THERE_IS_NO_CATEGORIES:
        'There is no categories at the moment please create one before trying to create quiz first!',
    QUIZ_MUST_HAVE_ATLEAST_TWO_QUESTIONS:
        'To finish with submision you need to ad atleaste two questions!',
    INVALID_QUIZ_ID: 'Invalid quiz id!',
    NO_PERMISSION: 'You have already completed this quiz!',
};

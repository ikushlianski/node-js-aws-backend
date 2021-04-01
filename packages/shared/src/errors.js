export const HTTP_ERRORS = {
  BAD_REQUEST: 'BAD_REQUEST',
  UNPROCESSABLE_ENTITY: 'UNPROCESSABLE_ENTITY',
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  // other error codes will be added as needed
};

const ERROR_CODES = {
  [HTTP_ERRORS.BAD_REQUEST]: 400,
  [HTTP_ERRORS.UNPROCESSABLE_ENTITY]: 422,
  [HTTP_ERRORS.INTERNAL_SERVER_ERROR]: 500,
  // other error codes will be added as needed
};

export const getErrorCode = (error) => {
  return (
    ERROR_CODES[error.name] || ERROR_CODES[HTTP_ERRORS.INTERNAL_SERVER_ERROR]
  );
};

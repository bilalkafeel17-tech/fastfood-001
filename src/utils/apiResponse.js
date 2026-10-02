/**
 * Standard API Response Helper
 */

export const sendSuccess = (
  res,
  { statusCode = 200, message = "Success", data = null, pagination = null } = {}
) => {
  const response = {
    success: true,
    message
  };

  if (data !== null && data !== undefined) {
    response.data = data;
  }

  if (pagination) {
    response.pagination = pagination;
  }

  return res.status(statusCode).json(response);
};

export const sendError = (
  res,
  { statusCode = 500, message = "Internal Server Error", errors = [] } = {}
) => {
  const response = {
    success: false,
    message
  };

  if (errors && errors.length > 0) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

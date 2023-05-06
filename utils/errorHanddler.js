export default (error, setErrorMessage) => {
  let errorMessage = "something went wrong, please retry";

  if (error.response?.data?.path) {
    errorMessage = error.response.data.path;
  } else if (error.response?.data?.message) {
    errorMessage = error.response.data.message;
  } else if (error?.message) {
    errorMessage = error.message;
  }

  setErrorMessage(errorMessage);
  console.error(error);
};

export default (error, setErrorMessage) => {
  if (error.response?.data?.path) {
    setErrorMessage(error.response.data.path);
  } else if (error.response?.data?.message) {
    setErrorMessage(error.response.data.message);
  } else {
    setErrorMessage(error.message || "something worng please retry");
  }
  console.error(error);
};

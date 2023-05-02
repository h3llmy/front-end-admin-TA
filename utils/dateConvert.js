export const dateConvert = (dateToConvert) => {
  const date = new Date(dateToConvert);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  let formattedDate = date
    .toLocaleDateString(undefined, options)
    .replace(/\//g, "-");
  const formattedDateArray = formattedDate.split("-");
  formattedDate = `${formattedDateArray[1]}-${formattedDateArray[0]}-${formattedDateArray[2]}`;
  return formattedDate;
};

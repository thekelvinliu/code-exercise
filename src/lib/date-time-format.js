export const FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
});

export const formatDate = function formatDateToMonthDayYearString(dateObj) {
  return FORMATTER.format(dateObj);
};

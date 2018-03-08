
export const formatAmount = (number, code) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    currencyDisplay: 'code',
    useGrouping: false,
    minimumFractionDigits: 8
  });

  return formatter.format(number);
}

// Does not seem to be supported in Chrome or Chromium
export const formatAmountToParts = (number, code) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: code,
    currencyDisplay: 'code',
    useGrouping: false,
    minimumFractionDigits: 8
  });

  return formatter.formatToParts(number);
}

export const formatDate = (value) => {
  console.log('formatting date: ', value);
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true,
    timeZone: 'America/New_York'
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(value));
}

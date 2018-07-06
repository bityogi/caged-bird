
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
  const options = {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: true,
    timeZone: 'America/New_York'
  };

  return new Intl.DateTimeFormat('en-US', options).format(new Date(value));
}

export const scientificToDecimal = (num) => {
  //if the number is in scientific notation remove it
  if(/\d+\.?\d*e[+-]*\d+/i.test(num)) {
      var zero = '0',
          parts = String(num).toLowerCase().split('e'), //split into coeff and exponent
          e = parts.pop(),//store the exponential part
          l = Math.abs(e), //get the number of zeros
          sign = e/l,
          coeff_array = parts[0].split('.');
      if(sign === -1) {
          num = zero + '.' + new Array(l).join(zero) + coeff_array.join('');
      }
      else {
          var dec = coeff_array[1];
          if(dec) l = l - dec.length;
          num = coeff_array.join('') + new Array(l+1).join(zero);
      }
  }
  
  return num;
};
import React from 'react';

// state tax https://www.nerdwallet.com/article/taxes/california-state-tax

export default function Calculate(income, rates) {
  // Federal
  const fedTaxableIncome = income - rates.fedStandardDeduction;

  let ic = fedTaxableIncome;

  // let temp;
  let count = 0;
  let end = [];

  fuck();

  function fuck() {
    if (ic > rates.fedBrackets[count]) {
      end[count] = ic - rates.fedBrackets[count];
      count++;
      fuck();
    } else {
      end[count] = rates.fedBrackets[count] - ic;
    }
  }

  // for (let i = 0; i < rates.fedBrackets.length; i++) {
  //   if(rates.fedBrackets[0] < ic) {
  //     break;
  //   } else {

  //   }
  // }

  // let fedIncomeTax = [0, 0, 0, 0];

  // let fedTaxTemp = [
  //   rates.fedBrackets[0] * 0.1,
  //   (rates.fedBrackets[1] - rates.fedBrackets[0]) * 0.12,
  //   (rates.fedBrackets[2] - rates.fedBrackets[1]) * 0.22,
  //   (rates.fedBrackets[3] - rates.fedBrackets[2]) * 0.24,
  // ];

  // if (fedTaxableIncome <= rates.fedBrackets[0]) {
  //   result = fedTaxableIncome * 0.1;
  //   fedTaxTemp[0] = result;
  //   fedTaxTemp[1] = 0;
  //   fedTaxTemp[2] = 0;
  //   fedTaxTemp[3] = 0;
  // } else if (fedTaxableIncome <= rates.fedBrackets[1]) {
  //   result = (fedTaxableIncome - rates.fedBrackets[0]) * 0.12;
  //   fedTaxTemp[1] = result;
  //   fedTaxTemp[2] = 0;
  //   fedTaxTemp[3] = 0;
  // } else if (fedTaxableIncome <= rates.fedBrackets[2]) {
  //   result = (fedTaxableIncome - rates.fedBrackets[1]) * 0.22;
  //   fedTaxTemp[2] = result;
  //   fedTaxTemp[3] = 0;
  // } else if (fedTaxableIncome <= rates.fedBrackets[3]) {
  //   result = (fedTaxableIncome - rates.fedBrackets[2]) * 0.24;
  //   fedTaxTemp[3] = result;
  // } else {

  // }

  // let totalFedTax = fedTaxTemp.reduce((a, b) => a + b, 0);

  // State
  // const stateTaxableIncome = income - rates.stateStandardDeduction;

  // total
  let selfEmploymentTax = income * rates.selfEmploymentRate;

  // let totalTax = totalFedTax + totalStateTax selfEmploymentTax;
  let totalTax = selfEmploymentTax;

  let profit = income - totalTax;
  let profitRate = ((income - totalTax) / income) * 100;

  let result = {
    fedTaxableIncome,
    // stateTaxableIncome,
    selfEmploymentTax,
    totalTax,
    profit,
    profitRate,
  };

  return result;
}

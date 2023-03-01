import React from 'react';

// state tax https://www.nerdwallet.com/article/taxes/california-state-tax

export default function fedEndulate(income, rates) {
  //*********** Federal ***********
  const fedTaxableIncome = income - rates.fedStandardDeduction;

  let fedCurrent = [0];
  let fedSum = [0];
  let fedResultArray = [0];

  for (let i = 1; i < rates.fedBrackets.length; i++) {
    fedCurrent.push(
      (rates.fedBrackets[i] - rates.fedBrackets[i - 1]) * rates.fedRates[i]
    );
    fedSum.push(
      (rates.fedBrackets[i] - rates.fedBrackets[i - 1]) * rates.fedRates[i] +
        fedSum[i - 1]
    );
    fedResultArray.push(0);
  }

  let fedFinalIndex = 0;

  for (let i = 0; i < rates.fedBrackets.length; i++) {
    if (fedTaxableIncome < rates.fedBrackets[i]) {
      fedFinalIndex = i;
      break;
    }
  }

  let fedEnd =
    (fedTaxableIncome - rates.fedBrackets[fedFinalIndex - 1]) *
    rates.fedRates[fedFinalIndex];

  for (let i = 0; i <= fedFinalIndex; i++) {
    if (i !== fedFinalIndex) {
      fedResultArray[i] = fedCurrent[i];
    } else {
      fedResultArray[i] = fedEnd;
    }
  }

  let totalFedTax = fedSum[fedFinalIndex - 1] + fedEnd;

  //*********** State ***********
  const stateTaxableIncome = income - rates.stateStandardDeduction;

  let stateBracketsResult = [];
  let totalStateTax;
  let temp2;

  console.log('taxable: ' + stateTaxableIncome);

  if (stateTaxableIncome <= rates.stateBrackets[0]) {
    // case 1
    stateBracketsResult = [stateTaxableIncome * 0.01, 0, 0, 0, 0, 0];
  } else if (
    stateTaxableIncome > rates.stateBrackets[0] &&
    stateTaxableIncome <= rates.stateBrackets[1]
  ) {
    // case 2
    temp2 = stateTaxableIncome - rates.stateBrackets[0];
    stateBracketsResult = [
      rates.stateBrackets[0] * 0.01,
      temp2 * 0.02,
      0,
      0,
      0,
      0,
    ];
  } else if (
    stateTaxableIncome > rates.stateBrackets[1] &&
    stateTaxableIncome <= rates.stateBrackets[2]
  ) {
    // case 3
    temp2 = stateTaxableIncome - rates.stateBrackets[1];
    stateBracketsResult = [
      rates.stateBrackets[0] * 0.01,
      rates.stateBrackets[1] * 0.02,
      temp2 * 0.04,
      0,
      0,
      0,
    ];
  } else if (
    stateTaxableIncome > rates.stateBrackets[2] &&
    stateTaxableIncome <= rates.stateBrackets[3]
  ) {
    // case 4
    temp2 = stateTaxableIncome - rates.stateBrackets[2];
    console.log(temp2);
    stateBracketsResult = [
      rates.stateBrackets[0] * 0.01,
      rates.stateBrackets[1] * 0.02,
      rates.stateBrackets[2] * 0.04,
      temp2 * 0.06,
      0,
      0,
    ];
  } else if (
    stateTaxableIncome > rates.stateBrackets[3] &&
    stateTaxableIncome <= rates.stateBrackets[4]
  ) {
    // case 4
    temp2 = stateTaxableIncome - rates.stateBrackets[3];
    console.log(temp2);
    stateBracketsResult = [
      rates.stateBrackets[0] * 0.01,
      rates.stateBrackets[1] * 0.02,
      rates.stateBrackets[2] * 0.04,
      rates.stateBrackets[3] * 0.06,
      temp2 * 0.08,
      0,
    ];
  } else if (
    stateTaxableIncome > rates.stateBrackets[4] &&
    stateTaxableIncome <= rates.stateBrackets[5]
  ) {
    // case 4
    temp2 = stateTaxableIncome - rates.stateBrackets[4];
    stateBracketsResult = [
      rates.stateBrackets[0] * 0.01,
      rates.stateBrackets[1] * 0.02,
      rates.stateBrackets[2] * 0.04,
      rates.stateBrackets[3] * 0.06,
      rates.stateBrackets[4] * 0.08,
      temp2 * 0.093,
    ];
  }

  totalStateTax = stateBracketsResult.reduce((a, b) => a + b, 0);

  //*********** total ***********
  let selfEmploymentTax = income * rates.selfEmploymentRate;

  let totalTax = totalFedTax + totalStateTax + selfEmploymentTax;

  let profit = income - totalTax;
  let profitRate = ((income - totalTax) / income) * 100;

  //*********** Result ***********
  let result = {
    fedTaxableIncome,
    fedCurrent,
    fedSum,
    fedResultArray,
    totalFedTax,
    stateTaxableIncome,
    stateBracketsResult,
    totalStateTax,
    selfEmploymentTax,
    totalTax,
    profit,
    profitRate,
  };

  return result;
}

import React from 'react';

// state tax https://www.nerdwallet.com/article/taxes/california-state-tax

export default function Calculate(income, rates) {
  //*********** Federal ***********
  const fedTaxableIncome = income - rates.fedStandardDeduction;

  let fedBracketsResult = [];
  let totalFedTax;
  let temp1;

  if (fedTaxableIncome <= rates.fedBrackets[0]) {
    // case 1
    fedBracketsResult = [fedTaxableIncome * 0.1, 0, 0, 0];
  } else if (
    fedTaxableIncome > rates.fedBrackets[0] &&
    fedTaxableIncome <= rates.fedBrackets[1]
  ) {
    // case 2
    temp1 = fedTaxableIncome - rates.fedBrackets[0];
    fedBracketsResult = [rates.fedBrackets[0] * 0.1, temp1 * 0.12, 0, 0];
  } else if (
    fedTaxableIncome > rates.fedBrackets[1] &&
    fedTaxableIncome <= rates.fedBrackets[2]
  ) {
    // case 3
    temp1 = fedTaxableIncome - rates.fedBrackets[1];
    fedBracketsResult = [
      rates.fedBrackets[0] * 0.1,
      rates.fedBrackets[1] * 0.12,
      temp1 * 0.22,
      0,
    ];
  } else if (
    fedTaxableIncome > rates.fedBrackets[2] &&
    fedTaxableIncome <= rates.fedBrackets[3]
  ) {
    // case 4
    temp1 = fedTaxableIncome - rates.fedBrackets[2];
    fedBracketsResult = [
      rates.fedBrackets[0] * 0.1,
      rates.fedBrackets[1] * 0.12,
      rates.fedBrackets[2] * 0.22,
      temp1 * 0.24,
    ];
  }

  totalFedTax = fedBracketsResult.reduce((a, b) => a + b, 0);

  //*********** State ***********

  const stateTaxableIncome = income - rates.stateStandardDeduction;

  let stateBracketsResult = [];
  let totalStateTax;
  let temp2;

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

  let result = {
    fedTaxableIncome,
    fedBracketsResult,
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

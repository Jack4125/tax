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

  let stateCurrent = [0];
  let stateSum = [0];
  let stateResultArray = [0];

  for (let i = 1; i < rates.stateBrackets.length; i++) {
    stateCurrent.push(
      (rates.stateBrackets[i] - rates.stateBrackets[i - 1]) *
        rates.stateRates[i]
    );
    stateSum.push(
      (rates.stateBrackets[i] - rates.stateBrackets[i - 1]) *
        rates.stateRates[i] +
        stateSum[i - 1]
    );
    stateResultArray.push(0);
  }

  let stateFinalIndex = 0;

  for (let i = 0; i < rates.stateBrackets.length; i++) {
    if (stateTaxableIncome < rates.stateBrackets[i]) {
      stateFinalIndex = i;
      break;
    }
  }

  let stateEnd =
    (stateTaxableIncome - rates.stateBrackets[stateFinalIndex - 1]) *
    rates.stateRates[stateFinalIndex];

  for (let i = 0; i <= stateFinalIndex; i++) {
    if (i !== stateFinalIndex) {
      stateResultArray[i] = stateCurrent[i];
    } else {
      stateResultArray[i] = stateEnd;
    }
  }

  let totalStateTax = stateSum[stateFinalIndex - 1] + stateEnd;

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
    stateCurrent,
    stateSum,
    stateResultArray,
    totalStateTax,
    selfEmploymentTax,
    totalTax,
    profit,
    profitRate,
  };

  return result;
}

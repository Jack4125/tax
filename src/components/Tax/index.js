import React, { useState } from 'react';
import Result from './Result';

import Calculate from './Calculate';

// Federal rates
// https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets

// State rates
// https://www.nerdwallet.com/article/taxes/california-state-tax

// export default function Tax() {
//   // 2022 rates
//   const rates = {
//     // Federal
//     fedStandardDeduction: 12950,
//     fedBrackets: [10275, 41775, 89075, 170050],
//     // State
//     stateStandardDeduction: 5202,
//     stateBrackets: [10099, 23942, 37788, 52455, 66295, 338639],
//     // Self
//     selfEmploymentRate: 0.153,
//   };

export default function Tax() {
  // 2023 rates
  const rates = {
    // Federal
    fedStandardDeduction: 13850,
    fedBrackets: [0, 11000, 44725, 95375, 182100],
    fedRates: [0, 0.1, 0.12, 0.22, 0.24],
    // State
    // unadjusted for 2023-2024
    stateStandardDeduction: 5202,
    stateBrackets: [10099, 23942, 37788, 52455, 66295, 338639],
    stateRates: [0.01, 0.02, 0.04, 0.06, 0.08, 0.093],
    // Self
    selfEmploymentRate: 0.153,
  };

  const [income, setIncome] = useState(51000);
  const [result, setResult] = useState(null);

  function handleSubmit(e) {
    setResult(Calculate(income, rates));
    e.preventDefault();
  }

  return (
    <div>
      <h1>Income Tax Calculator</h1>
      <div>(Self-Employed, 2022)</div>
      <hr />
      <form onSubmit={handleSubmit}>
        Income:{' '}
        <input
          value={income}
          onChange={(e) => {
            setIncome(e.target.value);
          }}
        />
        <button type="submit">Calculate</button>
      </form>
      <hr />
      {result ? <Result rates={rates} result={result} /> : null}
    </div>
  );
}

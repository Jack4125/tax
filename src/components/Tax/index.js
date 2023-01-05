import React, { useState } from 'react';
import Result from './Result';

import Calculate from './Calculate';

// https://www.ftb.ca.gov/file/personal/deductions/index.html

export default function Tax() {
  // 2022 rates
  const rates = {
    // Federal
    fedStandardDeduction: 12950,
    fedBrackets: [10275, 41775, 89075, 170050],
    // State
    stateStandardDeduction: 5202,
    stateBrackets: [10099, 23942, 37788, 52455, 66295, 338639],
    // Self
    selfEmploymentRate: 0.153,
  };

  const [income, setIncome] = useState(65000);
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

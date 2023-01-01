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
    stateStandardDeduction: 4803,
    stateBrackets: [9325, 22107, 34892, 48435, 61214, 321686],
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
      {result ? <Result result={result} /> : null}
    </div>
  );
}

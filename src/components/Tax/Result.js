import React from 'react';

export default function Result({ rates, result }) {
  return (
    <div>
      <h1>Summary</h1>
      <p>
        Total Tax ( Federal + State + Self-Employment):{' '}
        {result.totalTax.toLocaleString()}
      </p>
      <p>Profit/Net Income: {result.profit.toLocaleString()}</p>
      <p>
        Profit/Net Income Percentage: <b>{result.profitRate.toFixed(2)}%</b>
      </p>
      <hr />

      <h2>Federal Tax</h2>
      <Federal result={result} />
      <hr />

      <h2>State Tax</h2>
      <State result={result} />
      <hr />

      <h2>Self Employment Tax</h2>
      <p>
        Self Employment Tax: <b>{result.selfEmploymentTax.toLocaleString()}</b>
      </p>
    </div>
  );

  // Federal
  function Federal() {
    return (
      <div>
        <p>
          Federal Standard Deduction:{' '}
          {rates.fedStandardDeduction.toLocaleString()}
        </p>
        <p>
          Federal Taxable Income (Income - Standard Deduction):{' '}
          {result.fedTaxableIncome.toLocaleString()}
        </p>

        <table>
          <tbody>
            <tr>
              <th>Rate</th>
              <th>Bracket</th>
              <th>Tax</th>
            </tr>
            <tr>
              <td>10%</td>
              <td>$0 - ${rates.fedBrackets[1].toLocaleString()}</td>

              <td>{result.fedResultArray[1]}</td>
            </tr>
            <tr>
              <td>12%</td>
              <td>
                ${(rates.fedBrackets[1] + 1).toLocaleString()} - $
                {rates.fedBrackets[2].toLocaleString()}
              </td>
              <td>{result.fedResultArray[2]}</td>
            </tr>
            <tr>
              <td>22%</td>
              <td>
                ${(rates.fedBrackets[2] + 1).toLocaleString()} - $
                {rates.fedBrackets[3].toLocaleString()}
              </td>
              <td>{result.fedResultArray[3]}</td>
            </tr>
            <tr>
              <td>24%</td>
              <td>
                ${(rates.fedBrackets[4] + 1).toLocaleString()} - $
                {rates.fedBrackets[4].toLocaleString()}
              </td>
              <td>{result.fedResultArray[4]}</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total Federal Tax: <b>{result.totalFedTax.toLocaleString()}</b>
        </p>
      </div>
    );
  }

  // State
  function State() {
    return (
      <div>
        <p>
          State Standard Deduction:{' '}
          {rates.stateStandardDeduction.toLocaleString()}
        </p>
        <p>
          State Taxable Income (Income - Standard Deduction):{' '}
          {result.stateTaxableIncome.toLocaleString()}
        </p>

        <table>
          <tbody>
            <tr>
              <th>Rate</th>
              <th>Bracket</th>
              <th>Tax</th>
            </tr>
            <tr>
              <td>1%</td>
              <td>$0 - ${rates.stateBrackets[1].toLocaleString()}</td>
              <td>{result.stateResultArray[1].toLocaleString()}</td>
            </tr>
            <tr>
              <td>2%</td>
              <td>
                ${(rates.stateBrackets[1] + 1).toLocaleString()} - $
                {rates.stateBrackets[2].toLocaleString()}
              </td>
              <td>{result.stateResultArray[2].toLocaleString()}</td>
            </tr>
            <tr>
              <td>4%</td>
              <td>
                ${(rates.stateBrackets[2] + 1).toLocaleString()} - $
                {rates.stateBrackets[3].toLocaleString()}
              </td>
              <td>{result.stateResultArray[3].toLocaleString()}</td>
            </tr>
            <tr>
              <td>6%</td>
              <td>
                ${(rates.stateBrackets[3] + 1).toLocaleString()} - $
                {rates.stateBrackets[4].toLocaleString()}
              </td>
              <td>{result.stateResultArray[4].toLocaleString()}</td>
            </tr>
            <tr>
              <td>8%</td>
              <td>
                ${(rates.stateBrackets[4] + 1).toLocaleString()} - $
                {rates.stateBrackets[5].toLocaleString()}
              </td>
              <td>{result.stateResultArray[5].toLocaleString()}</td>
            </tr>
            <tr>
              <td>9.3%</td>
              <td>
                ${(rates.stateBrackets[5] + 1).toLocaleString()} - $
                {rates.stateBrackets[6].toLocaleString()}
              </td>
              <td>{result.stateResultArray[6].toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <p>
          Total State Tax: <b>{result.totalStateTax.toLocaleString()}</b>
        </p>
      </div>
    );
  }
}

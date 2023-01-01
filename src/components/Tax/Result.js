import React from 'react';

export default function Result({ result }) {
  return (
    <div>
      <h2>Federal Tax</h2>
      <Federal result={result} />
      <hr />
      <h2>State Tax</h2>
      <State result={result} />
      <hr />
      <h2>Self Employment Tax</h2>
      <p>{result.selfEmploymentTax.toLocaleString()}</p>
      <hr />
      <h1>Summary</h1>
      <p>
        Total Tax ( Federal + State + Self-Employment):{' '}
        {result.totalTax.toLocaleString()}
      </p>
      <p>Profit/Net Income: {result.profit.toLocaleString()}</p>
      <p>Profit/Net Income %: {result.profitRate.toFixed(2)}%</p>
    </div>
  );

  function Federal() {
    return (
      <div>
        <p>
          Federal Taxable Income (Income - Standard Deduction):{' '}
          {result.fedTaxableIncome.toLocaleString()}
        </p>

        <p>Total Federal Income Tax: {result.totalTax.toLocaleString()}</p>
      </div>
    );
  }

  function State() {
    return (
      <div>
        {/* <p>
          2022 California Standard Deduction:{' '}
          {result.caliStandardDeduction.toLocaleString()}{' '}
        </p> */}

        {/* <p>
          State Taxable Income (Income - Standard Deduction):{' '}
          {result.taxableIncome.toLocaleString()}
        </p>

        

        <p>Total State Income Tax: {result.totalIncomeTax.toLocaleString()}</p> */}
      </div>
    );
  }
}

{
  /* <table>
          <caption>State Tax</caption>
          <tbody>
            <tr>
              <th>Rate</th>
              <th>Bracket</th>
              <th>Tax</th>
            </tr>
            <tr>
              <td>10%</td>
              <td>$0 - ${result.brackets[0].toLocaleString()}</td>
              <td>{result.incomeTax[0]}</td>
            </tr>
            <tr>
              <td>12%</td>
              <td>
                ${(result.brackets[0] + 1).toLocaleString()} - $
                {result.brackets[1].toLocaleString()}
              </td>
              <td>{result.incomeTax[1]}</td>
            </tr>
            <tr>
              <td>22%</td>
              <td>
                ${(result.brackets[1] + 1).toLocaleString()} - $
                {result.brackets[2].toLocaleString()}
              </td>
              <td>{result.incomeTax[2]}</td>
            </tr>
            <tr>
              <td>24%</td>
              <td>
                ${(result.brackets[2] + 1).toLocaleString()} - $
                {result.brackets[3].toLocaleString()}
              </td>
              <td>{result.incomeTax[3]}</td>
            </tr>
          </tbody>
        </table> */
}

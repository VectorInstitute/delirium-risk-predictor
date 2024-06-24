import React from 'react';

function ResultsDisplay({ results }) {
  return (
    <div className="results mt-8 p-4 border rounded">
      <h2 className="text-2xl font-bold mb-4">Delirium Risk Assessment</h2>
      <p>Risk Score: {results.riskScore.toFixed(2)}</p>
      <p>Risk Category: {results.riskCategory}</p>
      <p>Recommendation: {results.recommendation}</p>
    </div>
  );
}

export default ResultsDisplay;

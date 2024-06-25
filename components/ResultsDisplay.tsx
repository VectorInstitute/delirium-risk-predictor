import React from 'react'

interface Results {
  riskScore: number
  riskCategory: string
  recommendation: string
}

interface Props {
  results: Results | null
}

const ResultsDisplay: React.FC<Props> = ({ results }) => {
  if (!results) {
    return <div className="mt-8 p-4 border rounded">Loading results...</div>
  }

  const formattedRiskScore =
    typeof results.riskScore === 'number' ? results.riskScore.toFixed(2) : 'N/A'

  const getRiskColor = (category: string): string => {
    switch (category.toLowerCase()) {
      case 'low':
        return 'text-green-600'
      case 'moderate':
        return 'text-yellow-600'
      case 'high':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  const riskColor = getRiskColor(results.riskCategory)

  return (
    <div className="results mt-8 p-4 border rounded bg-[#f0f8ff] border-[#7abaff]">
      <h2 className="text-2xl font-bold mb-4 text-[#7abaff]">
        Delirium Risk Assessment
      </h2>
      <p>
        <strong>Risk Score:</strong> {formattedRiskScore}
      </p>
      <p>
        <strong>Risk Category:</strong>{' '}
        <span className={`font-bold ${riskColor}`}>
          {results.riskCategory || 'N/A'}
        </span>
      </p>
      <p>
        <strong>Recommendation:</strong> {results.recommendation || 'N/A'}
      </p>
    </div>
  )
}

export default ResultsDisplay

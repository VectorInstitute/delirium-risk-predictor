'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [results, setResults] = useState(null);

  const handleSubmit = async (formData) => {
    // Convert checkbox values to booleans and numeric fields to numbers
    const features = [
      formData.Ground_Ambulance ? 1 : 0,
      formData.diag_Other_specified_status ? 1 : 0,
      formData.diag_Hepatic_failure ? 1 : 0,
      formData.diag_Nervous_system_signs_and_symptoms ? 1 : 0,
      formData.diag_Other_aftercare_encounter ? 1 : 0,
      formData.diag_Parkinsons_disease ? 1 : 0,
      formData.diag_Alcohol_related_disorders ? 1 : 0,
      formData.diag_Other_specified_and_unspecified_liver_disease ? 1 : 0,
      formData.diag_Septicemia ? 1 : 0,
      formData.diag_Schizophrenia_spectrum_and_other_psychotic_disorders ? 1 : 0,
      formData.diag_Symptoms_of_mental_and_substance_use_conditions ? 1 : 0,
      parseFloat(formData.lab_numeric_only_max_Albumin_in_Urine) || 0,
      formData.diag_Respiratory_failure_insufficiency_arrest ? 1 : 0,
      formData.diag_Pressure_ulcer_of_skin ? 1 : 0,
      formData.diag_Genitourinary_signs_and_symptoms ? 1 : 0
    ];

    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Error details:', errorBody);
        throw new Error('Network response was not ok');
      }

      const apiResponse = await response.json();
      setResults({
        riskScore: parseFloat(apiResponse.prediction),
        riskCategory: apiResponse.risk_category,
        recommendation: apiResponse.recommendation
      });
    } catch (error) {
      // Handle error (e.g., show error message to user)
      console.error('Error:', error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 bg-gray-100">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-[#7abaff]">Delirium Risk Predictor</h1>
        <InputForm onSubmit={handleSubmit} />
        {results && <ResultsDisplay results={results} />}
      </div>
      <footer className="w-full mt-8 flex flex-col items-center">
        <div className="flex justify-center space-x-8 mb-4">
          <Image src="/vector_logo.png" alt="Vector Institute Logo" width={100} height={50} />
          <Image src="/gemini_logo.svg" alt="GEMINI Logo" width={100} height={50} />
        </div>
        <p className="text-sm text-gray-600">© 2024 Delirium Risk Predictor. All rights reserved.</p>
      </footer>
    </main>
  );
}

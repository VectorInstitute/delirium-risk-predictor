'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import InputForm from '../components/InputForm';
import ResultsDisplay from '../components/ResultsDisplay';

export default function Home() {
  const [results, setResults] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ features: Object.values(formData) }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      // Handle error (e.g., show error message to user)
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

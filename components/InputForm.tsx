import React, { useState } from 'react'

function InputForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    ground_Ambulance: false,
    diag_Other_specified_status: false,
    diag_Hepatic_failure: false,
    diag_Nervous_system_signs_and_symptoms: false,
    diag_Other_aftercare_encounter: false,
    diag_Parkinsons_disease: false,
    diag_Alcohol_related_disorders: false,
    diag_Other_specified_and_unspecified_liver_disease: false,
    diag_Septicemia: false,
    diag_Schizophrenia_spectrum_and_other_psychotic_disorders: false,
    diag_Symptoms_of_mental_and_substance_use_conditions: false,
    lab_numeric_only_max_Albumin_in_Urine: '',
    diag_Respiratory_failure_insufficiency_arrest: false,
    diag_Pressure_ulcer_of_skin: false,
    diag_Genitourinary_signs_and_symptoms: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="ground_Ambulance"
            checked={formData.ground_Ambulance}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Ground Ambulance
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Other_specified_status"
            checked={formData.diag_Other_specified_status}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Other specified status
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Hepatic_failure"
            checked={formData.diag_Hepatic_failure}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Hepatic failure
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Nervous_system_signs_and_symptoms"
            checked={formData.diag_Nervous_system_signs_and_symptoms}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Nervous system signs and symptoms
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Other_aftercare_encounter"
            checked={formData.diag_Other_aftercare_encounter}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Other aftercare encounter
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Parkinsons_disease"
            checked={formData.diag_Parkinsons_disease}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Parkinson&apos;s disease
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Alcohol_related_disorders"
            checked={formData.diag_Alcohol_related_disorders}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Alcohol-related disorders
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Other_specified_and_unspecified_liver_disease"
            checked={
              formData.diag_Other_specified_and_unspecified_liver_disease
            }
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Other specified and unspecified liver disease
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Septicemia"
            checked={formData.diag_Septicemia}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Septicemia
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Schizophrenia_spectrum_and_other_psychotic_disorders"
            checked={
              formData.diag_Schizophrenia_spectrum_and_other_psychotic_disorders
            }
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Schizophrenia spectrum and other psychotic disorders
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Symptoms_of_mental_and_substance_use_conditions"
            checked={
              formData.diag_Symptoms_of_mental_and_substance_use_conditions
            }
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Symptoms of mental and substance use conditions
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Respiratory_failure_insufficiency_arrest"
            checked={formData.diag_Respiratory_failure_insufficiency_arrest}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Respiratory failure; insufficiency; arrest
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Pressure_ulcer_of_skin"
            checked={formData.diag_Pressure_ulcer_of_skin}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Pressure ulcer of skin
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="diag_Genitourinary_signs_and_symptoms"
            checked={formData.diag_Genitourinary_signs_and_symptoms}
            onChange={handleChange}
            className="mr-2 focus:ring-[#7abaff]"
          />
          Genitourinary signs and symptoms
        </label>
      </div>
      <div>
        <label className="block mb-2">
          Albumin [Mass/volume] in Urine (max):
          <input
            type="number"
            name="lab_numeric_only_max_Albumin_in_Urine"
            value={formData.lab_numeric_only_max_Albumin_in_Urine}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:border-[#7abaff] focus:ring focus:ring-[#7abaff] focus:ring-opacity-50"
            step="0.01"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-[#7abaff] text-white rounded hover:bg-[#5a9adf] transition duration-300"
      >
        Calculate Risk
      </button>
    </form>
  )
}

export default InputForm

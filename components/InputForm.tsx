import React, { useState } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import './InputForm.css'

interface FormData {
  ground_Ambulance: boolean
  diag_Other_specified_status: boolean
  diag_Hepatic_failure: boolean
  diag_Nervous_system_signs_and_symptoms: boolean
  diag_Other_aftercare_encounter: boolean
  diag_Parkinsons_disease: boolean
  diag_Alcohol_related_disorders: boolean
  diag_Other_specified_and_unspecified_liver_disease: boolean
  diag_Septicemia: boolean
  diag_Schizophrenia_spectrum_and_other_psychotic_disorders: boolean
  diag_Symptoms_of_mental_and_substance_use_conditions: boolean
  lab_numeric_only_max_Albumin_in_Urine: string
  diag_Respiratory_failure_insufficiency_arrest: boolean
  diag_Pressure_ulcer_of_skin: boolean
  diag_Genitourinary_signs_and_symptoms: boolean
}

interface InputFormProps {
  onSubmit: (formData: FormData) => void
}

function InputForm({ onSubmit }: InputFormProps) {
  const [formData, setFormData] = useState<FormData>({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderCheckbox = (name: keyof FormData, label: string, description: string) => (
    <label className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={formData[name] as boolean}
        onChange={handleChange}
        className="mr-2 focus:ring-[#7abaff]"
      />
      <span data-tooltip-id={`tooltip-${name}`} data-tooltip-content={description}>{label}</span>
      <Tooltip
        id={`tooltip-${name}`}
        className="custom-tooltip"
        place="right"
        effect="solid"
      />
    </label>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Admission Information</h3>
        {renderCheckbox("ground_Ambulance", "Ground Ambulance", "Patient arrived via ground ambulance transport")}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Diagnosis Codes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {renderCheckbox("diag_Other_specified_status", "Other specified status", "Patient has other specified status")}
          {renderCheckbox("diag_Hepatic_failure", "Hepatic failure", "Patient diagnosed with hepatic failure")}
          {renderCheckbox("diag_Nervous_system_signs_and_symptoms", "Nervous system signs and symptoms", "Patient shows signs and symptoms related to the nervous system")}
          {renderCheckbox("diag_Other_aftercare_encounter", "Other aftercare encounter", "Patient admitted for other aftercare")}
          {renderCheckbox("diag_Parkinsons_disease", "Parkinson's disease", "Patient diagnosed with Parkinson's disease")}
          {renderCheckbox("diag_Alcohol_related_disorders", "Alcohol-related disorders", "Patient has alcohol-related disorders")}
          {renderCheckbox("diag_Other_specified_and_unspecified_liver_disease", "Other specified and unspecified liver disease", "Patient has other specified or unspecified liver disease")}
          {renderCheckbox("diag_Septicemia", "Septicemia", "Patient diagnosed with septicemia")}
          {renderCheckbox("diag_Schizophrenia_spectrum_and_other_psychotic_disorders", "Schizophrenia spectrum and other psychotic disorders", "Patient has schizophrenia spectrum or other psychotic disorders")}
          {renderCheckbox("diag_Symptoms_of_mental_and_substance_use_conditions", "Symptoms of mental and substance use conditions", "Patient shows symptoms of mental and substance use conditions")}
          {renderCheckbox("diag_Respiratory_failure_insufficiency_arrest", "Respiratory failure; insufficiency; arrest", "Patient has respiratory failure, insufficiency, or arrest")}
          {renderCheckbox("diag_Pressure_ulcer_of_skin", "Pressure ulcer of skin", "Patient has pressure ulcer of skin")}
          {renderCheckbox("diag_Genitourinary_signs_and_symptoms", "Genitourinary signs and symptoms", "Patient shows genitourinary signs and symptoms")}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Lab Values</h3>
        <label className="block">
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

"""
FastAPI application for delirium risk prediction.

This module defines the FastAPI application and its endpoints for predicting
delirium risk using an XGBoost model.
"""

import json
from typing import List

import numpy as np
import xgboost as xgb
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field


app = FastAPI()

# Load the XGBoost model from JSON file
with open("xgboost_model.json", "r") as f:
    model_json = json.load(f)
model = xgb.Booster()
model.load_model("xgboost_model.json")


class PredictionInput(BaseModel):
    """
    Input data structure for delirium risk prediction.

    Attributes
    ----------
    features : List[float]
        List of float values representing the input features for prediction.
    """

    features: List[float] = Field(
        ..., description="List of input features for prediction"
    )


class PredictionOutput(BaseModel):
    """
    Output data structure for delirium risk prediction.

    Attributes
    ----------
    prediction : float
        Predicted risk score for delirium.
    risk_category : str
        Categorization of the risk level (e.g., "Low", "Moderate", "High").
    recommendation : str
        Recommended action based on the risk level.
    """

    prediction: float = Field(..., description="Predicted risk score")
    risk_category: str = Field(..., description="Risk level category")
    recommendation: str = Field(..., description="Recommended action")


@app.post("/predict", response_model=PredictionOutput)
async def predict(input_data: PredictionInput) -> PredictionOutput:
    """
    Predict delirium risk based on input features.

    Parameters
    ----------
    input_data : PredictionInput
        Input data containing features for prediction.

    Returns
    -------
    PredictionOutput
        Prediction results including risk score, category, and recommendation.

    Raises
    ------
    HTTPException
        If there's an error during prediction process.
    """
    try:
        # Convert input features to DMatrix
        dmatrix = xgb.DMatrix(np.array([input_data.features]))

        # Make prediction
        prediction = model.predict(dmatrix)[0]

        # Determine risk category and recommendation
        risk_category, recommendation = categorize_risk(prediction)

        return PredictionOutput(
            prediction=float(prediction),
            risk_category=risk_category,
            recommendation=recommendation,
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e)) from e


def categorize_risk(risk_score: float) -> tuple[str, str]:
    """
    Categorize the risk level and provide a recommendation based on the risk score.

    Parameters
    ----------
    risk_score : float
        Predicted risk score.

    Returns
    -------
    tuple
        A tuple containing the risk category and recommendation.
    """
    if risk_score < 0.3:
        return "Low", "Continue routine monitoring"
    if risk_score < 0.6:
        return "Moderate", "Implement preventive measures"

    return "High", "Urgent intervention required"


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

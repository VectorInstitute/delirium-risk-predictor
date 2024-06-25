"""Routes."""

import logging

from fastapi import APIRouter

from api.predict import predict


router = APIRouter()

LOGGER = logging.getLogger("uvicorn.error")

router.add_api_route("/predict", predict, methods=["POST"])

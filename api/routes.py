"""Routes."""

from fastapi import APIRouter

from api.predict import predict


router = APIRouter()

router.add_api_route("/predict", predict, methods=["POST"])

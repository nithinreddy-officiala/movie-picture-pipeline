import os

from flask import Flask
from flask_cors import CORS

from .movies import movies_api


def build_app():
    """Create and configure the Flask service."""
    service = Flask(__name__)
    CORS(service)
    service.register_blueprint(movies_api)
    return service


app = build_app()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("FLASK_RUN_PORT", 5000)),
        debug=True,
    )

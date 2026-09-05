from flask import Blueprint, jsonify

from .resources import MOVIE_CATALOG, movie_by_id

movies_api = Blueprint("movie_service", __name__)


@movies_api.get("/movies")
def list_movies():
    """Return the small catalog used by the demo application."""
    return jsonify({"movies": [movie.as_public() for movie in MOVIE_CATALOG]})


@movies_api.get("/movies/<int:movie_id>")
def get_movie(movie_id):
    movie = movie_by_id(movie_id)
    if movie is None:
        return jsonify({"error": "movie not found"}), 404
    return jsonify({"movie": movie.as_detail()})

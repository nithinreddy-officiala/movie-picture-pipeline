import os

from . import app


def _movies_response():
    with app.test_client() as client:
        return client.get("/movies")


def test_movie_route_is_available():
    response = _movies_response()
    expected_status = 500 if os.getenv("FAIL_TEST") else 200
    assert response.status_code == expected_status


def test_movie_route_returns_json():
    response = _movies_response()
    assert response.is_json
    assert response.content_type == "application/json"


def test_movie_catalog_contains_expected_shape():
    payload = _movies_response().get_json()
    assert isinstance(payload, dict)
    movies = payload["movies"]
    assert isinstance(movies, list)
    assert {"id", "title"}.issubset(movies[0])
    assert {"Top Gun: Maverick", "Sonic the Hedgehog", "A Quiet Place"}.issubset(
        {item["title"] for item in movies}
    )

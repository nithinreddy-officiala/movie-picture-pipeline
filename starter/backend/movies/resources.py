from dataclasses import dataclass


@dataclass(frozen=True)
class Movie:
    identifier: int
    title: str
    description: str

    def as_public(self):
        return {"id": self.identifier, "title": self.title}

    def as_detail(self):
        return {
            "id": self.identifier,
            "title": self.title,
            "description": self.description,
        }


MOVIE_CATALOG = (
    Movie(123, "Top Gun: Maverick", "Fighter planes"),
    Movie(456, "Sonic the Hedgehog", "Blue Sega character"),
    Movie(789, "A Quiet Place", "Scary monsters"),
)


def movie_by_id(identifier):
    return next((movie for movie in MOVIE_CATALOG if movie.identifier == identifier), None)

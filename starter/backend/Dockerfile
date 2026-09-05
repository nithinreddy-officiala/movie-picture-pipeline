FROM public.ecr.aws/docker/library/python:3.10-slim-bullseye

ENV PYTHONDONTWRITEBYTECODE=1 \
    FLASK_RUN_HOST=0.0.0.0 \
    PIP_NO_CACHE_DIR=1

WORKDIR /service

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
       gcc \
       build-essential \
       python3-dev \
       libpcre3-dev \
       libssl-dev \
       libffi-dev \
    && rm -rf /var/lib/apt/lists/*

RUN pip install pipenv

COPY Pipfile Pipfile.lock ./

RUN pipenv install --system --deploy

COPY . .

EXPOSE 5000

CMD ["uwsgi", "--http", ":5000", "--master", "--enable-threads", "-s", "/tmp/app.sock", "--manage-script-name", "--mount", "/=app:app"]
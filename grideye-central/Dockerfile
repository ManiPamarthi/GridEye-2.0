# Using Debian 11 (bullseye) as base image, Python 3.11.3, slim version.
FROM python:3.11.3-slim-bullseye


# Redhat image (Python 3.11)
# FROM registry.access.redhat.com/ubi9/python-311:1-7

# Fedora image (Python 3.11)
# FROM quay.io/fedora/python-311:311

RUN pip install poetry==1.5.0

# Configuring poetry
RUN poetry config virtualenvs.create false

# Copying requirements of a project
COPY config.json /app/src/
COPY pyproject.toml poetry.lock /app/src/
WORKDIR /app/src

# Installing requirements
RUN poetry install

# Was copying over the deploy directory initially, but was facing problems with
# the docker compose and Dockerfile not being in the same directory as the app.
#COPY deploy /app/src/

# Copying actual application
COPY . /app/src/
RUN poetry install

CMD ["/usr/local/bin/python", "-m", "grideye"]

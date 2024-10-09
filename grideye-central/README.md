# Grideye Central

This project was generated using ***fastapi_template***.

***fastapi_template*** Resources:
 - Python package: https://pypi.org/project/fastapi-template/
 - Repository: https://github.com/s3rius/FastAPI-template
 - Repository (Backup): https://github.com/devintm/FastAPI-template/
 - Documentation: https://fastapi.tiangolo.com/

## Poetry Setup

This project uses poetry. It's a modern dependency management tool.

To run the project use this set of commands:

```bash
poetry install
```

```bash
poetry run python -m grideye
```

This will start the server on the configured host.

You can find swagger documentation at `/api/docs`.

You can read more about poetry here: https://python-poetry.org/

## Docker (optional)

The docker setup is useful while testing during development. We can build and test the
project in a clean environment i.e. Redhat 8 or even against a different
version of Python.

You can build with docker using this command:

```bash
docker-compose -f deploy/docker-compose.yml --project-directory . up --build
```

If you want to develop in docker with autoreload add `-f deploy/docker-compose.dev.yml` to your docker command.
Like this:

```bash
docker-compose -f deploy/docker-compose.yml -f deploy/docker-compose.dev.yml --project-directory . up
```

This command exposes the web application on port 8000, mounts current directory and enables autoreload.

### Docker Dependency Changes!

**_Important note!_**

You have to rebuild image every time you modify `poetry.lock` or `pyproject.toml` with this command:

```bash
docker-compose -f deploy/docker-compose.yml --project-directory . build
```

## Project structure

```bash
$ tree "grideye"
grideye
├── conftest.py  # Fixtures for all tests.
├── db  # module contains db configurations
│     ├── dao  # Data Access Objects. Contains different classes to interact with database.
│     └── models  # Package contains different models for ORMs.
├── __main__.py  # Startup script. Starts uvicorn.
├── services  # Package for different external services such as rabbit or redis etc.
├── settings.py  # Main configuration settings for project.
├── static  # Static content.
├── tests  # Tests for project.
└── web  # Package contains web server. Handlers, startup config.
    ├── api  # Package with all handlers.
    │     └── router.py  # Main router.
    ├── application.py  # FastAPI application configuration.
    └── lifetime.py  # Contains actions to perform on startup and shutdown.
```

## Configuration

This application can be configured with environment variables.

You can create `.env` file in the root directory and place all
environment variables here.

All environment variables should start with "GRIDEYE_" prefix.

For example if you see in your "grideye/settings.py" a variable named like
`random_parameter`, you should provide the "GRIDEYE_RANDOM_PARAMETER"
variable to configure the value. This behaviour can be changed by overriding `env_prefix` property
in `grideye.settings.Settings.Config`.

An example of .env file:
```bash
GRIDEYE_RELOAD="True"
GRIDEYE_PORT="8000"
GRIDEYE_ENVIRONMENT="dev"
```

You can read more about BaseSettings class here: https://pydantic-docs.helpmanual.io/usage/settings/

## Pre-commit

To install pre-commit simply run inside the shell:
```bash
pre-commit install
```

pre-commit is very useful to check your code before publishing it.
It's configured using .pre-commit-config.yaml file.

By default it runs:
* black (formats your code);
* mypy (validates types);
* isort (sorts imports in all files);
* flake8 (spots possible bugs);


You can read more about pre-commit here: https://pre-commit.com/


## Running tests

If you want to run it in docker, simply run:

```bash
docker-compose -f deploy/docker-compose.yml --project-directory . run --rm api pytest -vv .
docker-compose -f deploy/docker-compose.yml --project-directory . down
```

For running tests on your local machine.


2. Run the pytest.
```bash
pytest -vv .
```



## Building the project

### Build Dependencies.

* Python 3.11
* poetry
* The `config.json` file in the root directory of the project.
* The project root directory must not have a space in the name.

> **Warning:**
> If the project repository has a space in the name, it will cause problems 
> when pybuilder adds the paths; it will add two items to the path by
> splitting on the space.

### Build Instructions
To build the project with pybuilder, the following steps need to be followed:

* Generate the latest requirements.txt file.

```bash
cd GRIDEYE2.0
# Make sure the dependencies are installed and up to date with poetry.
poetry install
# Generate the requirements.txt file.
poetry export --without-hashes --format=requirements.txt > requirements.txt
cat requirements.txt
```

* Clear all the python cache files:

```bash
find . | grep -E "(/__pycache__$|\.pyc$|\.pyo$)" | xargs rm -rf
```

* Ensure pyinstaller is installed with Python 3.11:

```bash
which python3.11
python3.11 -m pip install pyinstaller
```

* Create a virtual environment using venv for the project:

```bash
python3.11 -m venv env
source env/bin/activate
pip install -r requirements.txt
```

* Build the project into a unix executable with pyinstaller (debugging):

```bash
# Use pyinstaller to build the executable
# Arguments:
#   --debug=all: if we need to print debug information, we can use this option.
#   --clean: remove temporary files before building.
#   --noconfirm: do not ask for confirmation; useful for CI/CD automation.
#   --onefile: create a single executable (default is directory with the executable and
#               library files separated)
#   --paths: add paths to search for imports. The `env` directory is the project's
#               virtual environment and was created with `venv` module.
#   --add-data: add data files to the executable. We need to include the config.json
#               file and the static directory.
pyinstaller --clean --noconfirm --onefile --noconsole \
  --debug=all \
  --name="grideye-central-debug" \
  --paths="grideye" \
  --paths="./env/lib/python3.11/site-packages" \
  --paths="./env/lib64/python3.11/site-packages" \
  --hidden-import="grideye" \
  --hidden-import="grideye.web" \
  --hidden-import="grideye.web.application" \
  --add-data="./config.json:." \
  grideye/__main__.py
```



* Build the project into a unix executable with pyinstaller (production):

```bash
pyinstaller --clean --noconfirm --onefile --noconsole \
  --name="grideye-central-production" \
  --paths="grideye" \
  --paths="./env/lib/python3.11/site-packages" \
  --paths="./env/lib64/python3.11/site-packages" \
  --hidden-import="grideye" \
  --hidden-import="grideye.web" \
  --hidden-import="grideye.web.application" \
  --add-data="./config.json:." \
  grideye/__main__.py
```

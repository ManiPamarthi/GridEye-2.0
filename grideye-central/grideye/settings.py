"""The main project settings. It will load the config.json on application start."""
import enum
import logging
from json import JSONDecodeError
from json import load as json_load
from pathlib import Path
from tempfile import gettempdir

from pydantic import BaseModel, BaseSettings, ValidationError

TEMP_DIR = Path(gettempdir())

# Capture all warnings with the logger.
logging.captureWarnings(True)


# ===== Constants =====
UTF8: str = "utf-8"


class LogLevel(str, enum.Enum):  # noqa: WPS600
    """Possible log levels."""

    NOTSET = "NOTSET"
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    FATAL = "FATAL"


class ConfigJsonFileSettings(BaseModel):
    """NIST NVD API settings from the config.json file."""

    # Application settings
    SYNC_INTERVAL_IN_DAYS: int
    # NVD API settings
    NIST_NVD_API_URL: str
    NIST_NVD_API_KEY: str
    NIST_NVD_API_TIMEOUT: int
    # elasticsearch db settings
    GRIDEYE_DATABASE_URL: str
    GRIDEYE_DATABASE_USERNAME: str
    GRIDEYE_DATABASE_PASSWORD: str
    GRIDEYE_DATABASE_CA_CERT_PATH: str
    # elasticsearch index names
    NVD_CVE_INDEX: str
    NVD_AUDIT_INDEX: str
    TOPOLOGY_INDEX: str
    # Log file settings
    LOG_FILE_PATH: str


class Settings(BaseSettings):
    """
    Application settings.

    These parameters can be configured
    with environment variables.
    """

    # ===== Environment settings =====
    environment: str = "dev"

    # ===== Server (uvicorn) settings =====
    host: str = "0.0.0.0"
    port: int = 8000
    # quantity of workers for uvicorn
    workers_count: int = 1
    # Enable uvicorn reloading
    reload: bool = False

    # ===== Logger settings =====
    log_level: LogLevel = LogLevel.INFO

    # ===== Grideye Central settings =====
    # NIST NVD Configuration (loaded from config.json)
    config_file_loaded: bool = False
    # Value is empty until we load in the config.json
    config_file_settings: ConfigJsonFileSettings

    class Config:
        """env file settings."""

        env_file = "../.env"
        env_prefix = "GRIDEYE_"
        env_file_encoding = UTF8

    def get_config_file_settings(self) -> ConfigJsonFileSettings:
        """
        Get or create the config_settings_json object.

        :return: ConfigJsonFileSettings
        """
        if self.config_file_loaded is False:
            self.config_file_settings = self.load_config_json_file()
            self.config_file_loaded = True  # noqa: WPS601
        return self.config_file_settings

    # Get the defined settings from the config JSON file.
    @staticmethod
    def load_config_json_file() -> ConfigJsonFileSettings:
        """
        Load the 'config.json' file.

        :return: Configuration from config.json file in a ConfigJsonFileSettings object.
        :raises JSONDecodeError: if the config.json file is not valid JSON.
        :raises ValidationError: pydantic error- if a required field is missing.
        :raises Exception: if there is any other exception while loading the file.
        """
        # Load the config.json file.
        try:
            with open("./config.json", encoding=UTF8) as config_file:
                data = json_load(config_file)
            config = ConfigJsonFileSettings(**data)
            return config  # noqa: WPS331
        except JSONDecodeError as exc:
            logger("ERROR: The config.json file is not valid JSON!", LogLevel.ERROR)
            raise exc
        except ValidationError as exc:
            logger(
                "A required field may be missing/misspelled in the config.json. "
                f"[ValidationError: {exc.errors()}]",
                LogLevel.ERROR,
            )
            raise exc
        except Exception as exc:
            logger(f"The config.json failed to load. [exc: {exc}]", LogLevel.ERROR)
            raise exc


def logger(msg: str, log_level: LogLevel = LogLevel.INFO) -> bool:
    """
    Create a logger instance.

    :param msg: Message to log.
    :param log_level: Log level.
    :return: bool: if the logger was successful.

    .. note::
        TODO - This is a simple logger that will log to the console. We need to change
        to log to a file or push the logs to a log aggregator.
    """
    print(f"[{log_level.upper()}] {msg}")  # noqa: WPS421
    return True


# Create a single instance of the settings
config_file_settings: ConfigJsonFileSettings = Settings.load_config_json_file()
settings: Settings = Settings(config_file_settings=config_file_settings)

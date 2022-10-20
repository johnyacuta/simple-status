from pydantic import BaseSettings


class Settings(BaseSettings):
    API_ENDPOINT: str = 'http://localhost:8000'
    UI_ENDPOINT: str = 'http://localhost:3000'


class DefaultService(BaseSettings):
    name: str = "Simple Status"
    url: str = "http://localhost:8000/healthz"
    category: str = "API"
    description: str = "A simple status page."


settings = Settings()
default_service = DefaultService()

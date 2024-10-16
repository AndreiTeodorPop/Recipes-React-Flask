from decouple import config


class Config:
    SECRET_KEY = config("SECRET_KEY")
    SQL_ALCHEMY_TRACK_MODIFICATIONS = config("SQL_ALCHEMY_TRACK_MODIFICATIONS", cast=bool)


class DevConfig(Config):
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:password@localhost/recipe-tracker'
    # SQLALCHEMY_DATABASE_URI = "sqlite:///dev.db"
    SQL_ALCHEMY_ECHO = True
    DEBUG = True


class ProdConfig(Config):
    pass


class TestConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///test.db"
    SQL_ALCHEMY_ECHO = False
    TESTING=True

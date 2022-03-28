from operator import imod
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_migrate import Migrate

app = Flask(__name__)
app.config.from_object(Config)
#Init db
db = SQLAlchemy(app)
#Init Marshmallow
ma = Marshmallow(app)
#Init flask migrate
migrate = Migrate(app, db)

from app import routes, models
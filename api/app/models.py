from operator import index
from pydoc import describe
from unicodedata import category
from app import db
from werkzeug.security import check_password_hash, generate_password_hash

class Role(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    role = db.Column(db.String(64), index=True, unique=True)
    description = db.Column(db.String(200))
    user = db.relationship('User', backref='access', lazy='dynamic')

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    firstname = db.Column(db.String(64), index=True)
    lastname = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    phone = db.Column(db.Integer(), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    role_id = db.Column(db.Integer(), db.ForeignKey('role.id'), nullable=True)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return '<User {}>'.format(self.email)


class Category(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    category = db.Column(db.String(64), index=True)
    product = db.relationship('Product', backref='class', lazy='dynamic')


class Product(db.Model):
     id = db.Column(db.Integer(), primary_key=True)
     productname = db.Column(db.String(256), index=True)
     description = db.Column(db.String(128), index=True)
     price = db.Column(db.Integer(), index=True)
     quantity = db.Column(db.Integer(), index=True)
     category_id = db.Column(db.Integer(), db.ForeignKey('category.id'), nullable=True)
    




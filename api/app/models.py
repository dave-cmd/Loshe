from datetime import datetime
from email.policy import default
from enum import unique
from operator import index
from pydoc import describe
from sqlite3 import Timestamp
from unicodedata import category

from sqlalchemy import true
from app import db
from werkzeug.security import check_password_hash, generate_password_hash

class Role(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    role = db.Column(db.String(64), index=True, unique=True)
    description = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, index=True, nullable=True)
    user = db.relationship('User', backref='access', lazy='dynamic')

class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    firstname = db.Column(db.String(64), index=True)
    lastname = db.Column(db.String(64), index=True)
    email = db.Column(db.String(120), index=True, unique=True)
    phone = db.Column(db.Integer(), index=True, unique=True)
    owner = db.Column(db.Integer(), index=True, nullable=True)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, index=True, nullable=True)
    password_hash = db.Column(db.String(128))
    store = db.relationship('Store', backref='manager', lazy='dynamic')

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
    owner = db.Column(db.Integer(), index=True, nullable=True)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, index=True, nullable=True)

class Product(db.Model):
     id = db.Column(db.Integer(), primary_key=True)
     productname = db.Column(db.String(12), index=True)
     description = db.Column(db.String(256), index=True)
     price = db.Column(db.Integer(), index=True)
     quantity = db.Column(db.Integer(), index=True)
     location = db.Column(db.String(128), index=True)
     created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
     updated_at = db.Column(db.DateTime, index=True)
     owner = db.Column(db.Integer(), index=True, nullable=True)
     created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
     updated_at = db.Column(db.DateTime, index=True, nullable=True)
     category_id = db.Column(db.Integer(), db.ForeignKey('category.id'), nullable=True)
     orders = db.relationship('Order', backref='productorders', lazy='dynamic')
    

class Store(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    storename = db.Column(db.String(128), index=True, unique=True)
    region = db.Column(db.String(128), index=True)
    owner = db.Column(db.Integer(), index=True, nullable=True)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, index=True, nullable=True)
    user_id = db.Column(db.Integer(), db.ForeignKey('user.id'), nullable=True)
    orders = db.relationship('Order', backref='storeorders', lazy='dynamic')



class Order(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    quantity = db.Column(db.Integer(), index=True)
    timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    owner = db.Column(db.Integer(), index=True, nullable=True)
    updated_at = db.Column(db.DateTime, index=True, nullable=True)
    store_id = db.Column(db.Integer, db.ForeignKey('store.id'))
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'))


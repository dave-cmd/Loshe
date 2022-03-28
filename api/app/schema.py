from dataclasses import fields
from app import ma

class RoleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'role', 'description', 'user')


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstname', 'lastname', 'email', 'phone', 'password_hash', 'store', 'role_id')


class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'category', 'product')

class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'productname', 'description', 'price', 'quantity', 'category_id')


class StoreSchema(ma.Schema):
    class Meta:
        fields = ('id', 'storename', 'region', 'user_id')
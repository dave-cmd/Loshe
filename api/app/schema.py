from dataclasses import fields
from app import ma

class RoleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'role', 'description', 'created_at', 'updated_at', 'user')


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'firstname', 'lastname', 'email', 'phone','created_at', 'updated_at', 'owner', 'password_hash', 'store_id', 'role_id')


class CategorySchema(ma.Schema):
    class Meta:
        fields = ('id', 'category', 'created_at', 'updated_at', 'owner', 'product_id')

class ProductSchema(ma.Schema):
    class Meta:
        fields = ('id', 'productname', 'description', 'price', 'quantity', 'location', 'created_at', 'updated_at', 'owner', 'category_id')


class StoreSchema(ma.Schema):
    class Meta:
        fields = ('id', 'storename', 'region' ,'created_at', 'updated_at', 'owner', 'users')


class OrderSchema(ma.Schema):
    class Meta:
        fields = ('id', 'quantity', 'timestamp', 'status','created_at', 'updated_at', 'owner', 'product_id', 'store_id')
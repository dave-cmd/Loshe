
import json
import re
from unicodedata import category
from urllib import response
from app import app, db
from flask import jsonify, request
import time
import secrets
from app.models import User, Role, Category, Product

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

@app.route("/api/login", methods=['POST', 'GET'])
def login():

    json_data = request.get_json()
    user = User.query.filter_by(email=json_data['email']).first()
    
    if user:
        if user.check_password(json_data['password']):
            return jsonify({
                "token": secrets.token_hex()
            })
        else:
            return jsonify({
                "token_invalid" : ""
            })
    else:
        return jsonify({
        "user": "This user does not exist!"
        })

@app.route("/api/signup", methods=['POST', 'GET'])
def signup():

    if request.method == 'POST':
        json_data = request.get_json()
        print(json_data["email"])
        user = User.query.filter_by(email=json_data["email"]).first()
        print(user)

        if user != None:
            print("A user with the same credentials exists!")
            return jsonify({
                "Error": "User with this email already exists!"
            })

        else:
            post_user = User(
                    firstname = json_data["firstname"],
                    lastname = json_data["lastname"],
                    email =  json_data["email"],
                    phone =  json_data["phone"],
            )

            post_user.set_password(json_data["password"])

            #check if email is admin email
            if json_data['email'] in app.config['ADMIN_EMAILS']:
                post_user.role_id = 1
            else:
                post_user.role_id = 2

            db.session.add(post_user)
            db.session.commit()

            print("User registration success!")

    return jsonify({
        "route": "Sign up!"
    })

@app.route("/api/createStore", methods=['POST'])
def createStore():
    if request.method == 'POST':
        data = request.get_json()
        print(data)


@app.route("/api/createInventory", methods=['POST', 'GET'])
def createInventory():

    if request.method == 'POST':
        #Form json data
        json_data = request.get_json()

        #Product and Category instances
        product = Product.query.filter_by(productname=json_data["productname"]).first()
        product_category = Category.query.filter_by(category=json_data["category"]).first()

        if product != None:
            print("Product already exists!")
            return jsonify({
                "Error": "Product with this already exists!"
            })

        elif product == None and product_category == None:

            #Category instance
            post_category = Category(
                category = json_data['category']
            )

            #Product instance
            post_product = Product(
                    productname = json_data["productname"],
                    description = json_data["description"],
                    price =  json_data["price"],
                    quantity =  json_data["quantity"]
            )

            post_category.product.append(post_product)

            db.session.add(post_product)
            db.session.add(post_category)
            db.session.commit()
            print("Successfully added!")

            return jsonify({
                "status": 200
            })

        elif product_category != None and product_category == None:
            #Product instance
            post_product = Product(
                    productname = json_data["productname"],
                    description = json_data["description"],
                    price =  json_data["price"],
                    quantity =  json_data["quantity"]
            )

            #Append Product instance to Category instance backref
            product_category.product.append(post_product)
            
            #Stage and commit 
            db.session.add(post_product)
            db.session.commit()
            print("Successfully added 2!")

            return jsonify({
                "status": 200
            })
            
            
    return jsonify({
        "route": "Sign up!"
    })

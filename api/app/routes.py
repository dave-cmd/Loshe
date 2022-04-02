
from crypt import methods
from urllib import response
from app import app, db
from flask import jsonify, request
import time
import secrets
from app.models import User, Role, Category, Product, Store
from app.schema import UserSchema, RoleSchema, CategorySchema, ProductSchema, StoreSchema 

#Init Schema

#User
user_schema = UserSchema()
users_schema = UserSchema(many=True)

#Role
role_schema = RoleSchema()
roles_schema = RoleSchema(many=True)

#Category
category_schema = CategorySchema()
categories_schema = CategorySchema(many=True)

#Product
product_schema = ProductSchema()
products_schema = ProductSchema(many=True)

#Store
store_schema = StoreSchema()
stores_schema = StoreSchema(many=True)



@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

#Login
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

#Sigup
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

#Create Inventory
@app.route("/api/createInventory", methods=['POST', 'GET'])
def createInventory():

    if request.method == 'POST':
        #Form json data
        json_data = request.get_json()

        #Product and Category instances
        product = Product.query.filter_by(productname=json_data["productname"]).first()
        product_category = Category.query.filter_by(category=json_data["category"]).first()

        print(json_data)
        print(product)
        print(product_category)

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
                "status1": 200
            })

        elif product == None and product_category != None:
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
                "status2": 200
            })            
    return jsonify({
        "route": "Create Inventory!"
    })

#Create Store
@app.route("/api/createStore", methods=['POST', 'GET'])
def createStore():

    if request.method == 'POST':
        #Form json data
        json_data = request.get_json()

        #Product and Category instances
        store = Store.query.filter_by(storename=json_data["storename"]).first()
        store_manager = User.query.filter_by(email=json_data["email"]).first()
        store_manager_phone = User.query.filter_by(phone=json_data["phone"]).first()

        #roles
        user_role = Role.query.filter_by(role=json_data['permission']).first()

        if store != None:
            print("Store already exists!")
            return jsonify({
                "Error": "A store with that name already exists."
            })

        elif store == None and store_manager == None and store_manager_phone == None:
            #Store manager instance
            manager = User(
                firstname = json_data['firstname'],
                lastname = json_data['lastname'],
                email = json_data['email'],
                phone = json_data['phone']
            )

            manager.set_password(json_data['password'])

            #Product instance
            post_store = Store(
                    storename = json_data["storename"],
                    region = json_data["region"],

            )
            if user_role != None:
                user_role.user.append(manager)
            
            
            manager.store.append(post_store)
            # post_store.product.append(post_product)

            db.session.add(manager)
            db.session.add(post_store)
            db.session.commit()
            print("Successfully added store & manager----------------")
            print(user_role.role)

            return jsonify({
                "status": "Resource created 1."
            })

        elif store == None and store_manager != None:
            #Product instance
            post_store = Store(
                storename = json_data['storename'],
                region= json_data['region']
            )

            #Append Store instance to User instance backref
            store_manager.store.append(post_store)
            
            if user_role != None:
                user_role.user.append(store_manager)

            #Stage and commit 
            db.session.add(post_store)
            db.session.commit()
            print("Successfully added store to an existing manager!")

            return jsonify({
                "status": "Resource Created 2!"
            })

        elif store == None and store_manager_phone != None:
            #Product instance
            post_store = Store(
                storename = json_data['storename'],
                region= json_data['region']
            )

            #Append Store instance to User instance backref
            store_manager_phone.store.append(post_store)
            user_role.user.append(store_manager)

            #Stage and commit 
            db.session.add(post_store)
            db.session.commit()
            print("Successfully added store to an existing manager phone!")

            return jsonify({
                "status": "Resource Created 3!"
            })

    return jsonify({
        "route": "Create Store!"
    })

#Get staff
@app.route("/api/getStaff", methods=['GET', 'POST'])
def getStaff():
    if request.method == 'GET':
        #Get all staff
        users = User.query.all()
        result = users_schema.dump(users)

        # serialize the AppenderBaseQueryProperty
        for user in result:
            if len(list(user['store']) ) <= 1:
                user['store'] = user_schema.dump(user['store'])
            elif len(list(user['store']) ) > 1:
                user['store'] = users_schema.dump(user['store'])
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getStaff"
        })


#Get staff by Id
@app.route("/api/staff/<int:id>", methods=['GET', 'POST'])
def staff(id):
    if request.method == 'GET':
        user = User.query.filter_by(id=id).first()
        print(len(list(user.store)),"------------")
        #user = user_schema.dump(user)
        # if len(list(user['store']) ) <= 1:
        if len(list(user.store) ) == 0:
            # user['store'] = store_schema.dump(user['store'])
            dump_store = store_schema.dump(list(user.store))
            print(dump_store)
            # print(user['store'])
        # elif len(list(user['store']) ) > 1:
        elif len(list(user.store) ) <= 1:
            # user['store'] = store_schema.dump(user['store'])
            dump_store = store_schema.dump(list(user.store)[0])
            print(dump_store)
            # print(user['store'])
        # elif len(list(user['store']) ) > 1:
        elif len(list(user.store) ) > 1:
            # user['store'] = stores_schema.dump(user['store'])
            dump_store = stores_schema.dump(list(user.store))
            print(dump_store)
            # print(stores_schema.dump(user['store']))
        
        # print(user)
        user = user_schema.dump(user)
        user['store'] = dump_store
        
    return jsonify(user)


#Get role by Id
@app.route("/api/role/<int:id>", methods=['GET', 'POST'])
def role(id):
    if request.method == 'GET':
        role_inst = Role.query.filter_by(id=id).first()
        if role_inst != None:
            res = { 'role' : role_inst.role }
            return jsonify(res)
        else:
            return jsonify({
                'role': None
            })
    else:
        return jsonify(
            {
            'route': 'get role!'
            }
        )

#Get roles
@app.route("/api/getRoles", methods=['GET', 'POST'])
def getRoles():
    if request.method == 'GET':
        #Get all roles
        roles = Role.query.all()
        result = roles_schema.dump(roles)

        # serialize the AppenderBaseQueryProperty
        for role in result:
            if len(list(role['user']) ) <= 1:
                role['user'] = role_schema.dump(role['user'])
            elif len(list(role['user']) ) > 1:
                role['user'] = roles_schema.dump(role['user'])
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getRoles"
        })


#Get category
@app.route("/api/category/<int:id>", methods=['GET', 'POST'])
def category(id):
    if request.method == 'GET':
        category_inst = Category.query.filter_by(id=id).first()
        if category_inst != None:
            res = { 'category' : category_inst.category }
            return jsonify(res)
        else:
            return jsonify({
                'category': None
            })
    else:
        return jsonify(
            {
            'route': 'get category!'
            }
        )

#Get categories
@app.route('/api/getCategories', methods=['GET', 'POST'])
def getCategories():
    if request.method == 'GET':
        #Get all categories
        categories = Category.query.all()
        result = categories_schema.dump(categories)

        # serialize the AppenderBaseQueryProperty
        for category in result:
            if len(list(category['product']) ) <= 1:
                category['product'] = user_schema.dump(category['product'])
            elif len(list(category['product']) ) > 1:
                category['product'] = users_schema.dump(category['product'])
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getCategories"
        })

#Get product
@app.route("/api/product/<int:id>", methods=['GET', 'POST'])
def product(id):
    if request.method == 'GET':
        product_inst = Product.query.filter_by(id=id).first()
        product_inst = product_schema.dump(product_inst)

        return jsonify(product_inst)
    else:
        return jsonify(
            {
            'route': 'get product!'
            }
        )

#Get products
@app.route("/api/getProducts", methods=['GET', 'POST'])
def getProducts():
    if request.method == 'GET':
        #Get all staff
        products = Product.query.all()
        result = products_schema.dump(products)
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getProducts"
        })

#Get store
@app.route("/api/store/<int:id>", methods=['GET', 'POST'])
def store(id):
    if request.method == 'GET':
        store_inst = Store.query.filter_by(id=id).first()
        if store_inst != None:
            store_inst = store_schema.dump(store_inst)
            return jsonify(store_inst)
        else:
            return jsonify({
                'store': None
            })
    else:
        return jsonify(
            {
            'route': 'get store!'
            }
        )

#Gef stores
@app.route("/api/getStores")
def getStore():
    if request.method == 'GET':
        #Get all Stores
        stores = Store.query.all()
        result = stores_schema.dump(stores)
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getStores"
        })


#Delete staff
@app.route("/api/deleteStaff/<int:id>", methods=['DELETE', 'GET'])
def deleteStaff(id):
    if request.method == 'DELETE':
        staff = User.query.get(id)
        db.session.delete(staff)
        db.session.commit()
        return jsonify({
            "res": 200
        })

    return jsonify({
        "route": "deleteStaff"
    })

#Delete inventory
@app.route("/api/deleteInventory/<int:id>", methods=['DELETE', 'GET'])
def deleteInventory(id):
    if request.method == 'DELETE':
        product = Product.query.get(id)
        db.session.delete(product)
        db.session.commit()
        return jsonify({
            "res": 200
        })

    return jsonify({
        "route": "deleteInventory"
    })

#Delete store
@app.route("/api/deleteStore/<int:id>", methods=['DELETE', 'GET'])
def deleteStore(id):
    if request.method == 'DELETE':
        store = Store.query.get(id)
        db.session.delete(store)
        db.session.commit()
        return jsonify({
            "res": 200
        })

    return jsonify({
        "route": "deleteStore"
    })

#Update staff
@app.route("/api/updateStaff/<int:id>", methods=['PATCH', 'GET'])
def updateStaff(id):
    #Get the form data
    form_data = request.get_json()
    if request.method == 'PATCH':
        staff = User.query.get(id)
        
        staff.firstname = form_data['firstname']
        staff.lastname = form_data['lastname']
        staff.role_id = Role.query.filter_by(role=form_data['role']).first().id

        #check if phone number already exixts
        user_phone = User.query.filter_by(phone=form_data['phone']).first()
        if user_phone == None:
            staff.email = form_data['email']
        
        #check if email already exits
        user_email = User.query.filter_by(email=form_data['email']).first()
        if user_email == None:
            staff.email = form_data['email']
            
        #check if password is empty
        if form_data["password"] != "":
            staff.set_password(form_data['password'])
        
        #stores
        stores_names_list = form_data['store'].split(",")

        #check if stores in database by storename
        for s in stores_names_list:
            s = s.strip()
            st = Store.query.filter_by(storename=s).first()
            print(st)
            if st != None:
                staff.store.append(st) 

        db.session.commit()
        return jsonify({
            "res": 200
        })
    return jsonify({
        "route": "updateStaff"
    })

#Update product
@app.route("/api/updateProduct/<int:id>", methods=['PATCH', 'GET'])
def updateProduct(id):
    if request.method == 'PATCH':
        #Get the form data
        form_data = request.get_json()

        #Query product with id
        product = Product.query.get(id)

        #Update product:
        if product != None:
            product.productname = form_data['productname']
            product.description = form_data['description']
            product.price  = form_data['price']
            product.quantity = form_data['quantity']

            #Query category by categoryname provided
            category_instance = Category.query.filter_by(category=form_data['category']).first()

            #check if category exists
            if category_instance != None:
                product.category_id = category_instance.id
            
            db.session.commit()

            return jsonify({
                "updateProduct": 200
            })
    return jsonify({
            "route": "updateProduct"
    })

#Update store
@app.route("/api/updateStore/<int:id>", methods=['PATCH', 'GET'])
def updateStore(id):
    if request.method == 'PATCH':
        #Get form data
        form_data = request.get_json()

        #Create a store instance
        store = Store.query.get(id)

        #Update store instance with form data
        if store!= None:
            store.storename = form_data['storename']
            store.region = form_data['region']

        #TODO: Update manager

        #Commit changes to database
        db.session.commit()

        return jsonify({
            "updateStore": 200
        })
    return jsonify ({
        "route": "updateStore"
    })



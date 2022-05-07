
from crypt import methods
import email
import json
from urllib import response
from app import app, db
from flask import jsonify, request
import time
import secrets
from datetime import datetime
from app.models import User, Role, Category, Product, Store, Order
from app.schema import UserSchema, RoleSchema, CategorySchema, ProductSchema, StoreSchema, OrderSchema 

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

#Order
order_schema = OrderSchema()
orders_schema = OrderSchema(many=True)

@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}

#Login
@app.route("/api/login", methods=['POST', 'GET'])
def login():
    #Get form data from request
    json_data = request.get_json()
    user = User.query.filter_by(email=json_data['email']).first()
    
    if user:
        if user.check_password(json_data['password']):
            #Get the by id
            role = Role.query.get(user.role_id).role
            return jsonify({
                "token": secrets.token_hex(),
                "id": user.id,
                "role": role,
                "owner": user.owner,
                "store": user.store_id

            })
        else:
            return jsonify({
                "token_invalid" : ""
            })
    else:
        return jsonify({
        "user": "This user does not exist!"
        })

#Create user/ Signup
@app.route("/api/signup", methods=['POST', 'GET'])
def signup():

    if request.method == 'POST':
        json_data = request.get_json()
        # print(json_data["email"])
        user_email = User.query.filter_by(email=json_data["email"].strip()).first()
        user_phone = User.query.filter_by(phone=json_data["phone"].strip()).first()
        # print(user)

        if user_phone != None or user_email != None:
            print("A user with the same credentials exists!")
            return jsonify({
                "Error": "User with this email already exists!"
            })

        else:
            post_user = User(
                    firstname = json_data["firstname"].strip(),
                    lastname = json_data["lastname"].strip(),
                    email =  json_data["email"].strip(),
                    phone =  json_data["phone"].strip(),
            )
            #Set the owner of admin user to 1000
            post_user.owner = 1000
            post_user.set_password(json_data["password"].strip())

            #Set Super/Admin
            if json_data['email'] in app.config['ADMIN_EMAILS']:
                role1  = Role.query.filter_by(role="Super").first()
                post_user.role_id = role1.id
            else:
                post_user.role_id = 2
                role2  = Role.query.filter_by(role="Admin").first()
                post_user.role_id = role2.id

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

        #Check if Product and Category instances exist
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
                category = json_data['category'],
                owner = json_data['owner']
            )

            #Product instance
            post_product = Product(
                    productname = json_data["productname"],
                    description = json_data["description"],
                    price =  json_data["price"],
                    quantity =  json_data["quantity"],
                    owner = json_data['owner']
            )

            post_product.location = "Warehouse"
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
                    quantity =  json_data["quantity"],
                    owner = json_data['owner']
            )
            post_product.location = "Warehouse"
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

#Get StoreInventory
def getStoreProducts(id):
    if request.method == 'GET':
        products = Product.query.filter_by(store_id=id).order_by(Order.timestamp.desc()).all()
        print(products)
        dumped_orders = orders_schema.dump(products)
        return jsonify(dumped_orders)

#Create Store
@app.route("/api/createStore", methods=['POST', 'GET'])
def createStore():

    if request.method == 'POST':
        #Form json data
        json_data = request.get_json()

        print(json_data)

        #Product and Category instances
        store = Store.query.filter_by(storename=json_data["storename"].strip()).first()
        store_manager = User.query.filter_by(email=json_data["email"].strip()).first()
        store_manager_phone = User.query.filter_by(phone=json_data["phone"]).first()

        #Manager 2
        set_manager_2 = False

        #Check if manager2 form details are empty
        if json_data["firstname2"] != '' and json_data["lastname2"] != '' and json_data["phone2"] != '' and json_data["email2"] != ''  and json_data["password2"] != '' and json_data["permission2"] != '':
            set_manager_2 = True
            store_manager2 = User.query.filter_by(email=json_data["email"].strip()).first()
            store_manager_phone2 = User.query.filter_by(phone=json_data["phone"]).first()
            user_role2 = Role.query.filter_by(role=json_data['permission'].strip()).first()
            print("------------Manager 2 engaged-------------")

              

        #roles
        user_role = Role.query.filter_by(role=json_data['permission'].strip()).first()

        if store != None:
            print("Store already exists!")
            return jsonify({
                "Error": "A store with that name already exists."
            })

        elif store == None and store_manager == None and store_manager_phone == None:
            #Store manager instance
            manager = User(
                firstname = json_data['firstname'].strip(),
                lastname = json_data['lastname'].strip(),
                email = json_data['email'].strip(),
                phone = json_data['phone'],
                owner = json_data['owner']
            )
            manager.set_password(json_data['password'].strip())

            #Store instance
            post_store = Store(
                    storename = json_data["storename"],
                    region = json_data["region"],
                    owner = json_data['owner']

            )
            if user_role != None:
                user_role.user.append(manager)
            
            
            # manager.store.append(post_store)
            post_store.users.append(manager)

            #Manager 2 logic
            if set_manager_2 and store_manager2 == None and store_manager_phone2 == None:
                #Store manager 2 instance
                manager2 = User(
                    firstname = json_data['firstname2'].strip(),
                    lastname = json_data['lastname2'].strip(),
                    email = json_data['email2'].strip(),
                    phone = json_data['phone2'],
                    owner = json_data['owner']
                )
                manager.set_password(json_data['password2'].strip())

                #Append manager2 to store and role
                post_store.users.append(manager2)
                user_role2.user.append(manager2)

            db.session.add(manager)
            db.session.add(post_store)
            db.session.commit()
            print("Successfully created new store and manager(s)----------------")
            print(user_role.role)

            return jsonify({
                "Success": "Resource created 1."
            })

        elif store == None and store_manager != None:
            #Product instance
            post_store = Store(
                storename = json_data['storename'].strip(),
                region= json_data['region'].strip(),
                owner = json_data['owner']
            )

            #Append Store instance to User instance backref
            # store_manager.store.append(post_store)
            post_store.users.append(store_manager)
            
            if user_role != None:
                user_role.user.append(store_manager)

            #Stage and commit 
            db.session.add(post_store)
            db.session.commit()
            print("Successfully added store to an existing manager!")

            return jsonify({
                "Success": "Resource Created 2!"
            })

        elif store == None and store_manager_phone != None:
            #Product instance
            post_store = Store(
                storename = json_data['storename'].strip(),
                region= json_data['region'].strip(),
                owner = json_data['owner']
            )

            #Append Store instance to User instance backref
            # store_manager_phone.store.append(post_store)
            post_store.users.append(store_manager_phone)
            user_role.user.append(store_manager)

            #Stage and commit 
            db.session.add(post_store)
            db.session.commit()
            print("Successfully added store to an existing manager phone!")

            return jsonify({
                "Success": "Resource Created 3!"
            })

    return jsonify({
        "route": "Create Store!"
    })

#Create Order
@app.route("/api/createOrder", methods=['GET', 'POST'])
def createOrder():
    #Get json data
    json_data = request.get_data()
    
    #Get data from post request
    if request.method == 'POST':
        Order( 
            quantity = json_data['quantity'],
            store_id = json_data['store_id'],
            product_id = json_data['order_id'],
            # owner = json_data['owner']
        )
    return jsonify({
            'route': 'createOrder'
        })

#Get Staff
@app.route("/api/getStaff", methods=['GET', 'POST'])
def getStaff():
    if request.method == 'GET':
        #Get all staff
        users = User.query.all()
        result = users_schema.dump(users)

        # serialize the AppenderBaseQueryProperty
        # for user in result:
        #     if len(list(user['store']) ) <= 1:
        #         user['store'] = user_schema.dump(user['store'])
        #     elif len(list(user['store']) ) > 1:
        #         user['store'] = users_schema.dump(user['store'])
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getStaff"
        })

#Get staff Admin/Stores owner
@app.route("/api/getStaffAdmin/<int:id>", methods=['GET', 'POST'])
def getStaffAdmin(id):
    if request.method == 'GET':
        #Get all staff
        users = User.query.filter_by(owner=id)
        result = users_schema.dump(users)

        # serialize the AppenderBaseQueryProperty
        # for user in result:
        #     if len(list(user['store']) ) <= 1:
        #         user['store'] = user_schema.dump(user['store'])
        #     elif len(list(user['store']) ) > 1:
        #         user['store'] = users_schema.dump(user['store'])
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getStaff"
        })

#Get staff by Id [VERIFIED]
@app.route("/api/staff/<int:id>", methods=['GET', 'POST'])
def staff(id):
    if request.method == 'GET':
        #User instance
        user = User.query.filter_by(id=id).first()
        #Check if user exists
        if user:
            # if len(list(user.store) ) == 0:
            #     dump_store = store_schema.dump(list(user.store))
            #     print(dump_store)
            # elif len(list(user.store) ) <= 1:
            #     dump_store = store_schema.dump(list(user.store)[0])
            #     print(dump_store)
            # elif len(list(user.store) ) > 1:
            #     dump_store = stores_schema.dump(list(user.store))
            #     print(dump_store)
            
            # print(user)
            user = user_schema.dump(user)
            # user['store'] = dump_store
        
    return jsonify(user)

#Get Role
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

#Get Roles
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
        
        return jsonify(result)
    else:
        return jsonify({
        "route": "getRoles"
        })

#Get Order [VERIFIED]
@app.route("/api/getOrder/<int:id>", methods=['GET', 'POST'])
def getOrder(id):
    if request.method == 'GET':
        #User instance
        order = Order.query.filter_by(id=id).first()
        #Check if user exists
        if order:
            dump_order = order_schema.dump(order)
    return jsonify(dump_order)

#Get Orders [VERIFIED]
@app.route("/api/getOrders", methods=['GET'])
def getOrders():
    if request.method == 'GET':
        orders = Order.query.order_by(Order.created_at.desc()).all()
        dumped_orders = orders_schema.dump(orders)
        return jsonify(dumped_orders)

#Get OrdersAdmin [VERIFIED]
@app.route("/api/getOrdersAdmin/<int:id>", methods=['GET'])
def getOrdersAdmin(id):
    if request.method == 'GET':
        orders = Order.query.filter_by(owner=id).order_by(Order.updated_at.desc()).all()
        dumped_orders = orders_schema.dump(orders)
        return jsonify(dumped_orders)

#Get StoreOrders
@app.route("/api/getStoreOrders/<int:id>", methods=['GET'])
def getStoreOrders(id):
    if request.method == 'GET':
        orders = Order.query.filter_by(store_id=id).order_by(Order.updated_at.desc()).all()
        print(orders)
        dumped_orders = orders_schema.dump(orders)
        return jsonify(dumped_orders)

#Get Category
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

#Get Categories
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

#Get Product
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

#Get Products
@app.route("/api/getProducts", methods=['GET', 'POST'])
def getProducts():
    if request.method == 'GET':
        #Get all staff
        # products = Product.query.all()
        page = request.args.get('page', 1, type=int)
        products = Product.query.paginate(page=page, per_page=app.config['POSTS_PER_PAGE']).items
        result = products_schema.dump(products)
        
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getProducts"
        })

#Get ProductsAdmin
@app.route("/api/getProductsAdmin/<int:id>", methods=['GET', 'POST'])
def getProductsAdmin(id):
    if request.method == 'GET':
        #Get all products
        products = Product.query.filter_by(owner=id)

        #filter products by [Warehouse]
        products = products.filter_by(location = "Warehouse")
        result = products_schema.dump(products)
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getProducts"
        })

#Get ProductsStore
@app.route("/api/getStoreProducts/<int:id>", methods=['GET', 'POST'])
def getStoreProducts(id):
    if request.method == 'GET':
        #Get all products
        products = Product.query.filter_by(store_id=id).order_by(Product.created_at.desc())
        result = products_schema.dump(products)
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getProducts"
        })
        
#Get ProductsAlmostOut
@app.route("/api/getProductsAlmostOut/<int:id>", methods=['GET', 'POST'])
def getProductsAlmostOut(id):
    if request.method == 'GET':
        #Get all staff
        products = Product.query.filter_by(owner=id)
        products = products.filter_by(location="Warehouse")
        products = products.filter(Product.quantity < app.config["ALMOST_OUT"])
        # page = request.args.get('page', 1, type=int)
        # products = Product.query.paginate(page=page, per_page=app.config['POSTS_PER_PAGE']).items
        result = products_schema.dump(products)
        print(result)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getProducts"
        })

#Get StoreProductsAlmostOut
@app.route("/api/getStoreProductsAlmostOut/<int:id>", methods=['GET', 'POST'])
def getStoreProductsAlmostOut(id):
    if request.method == 'GET':
        #Get all staff
        products = Product.query.filter_by(store_id=id)
        products = products.filter(Product.quantity < app.config["ALMOST_OUT"])
        # page = request.args.get('page', 1, type=int)
        # products = Product.query.paginate(page=page, per_page=app.config['POSTS_PER_PAGE']).items
        result = products_schema.dump(products)
        return jsonify(result)
    else:
        return jsonify({
        "route": "getStoreProductsAlmostOut"
        })
    
#Get Store
@app.route("/api/store/<int:id>", methods=['GET', 'POST'])
def store(id):
    if request.method == 'GET':
        store_inst = Store.query.filter_by(id=id).first()
        if store_inst != None:
            store_inst = store_schema.dump(store_inst)

            if len(list(store_inst['users'])) == 1:
                store_inst['users'] = user_schema.dump(store_inst['users'][0])
            elif len(list(store_inst['users'])) > 1:
                store_inst['users'] = users_schema.dump(store_inst['users'])

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

#Get StoreManagerID
@app.route("/api/storeByManager/<int:id>", methods=['GET', 'POST'])
def storeManager(id):
    if request.method == 'GET':
        store_inst = Store.query.filter_by(user_id=id).first()
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

#Get Store
@app.route("/api/getStoreId/<int:id>", methods=['GET', 'POST'])
def getStoreId(id):
    if request.method == 'GET':
        store_inst = Store.query.get(id)
        if store_inst != None:
            store_inst = store_schema.dump(store_inst)
            
            #check the length of the apppender
            if len(list(store_inst['users'])) == 1:
                store_inst['users'] = user_schema.dump(store_inst['users'][0])
            elif len(list(store_inst['users'])) > 1:
                store_inst['users'] = users_schema.dump(store_inst['users'])
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

#Get Stores
@app.route("/api/getStores")
def getStore():
    if request.method == 'GET':
        #Get all Stores
        stores = Store.query.all()
        result = stores_schema.dump(stores)

        # serialize the AppenderBaseQueryProperty
        for store in result:
            if len(list(store['users']) ) == 1:
                store['users'] = user_schema.dump(store['users'][0])
            elif len(list(store['users']) ) > 1:
                store['users'] = users_schema.dump(store['users'])
        
    
        return jsonify(result)
    else:
        return jsonify({
        "route": "getStores"
        })

#Get StoresAdmin
@app.route("/api/getStoresAdmin/<int:id>")
def getStoresAdmin(id):
    if request.method == 'GET':
        #Get all Stores by admin
        stores = Store.query.filter_by(owner=id)
        result = stores_schema.dump(stores)
        
        # serialize the AppenderBaseQueryProperty
        for store in result:
            if len(list(store['users']) ) == 1:
                store['users'] = user_schema.dump(store['users'][0])
            elif len(list(store['users']) ) > 1:
                store['users'] = users_schema.dump(store['users'])
                
        return jsonify(result)
    else:
        return jsonify({
        "route": "getStoresAdmin"
        })

#Delete Staff
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

#Delete Inventory
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

#Delete Store
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

#Update Staff
@app.route("/api/updateStaff/<int:id>", methods=['PATCH', 'GET'])
def updateStaff(id):
    #Get the form data
    form_data = request.get_json()
    if request.method == 'PATCH':
        staff = User.query.get(id)
        
        staff.firstname = form_data['firstname'].strip()
        staff.lastname = form_data['lastname'].strip()
        staff.updated_at = datetime.utcnow()
        staff.role_id = Role.query.filter_by(role=form_data['role'].strip()).first().id

        #check if phone number already exixts
        user_phone = User.query.filter_by(phone=form_data['phone']).first()
        if user_phone == None:
            staff.email = form_data['email'].strip()
        
        #check if email already exits
        user_email = User.query.filter_by(email=form_data['email'].strip()).first()
        if user_email == None:
            staff.email = form_data['email'].strip()
            
        #check if password is empty
        if form_data["password"].strip() != "":
            staff.set_password(form_data['password'].strip())
        
        #stores
        stores_names_list = form_data['store'].strip().split(",")

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
        if product != None and int(form_data["quantity"]) >= 0:
            product.productname = form_data['productname'].strip()
            product.description = form_data['description'].strip()
            product.price  = form_data['price']
            product.quantity = int(form_data['quantity'] )
            product.updated_at = datetime.utcnow()

            #Query category by categoryname provided
            category_instance = Category.query.filter_by(category=form_data['category'].strip()).first()

            #check if category exists
            if category_instance != None:
                product.category_id = category_instance.id
            
            db.session.commit()

            return jsonify({
                "Success": "Product updated."
            })
    return jsonify({
            "route": "updateProduct"
    })

#Update ProductAdmin
@app.route("/api/updateProductAdmin/<int:id>", methods=['PATCH', 'GET'])
def updateProductAdmin(id):
    if request.method == 'PATCH':
        #Get the form data
        form_data = request.get_json()

        if "manager" in form_data:
            #Query product with id
            product = Product.query.get(id)

            #Get the deficit
            deficit  = product.quantity - int(form_data['quantity'])

            #Update product:
            if product != None and deficit >= 0:
                product.quantity = deficit

                #Store
                # store = Store.query.filter_by(user_id=form_data['manager']).first()
                store = Store.query.get(form_data['storeId'])

                #Filter product by [productname, store_id]
                store_product = Product.query.filter_by(productname=product.productname)
                store_product = store_product.filter_by(store_id=store.id).first()

                if store_product == None:
                    #Create new order and product under the manager
                    if int(form_data['quantity']) > 0:
                        #Product
                        new_product = Product(
                                productname = Product.query.get(form_data['id']).productname,
                                description = Product.query.get(form_data['id']).description,
                                price = Product.query.get(form_data['id']).price,
                                quantity = int(form_data['quantity']),
                                # location = Store.query.filter_by(user_id=form_data['manager']).first().storename,
                                location = store.storename,
                                owner = int(form_data['owner']),
                                store_id = store.id,
                                category_id = Product.query.get(form_data['id']).category_id,
                                orders = Product.query.get(form_data['id']).orders
                        )

                        #Order
                        new_order = Order(
                            quantity = int(form_data['quantity']),
                            owner = int(form_data['owner']),
                            # store_id = Store.query.filter_by(user_id=form_data['manager']).first().id,
                            store_id = store.id,
                            product_id = new_product.id,
                        )

                        #Append relationship
                        new_product.orders.append(new_order)

                        #Stage the items
                        db.session.add(new_product)
                        db.session.add(new_order)
                        print("New order created, & product")

                    db.session.commit()
                    return jsonify({
                        "updatedProductAdmin": 200
                    })

                else:
                    #Update the existing store product
                    store_product.quantity  = store_product.quantity + int(form_data['quantity'])
                    store_product.updated_at = datetime.utcnow()
                    
                    #Create a new order
                    new_order = Order(
                        quantity = int(form_data['quantity']),
                        owner = int(form_data['owner']),
                        # store_id = Store.query.filter_by(user_id=form_data['manager']).first().id,
                        store_id = store.id,
                        product_id = store_product.id,
                    )
                    #Stage the items
                    db.session.add(new_order)

                    db.session.commit()
                    return jsonify({
                            "updatedProductAdmin": 200 })

        else:

            #Query product with id
            product = Product.query.get(id)

            #Update product:
            if product != None and int(form_data["quantity"]) >= 0:
                product.quantity = int(form_data["quantity"])
                product.updated_at = datetime.utcnow()
                db.session.commit()
                return jsonify({
                    "updatedProductAdmin": 200
                })
    return jsonify({
            "route": "updateProductAdmin"
    })

#Update Store
@app.route("/api/updateStore/<int:id>", methods=['PATCH', 'GET'])
def updateStore(id):
    if request.method == 'PATCH':
        #Get form data
        form_data = request.get_json()

        #Get store instance
        store = Store.query.get(id)

        #Add mamager flag & get second manager details
        addSecondManager = False
        if form_data['firstname'] != "" and form_data['lastname']!= "" and form_data['phone'] != "" and form_data['email'] != "" and form_data['password'] != "" and form_data['permission'] != "":
            addSecondManager = True
            manager_email = User.query.filter_by(email=form_data['email'].strip()).first()
            manager_phone = User.query.filter_by(phone=form_data['email'].strip()).first()
            role = Role.query.filter_by(role=form_data['permission'].strip()).first()


        #Update store instance with form data
        if store!= None:
            store.storename = form_data['storename'].strip()
            store.region = form_data['region'].strip()
            store.update_at = datetime.utcnow()

            #TODO: Update manager
            if addSecondManager and manager_email == None and manager_phone == None:
                manager = User(
                    firstname = form_data['firstname'].strip(),
                    lastname = form_data['lastname'].strip(),
                    phone = form_data['phone'].strip(),
                    email = form_data['email'].strip(),
                )

                #set and hash manager's password
                manager.set_password(form_data['password'].strip())

                #Add Role and Store relationships
                role.user.append(manager)
                store.users.append(manager)
                db.session.add(manager)

        #Commit changes to database
        db.session.commit()

        return jsonify({
            "updateStore": 200
        })
    return jsonify ({
        "route": "updateStore"
    })

#Update Order
@app.route("/api/updateOrder/<int:id>", methods=['PATCH', 'GET'])
def updateOrder(id):
    if request.method == 'PATCH':
        #Get form data
        form_data = request.get_json()

        #Create an order instance
        order = Order.query.get(id)

        #Update order instance with form data
        if order!= None:
            order.status = form_data['status'].strip()
            order.updated_at = datetime.utcnow()


        #Commit changes to database
        db.session.commit()
   
        return jsonify({
            "updateOrder": 200
        })
    return jsonify ({
        "route": "updateOrder"
    })
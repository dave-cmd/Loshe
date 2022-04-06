from pyparsing import Or
from app import app, db
from app.models import User, Role, Category, Product, Store, Order

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Role': Role,
        'Category': Category,
        'Product': Product,
        'Store': Store,
        'Order': Order
        }

if __name__=="__main__":
    app.run()
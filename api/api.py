from app import app, db
from app.models import User, Role, Category, Product

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db,
        'User': User,
        'Role': Role,
        'Category': Category,
        'Product': Product
        }

if __name__=="__main__":
    app.run()
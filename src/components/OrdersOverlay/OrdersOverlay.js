import "./OrdersOverlay.css"

const OrdersOverlay = ({open, onClose, children})=>{
    if (!open) return null

    else {
            return (
                <>
                <div className="overlay"></div>
                <div className="modal">
                    <div>{children}</div>
                    <button onClick={onClose}>Close Modal</button>
                </div>
                </>
            )
        }
}

export default OrdersOverlay;

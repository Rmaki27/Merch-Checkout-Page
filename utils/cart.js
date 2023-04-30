function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

export function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || []
}

export function addToCart(itemToAdd) {
    // console.log(item)
    const cart = getCart()
    const elementIndex = cart.findIndex((currentItem) =>
        itemToAdd.id === currentItem.id
    )

    // case 1: if item already exists in cart
    if (elementIndex !== -1) {
        // increment quantity of item
        setCart(cart.map(currentItem => {
            // if item to add
            if (currentItem.id === itemToAdd.id) {
                return { ...currentItem, quantity: currentItem.quantity + 1 }
            }
            return currentItem
        }))

        //  case 2: if item does not exist in cart
    } else {
        // add new item to cart
        setCart([...cart, { ...itemToAdd, quantity: 1, }])

    }
}

export function calculateItemTotals(cart) {
    // redefine cart with items that store the total item cost
    return cart.map(item => {
        const totalItemPrice = item.price * item.quantity
        return { ...item, total: totalItemPrice }
    })
}

export function getTotalCartPrice(cart) {
    // sum all item costs to calculate the total cart cost
    const totalCartPrice = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.total
    }, 0)
    return totalCartPrice
}

export function removeFromCart(cart, itemId) {
    const newArray = cart.filter(currentItem =>
        currentItem.id !== itemId
    )
    console.log("new Array", newArray)

    setCart(newArray)

}

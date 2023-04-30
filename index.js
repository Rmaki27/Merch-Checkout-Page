import { merchItems } from "./data.js"

function setCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || []
}

function addToCart(item) {
    const currentCart = getCart()
    setCart([...currentCart, item])
}

function sumCart(cart) {
    // redefine cart with items that store the total item cost
    cart = cart.map(item => {
        const itemCost = item.price * item.quantity
        return { ...item, cost: itemCost }
    })

    return cart
}

function getTotalCartCost(cart) {
    // sum all item costs to calculate the total cart cost
    const totalCartCost = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cost
    }, 0)
    return totalCartCost
}

document.addEventListener('click', function (e) {


    // find match in merchItems
    merchItems.forEach(function (element, index) {

        // if match found
        if (e.target.dataset[element.id]) {
            const cart = getCart()

            const elementIndex = cart.findIndex((item) =>
                element.id === item.id
            )

            // case 1: if item already exists in cart
            if (elementIndex !== -1) {
                // cartList[elementIndex].quantity++

                //  case 2: if item does not exist in cart
            } else {
                addToCart({
                    ...element,
                    quantity: 1,
                })
            }

            const updatedCart = getCart()
            document.getElementById('cart').innerHTML = getCartHtml(updatedCart)
            document.getElementById('cart').innerHTML += getCartTotal(updatedCart)
        }
    })

})

function renderItemsHtml() {
    let itemsHtml = ''

    merchItems.forEach(function (item) {
        itemsHtml += `
        <div class="merch-item">
            <div class="item-details">
                <h2 class="item-name">${item.itemName}</h2>
                <p class="item-price">$${item.price}</p>
            </div>
            <i class="gg-add" id="gg-add" data-${item.id}="${item.id}"></i>    
        </div>`
    })
    return itemsHtml
}

function getCartTotal(cart) {
    const totalCartCost = getTotalCartCost(sumCart(cart))
    const cartTotalHtml = `<h2>Total Cost = $${totalCartCost}</h2>`
    return cartTotalHtml
}

function getCartHtml(cart) {
    const cartItemsCost = sumCart(cart)

    let cartHtml = ''

    cartItemsCost.forEach(item => {
        cartHtml += `
        <div class="cart-item">
            <h2>${item.itemName} (x${item.quantity})</h2>
            <p>$${item.cost}</p>
        </div>`
    })

    console.log(cartHtml)
    return cartHtml
}

document.getElementById('items').innerHTML = renderItemsHtml()

function renderInitialCart() {
    const cart = getCart()

    if (cart.length > 0) {
        document.getElementById('cart').innerHTML = getCartHtml(cart)
        document.getElementById('cart').innerHTML += getCartTotal(cart)
    }
}

renderInitialCart()

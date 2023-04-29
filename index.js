import { merchItems } from "./data.js"

let cartList = []

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

            const elementIndex = cartList.findIndex((item) =>
                element.id === item.id
            )

            // case 1: if item already exists in cart
            if (elementIndex !== -1) {
                cartList[elementIndex].quantity++
                return
            }

            //  case 2: if item does not exist in cart
            cartList.push({
                ...element, quantity: 1
            })
        }
    })
    document.getElementById('cart').innerHTML = getCartHtml()
    document.getElementById('cart').innerHTML += getCartTotal()
})

function getItemsHtml() {
    let itemsHtml = ''

    merchItems.forEach(function (item) {
        itemsHtml += `
        <div class="merch-item">
            <h2>${item.itemName}</h2>
            <i class="gg-add" id="gg-add" data-${item.id}="${item.id}"></i>
            <p>$${item.price}</p>
        </div>`
    })
    return itemsHtml
}

function getCartTotal() {
    const totalCartCost = getTotalCartCost(sumCart(cartList))
    const cartTotalHtml = `<h2>Total Cost = $${totalCartCost}</h2>`
    return cartTotalHtml
}

function getCartHtml() {
    const cartItemsCost = sumCart(cartList)

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

document.getElementById('items').innerHTML = getItemsHtml()

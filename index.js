import { merchItems } from "./data.js"
import { getCart, addToCart, sumCart, getTotalCartPrice } from "./utils/cart.js"




document.addEventListener('click', function (e) {

    // find match in merchItems
    merchItems.forEach(function (item, index) {

        // if match found
        if (e.target.dataset[item.id]) {
            addToCart(item)

            const updatedCart = getCart()
            // console.log(updatedCart)
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
    const totalCartCost = getTotalCartPrice(sumCart(cart))
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

    // console.log(cartHtml)
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

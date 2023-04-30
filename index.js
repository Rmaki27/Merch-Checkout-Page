import { merchItems } from "./data.js"
import { getCart, addToCart, calculateItemTotals, getTotalCartPrice, removeFromCart } from "./utils/cart.js"



function cartClickHandler(e) {
    // find match in merchItems
    merchItems.forEach(function (item, index) {

        // if match found
        if (e.target.dataset[item.id]) {
            addToCart(item)

            const updatedCart = getCart()
            // console.log(updatedCart)
            renderCartSummary(updatedCart)
        }
    })

    // console.log(e.target.dataset.itemToRemove)
    if (e.target.dataset.itemToRemove) {
        console.log('test')
        removeFromCart(getCart(), e.target.dataset.itemToRemove)
        renderCartSummary(getCart())
    }



}

document.addEventListener('click', cartClickHandler)

function renderItems() {
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

    document.getElementById('items').innerHTML = itemsHtml
}

function renderCartSummary(cart) {
    const cartItemsCost = calculateItemTotals(cart)

    let cartHtml = '<h2>Your Order</h2>'

    cartItemsCost.forEach(item => {
        cartHtml += `
        <div class="cart-item">
            <h2>${item.itemName} ${item.quantity > 1 ? `(x${item.quantity})` : ''}</h2>
            <p data-item-to-remove=${item.id}>remove</p>
            <p>$${item.total}</p>
        </div>`
    })
    const totalCartCost = getTotalCartPrice(calculateItemTotals(cart))

    cartHtml += `<h2>Total Cost = $${totalCartCost}</h2>`

    document.getElementById('cart').innerHTML = cartHtml
}

function renderInitialCart() {
    const cart = getCart()

    if (cart.length > 0) {
        renderCartSummary(cart)
    }
}

renderInitialCart()
renderItems()
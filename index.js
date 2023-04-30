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

document.getElementById('pay-btn').addEventListener('click', () => {

    console.log('submit payment')

    document.getElementById('cart').innerHTML = `<p>Thanks for Submitting your order</p>`

})

function renderItems() {
    let itemsHtml = ''

    merchItems.forEach(function (item) {
        itemsHtml += `
        <div class="merch-item">
            <div class="item-details">
            <img src="${item.image}" alt="${item.itemName} image" class="item-image">

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

    let cartHtml = '<h2 class="order-title">Your Order</h2>'

    cartItemsCost.forEach(item => {
        cartHtml += `
        <div class="cart-item">
            <div>
                <h2 class="cart-item-name">${item.itemName} ${item.quantity > 1 ? `(x${item.quantity})` : ''}</h2>
                <p class="remove" data-item-to-remove=${item.id}>remove</p>
            </div>
            <p class="cart-price">$${item.total}</p>
        </div>`
    })
    const totalCartCost = getTotalCartPrice(calculateItemTotals(cart))

    cartHtml += `<h2 class="total-cost">Total Cost</h2>
                 <h2 class="total-cost">$${totalCartCost}</h2>`

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
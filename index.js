import { merchItems } from "./data.js"

// function callback() {
//     if (e.target.dataset === element.data)
// }

// function forEach(callback) {
//     for (...) {
//         callback({}, index, array)
//     }
// }


function sumCart(cart) {
    // redefine cart with items that store the total item cost
    cart = cart.map(item => {
        const itemCost = item.price * item.quantity
        return { ...item, cost: itemCost }
    })

    // sum all item costs to calculate the total cart cost
    const totalCartCost = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.cost
    }, 0)

    return cart, totalCartCost
}



let cartList = []

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
    sumCart(cartList)
    // console.log("cart =", cart, "Total cart cost =", totalCartCost) 
})

function getItemsListHtml() {
    let itemsList = ''

    merchItems.forEach(function (item) {
        itemsList += `
        <div class="merch-item">
            <h2>${item.itemName}</h2>
            <i class="gg-add" id="gg-add" data-${item.id}="${item.id}"></i>
            <p>$${item.price}</p>
        </div>`
    })
    return itemsList
}

function getCartHtml() {
    let cartList = ''
}


document.getElementById('items-list').innerHTML = getItemsListHtml()



// document.getElementById('cart') = 
import { merchItems } from "./data.js"

// function callback() {
//     if (e.target.dataset === element.data)
// }

// function forEach(callback) {
//     for (...) {
//         callback({}, index, array)
//     }
// }




let cartList = []

document.addEventListener('click', function (e) {

    // console.log('clicked')

    // find match in merchItems
    merchItems.forEach(function (element, index) {
        // console.log(index)
        // console.log('e.target.dataset', e.target.dataset)
        // console.log('element.data', element.data)
        // console.log('e.target.dataset[element.data]', e.target.dataset[element.data])


        // if match found
        if (e.target.dataset[element.id]) {
            console.log(element.itemName)

            const elementIndex = cartList.findIndex((item) =>
                element.id === item.id
            )


            // case 1: if item already exists in cart
            if (elementIndex !== -1) {
                cartList[elementIndex].quantity++
                console.log(cartList[elementIndex].quantity)
                return
            }

            //  case 2: if item does not exist in cart
            cartList.push({
                ...element, quantity: 1
            })
            console.log(cartList)
        }


    })

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
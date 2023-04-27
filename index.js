import { merchItems } from "./data.js"

let countShirt = 0
let countVinyl = 0
let countBucketHat = 0

document.addEventListener('click', function (e) {

    if (e.target.dataset.shirt) {
        countShirt++
        // console.log(e.target.dataset.shirt)
        console.log(`shirt count = ${countShirt}`)

    }

    if (e.target.dataset.vinyl) {
        countVinyl++
        // console.log(e.target.dataset.vinyl)
        console.log(`vinyl count = ${countVinyl}`)
    }

    if (e.target.dataset.bucket) {
        countBucketHat++
        // console.log(e.target.dataset.bucket)
        console.log(`bucket hat count = ${countBucketHat}`)

    }
})

function getItemsListHtml() {
    let itemsList = ''

    merchItems.forEach(function (item) {
        itemsList += `
        <div class="merch-item">
            <h2>${item.itemName}</h2>
            <i class="gg-add" id="gg-add" data-${item.data}="${item.data}"></i>
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
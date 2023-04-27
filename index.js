import { merchItems } from "./data.js"

document.addEventListener('click', function (e) {
    if (e.target.dataset.shirt) {
        console.log(e.target.dataset.shirt)
    }
})

function getItemsListHtml() {
    let itemsList = ''

    merchItems.forEach(function (item) {
        itemsList += `
        <div class="merch-item">
            <h2>${item.itemName}</h2>
            <i class="gg-add" id="gg-add" data-${item.itemName}="${item.itemName}"></i>
            <p>${item.price}</p>
        </div>`
    })
    return itemsList
}

document.getElementById('items-list').innerHTML = getItemsListHtml()



// document.getElementById('cart') = 
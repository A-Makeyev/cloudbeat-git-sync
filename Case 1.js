// POST
const url = 'https://jsonplaceholder.typicode.com/posts'
const headers = {
    'contenct-type': 'application/json'
}

const data = {
    title: 'foo',
    body: 'bar',
    userId: 1,
}

const postResponse = http.post(url, data, headers)
log.info(postResponse.body)

log.info('@'.repeat(99))

// DATABASE
// db.setConnectionString('Driver={oracle instance}')
// const products = 'cars'
// const query = 
// `
//     SELECT *
//     FROM ${products}
// `
// const cars = db.executeQuery(query)

web.transaction('01. Initialize')
const chromeOptions = {
    browserName: 'chrome',
    'goog:chromeOptions': {
        args: [
            '--incognito'
        ]
    }
}

const username = params.username ? params.username : 'standard_user'
const password = params.password ? params.password : 'secret_sauce'

log.info(username)
log.info(password)

web.init(chromeOptions)
web.setTimeout(30 * 1000)
web.setWindowSize(500, 1000)

web.transaction('02. Open URL')
web.open('https://www.saucedemo.com/')

// web.selectFrame('id=nr-ext-rsicon')
// web.selectWindow('title=Swag Labs')

// var handles = web.getWindowHandles()
// web.selectWindow(handles[1])

// web.pause(5000)

web.transaction('03. Login')
web.type('id=user-name', username, 5000)
web.type('id=password', password, 5000)
web.click('id=login-button')

web.transaction('04. Add First Item To Cart')
const firstItem = web.getText('(//div[@id="inventory_container"]//div[@class="inventory_item_name"])[1]')
log.info('First Item: ' + firstItem)

web.click('id=add-to-cart-sauce-labs-backpack')
web.waitForVisible('id=remove-sauce-labs-backpack')

web.transaction('05. Assert Cart')
web.click('id=shopping_cart_container')

const cartFirstItem = web.getText('(//div[@class="inventory_item_name"])[1]')
log.info('Cart First Item: ' + cartFirstItem)

if (firstItem == cartFirstItem) {
    log.info(firstItem + ' was added successfully')
    // web.click('id=checkout')
} else {
    assert.fail(firstItem + ' was NOT added')
}

const cartItemIsVisible = web.isVisible('(//div[@class="inventory_item_name"])[1]')
assert.equal(cartItemIsVisible, true, 'item was not added')

assert.contain(
    firstItem, cartFirstItem, 'first item doesnt equal cart item'
)

// var cartFirstItemClass = web.getAttribute('(//div[@class="inventory_item_name"])[1]', 'class')
// log.info('Cart First Item Class: ' + cartFirstItem)

// var cartFirstItemColor = web.getCssValue('(//div[@class="inventory_item_name"])[1]', 'color')
// log.info('Cart First Item Color: ' + cartFirstItem)

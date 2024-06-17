import '../support/commands'
const { expect } = require("chai")

describe('Verify Contact page and Submit button functionality', () => {

    it('user buys some stuff and verify the totals' , () =>{
        cy.visit('http://jupiter.cloud.planittesting.com')
        cy.contains('Shop').click()
        cy.url().should('include','/#/shop')

        // Get Shop price
        cy.getShopPrice('Stuffed Frog').as('shopPriceFrog')
        cy.getShopPrice('Fluffy Bunny').as('shopPriceBunny')
        cy.getShopPrice('Valentine Bear').as('shopPriceBear') 

        // Order some stuff
        cy.orderStuff('Stuffed Frog', 2)
        cy.orderStuff('Fluffy Bunny', 5)
        cy.orderStuff('Valentine Bear', 3)

        //Go to cart
        cy.get('[class="cart-count ng-binding"]').click()
        cy.url().should('include','/#/cart')

        //Verify Price of each Product
        cy.get('@shopPriceFrog').then(shopPriceFrog => {
            cy.getCartPrice(' Stuffed Frog').then((cartPrice) =>{
                expect(cartPrice).to.eq(shopPriceFrog)
            })
        })

        cy.get('@shopPriceBunny').then(shopPriceBunny => {
            cy.getCartPrice(' Fluffy Bunny').then((cartPrice) =>{
                expect(cartPrice).to.eq(shopPriceBunny)
            })
        })

        cy.get('@shopPriceBear').then(shopPriceBear => {
            cy.getCartPrice(' Valentine Bear').then((cartPrice) =>{
                expect(cartPrice).to.eq(shopPriceBear)
            })
        })

        //Verify Subtotals
        cy.verifySubTotal('Stuffed Frog')
        cy.verifySubTotal('Fluffy Bunny')
        cy.verifySubTotal('Valentine Bear')

        //Verify Total
        cy.verifyTotal()

    })




})
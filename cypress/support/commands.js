// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { expect } = require("chai")

Cypress.Commands.add('orderStuff', (what2buy, howMany) => { 
    for(let n = 0; n < howMany; n ++) {
        cy.contains(what2buy).parent().find('[class="btn btn-success"]').click()
    }
})

Cypress.Commands.add('getShopPrice',(item) =>{
 let shopPrice   
    cy.contains(item).parent().find('[class="product-price ng-binding"]').then(($span) => {
        shopPrice = $span.text();
        return cy.wrap(shopPrice)
    })

})
   

Cypress.Commands.add('getCartPrice',(item) =>{
 let cartPrice   
    cy.get('table').contains('td', item).siblings('[class="ng-binding"]').eq(0).then(($td) => {
        cartPrice = $td.text();
        return cy.wrap(cartPrice)
    })
    
})

Cypress.Commands.add('getSubTotal',(item) =>{
    let subTotal   
       cy.get('table').contains('td', item).siblings('[class="ng-binding"]').eq(1).then(($td) => {
           subTotal = $td.text();
           return cy.wrap(subTotal)
       })
       
   })

   Cypress.Commands.add('getQuantity',(item) =>{
    let quantity   
       cy.get('table').contains('td', item).siblings().find('input[name="quantity"]')
         .invoke('val').then(inputVal => {
            quantity = inputVal
            return cy.wrap(quantity)
         })
   })
   
   Cypress.Commands.add('verifySubTotal',(item) =>{
    cy.getQuantity(item).then(quantity => {
        cy.getCartPrice(item).then((cartPrice) =>{
            cy.getSubTotal(item).then((subTotal) => {
                cartPrice = Number(cartPrice.replace(/[^0-9\.-]+/g,""))
                subTotal = Number(subTotal.replace(/[^0-9\.-]+/g,""))
                quantity = parseInt(quantity)

                expect(cartPrice * quantity).to.eq(subTotal)
            })
        })
    })

   })

   Cypress.Commands.add('verifyTotal', () =>{
    cy.getSubTotal('Stuffed Frog').as('subTotalFrog')
    cy.getSubTotal('Fluffy Bunny').as('subTotalBunny')
    cy.getSubTotal('Valentine Bear').as('subTotalBear')

    cy.get('strong[class="total ng-binding"]').invoke('text').then(totalVal =>{
        cy.get('@subTotalFrog').then((subTotalFrog) =>{
            cy.get('@subTotalBunny').then((subTotalBunny) =>{
                cy.get('@subTotalBear').then((subTotalBear) =>{
                    totalVal = Number(totalVal.replace(/[^0-9\.-]+/g,""))
                    subTotalFrog = Number(subTotalFrog.replace(/[^0-9\.-]+/g,""))
                    subTotalBunny = Number(subTotalBunny.replace(/[^0-9\.-]+/g,""))
                    subTotalBear = Number(subTotalBear.replace(/[^0-9\.-]+/g,""))
                    expect(subTotalFrog + subTotalBunny + subTotalBear).to.eq(totalVal)
                })
            })
        })

    })
   })
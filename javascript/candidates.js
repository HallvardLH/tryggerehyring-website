/**
 * Candidate object:
 * {
 *      name: "",
 *      information: "",
 *      services: [],
 *      attachments: [{
 *          name: "",
 *          data: ""
 *      }]
 * }
 */

let candidates = [{
    name: "Navn",
    information: "Lorem ipsum...",
    services: [],
    price: 0,
    attachments: []
}]

function updatePriceEstimates() {
    for (let i = 0; i < candidates.length; i++) {
        let price = 0
        for (let j = 0; j < candidates[i].services.length; j++) {
            price += services[candidates[i].services[j]].price
        }
        candidates[i].price = price
    }
    console.log(candidates)
}
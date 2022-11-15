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
    name: "",
    information: "",
    services: [],
    price: 0,
    attachments: []
}]

/**
 * Sets the price value for each candidate based on the service array.
 */
function updatePriceEstimates() {
    for (let i = 0; i < candidates.length; i++) {
        let price = 0
        for (let j = 0; j < candidates[i].services.length; j++) {
            price += services[candidates[i].services[j]].price
        }
        candidates[i].price = price
    }
}

function removeCandidate(index) {
    let length = candidates.length;
    candidates.splice(index, 1);
    bestill.create_all_rows(length);
}

function addNewCandidate() {
    candidates.push({
        name: "",
        information: "",
        services: [],
        price: 0,
        attachments: []
    })

    bestill.create_all_rows();
}
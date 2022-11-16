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

function initializeCandidates() {
    Object.keys(services).forEach(function(key) {
        if (services[services[key].name].default) {
            for (let i = 0; i < candidates.length; i++) {
                candidates[i].services.push(services[key].name);
            }
        }
    });
}

initializeCandidates();

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

    updateTotalPrice()
}

function updateTotalPrice() {
    let price = 0;
    for (let i = 0; i < candidates.length; i++) {
        for (let j = 0; j < candidates[i].services.length; j++) {
            price += services[candidates[i].services[j]].price;
        }
    }
    document.getElementById("price-estimate-display").innerHTML = price + " NOK";
}

function removeFileFromCandidate(candidateIndex, fileIndex) {
    candidates[candidateIndex].attachments.splice(fileIndex, 1);

    bestill.create_all_rows();
}

function removeCandidate(index) {
    let length = candidates.length;
    candidates.splice(index, 1);
    bestill.create_all_rows(length);
}

function addNewCandidate() {
    let services_ = [];

    Object.keys(services).forEach(function(key) {
        if (document.getElementById(`${services[key].name}-checkbox`).src.includes("images/checkbox-checked.svg")) {
            services_.push(services[key].name);
        }
    });

    candidates.push({
        name: "",
        information: "",
        services: services_,
        price: 0,
        attachments: []
    })

    bestill.create_all_rows();
}
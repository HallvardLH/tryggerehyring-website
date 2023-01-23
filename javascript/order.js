function order() {
    if (!validateOrder()) {
        return;
    }

    // ADD CODE FOR DISPLAYING ORDER CONFIRMATION MODAL

    //prepareAndSendEmail();
}

let errorRed = "solid #ff4c4c";
function validateOrder() {
    let valid = true;
    let errorMessage = "<b>Kan ikke fullføre bestilling fordi:</b> <br />";

    for (let i = 0; i < candidates.length; i++) {
        if (document.getElementById(`kandidat-name-input-${i}`).value.length == 0) {
            document.getElementById(`kandidat-name-input-${i}`).style.borderBottom = errorRed;
            errorMessage += `&#x2022 Kandidat nr. ${i+1} mangler navn <br />`;
            valid = false;
        } else {
            document.getElementById(`kandidat-name-input-${i}`).style.borderBottom = "";
        }
    }

    if (document.getElementById("summary-name-input").value.length == 0) {
        document.getElementById("summary-name-input").style.borderBottom = errorRed;
        errorMessage += "&#x2022 Manglende navn eller navn på bedrift<br />";
        valid = false;
    } else {
        document.getElementById("summary-name-input").style.borderBottom = "";
    }

    if (!validateEmail(document.getElementById("summary-email-input").value)) {
        document.getElementById("summary-email-input").style.borderBottom = errorRed;
        if (document.getElementById("summary-email-input").value.length == 0) {
            errorMessage += "&#x2022 Manglende e-post<br />";
        } else {
            errorMessage += `&#x2022 Ugyldig e-post<br />`
        }
        valid = false;
    } else {
        document.getElementById("summary-email-input").style.borderBottom = "";
    }

    if (!bestill.consent_checked) {
        document.getElementById("consent-checkbox").src = "images/checkbox-red.svg";
        errorMessage += "&#x2022 Manglende samtykke for deling av personlig informasjon<br />";
        valid = false;
    }
    
    document.getElementById("bestill-error-message").style.display = "block";
    document.getElementById("bestill-error-message").innerHTML = "";
    document.getElementById("bestill-error-message").innerHTML = errorMessage;

    if(valid) {
        document.getElementById("bestill-error-message").style.display = "none";
    }
    
    return valid;
}

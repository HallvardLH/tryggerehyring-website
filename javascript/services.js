let services = {
    Arbeid: {
        name: "Arbeid",
        description: "Vi verifiserer CV-er ved å sjekke tidligere ansettelser, kontraktsforhold, attester, m.m.",
        price: 2000,
        default: true
    },
    Utdanning: {
        name: "Utdanning",
        description: "Vi kan verifisere grader, vintemål og karakterutskrifter",
        price: 1000,
        default: true
    },
    Mediesøk: {
        name: "Mediesøk",
        description: "Vi undersøker sosiale medier og andre offentlige databaser",
        price: 2500,
        default: true
    },
    Sertifikat: {
        name: "Sertifikat",
        description: "Verifisering av førerkort, lisenser og andre autoriseringer",
        price: 500,
        default: false
    },
    Referansekontroll: {
        name: "Referansekontroll",
        description: "Vi dobbeltsjekker at referansene er ekte, og vi kan gjennomføre referanseintervju",
        price: 500,
        default: false
    },
    Identitet: {
        name: "Identitet",
        description: "Valideringssjekk av alle typer ID-dokument",
        price: 1000,
        default: false
    },
    Næringsinteresser: {
        name: "Næringsinteresser",
        description: "Vi finner roller og eierskap i norske og utelandske bedrifter",
        price: 500,
        default: false
    },
    Adresse: {
        name: "Adresse",
        description: "Verifisering av oppgitt adresse",
        price: 500,
        default: false
    },
    Kredittsjekk: {
        name: "Kredittsjekk",
        description: "Vi gjennmfører en kredittsjekk av finansiell historikk og betalingsanmerkninger",
        price: 3500,
        default: false
    },
    Lønnsbekreftelse: {
        name: "Lønnsbekreftelse",
        description: "Vi kan verifisere tidligere lønn",
        price: 1000,
        default: false
    },
    "Globale sanksjoner": {
        name: "Globale sanksjoner",
        description: "Vi leter gjennom globale databaser for å finne internasjonalt utstedte sanksjoner",
        price: 2000,
        default: false
    },
    Politiattest: {
        name: "Politiattest",
        description: "Vi kan hjelpe kandidaten med å søke om politiattest",
        price: 1500,
        default: false
    }
}

/**
 * 
 * @param {int} candidateIndex The index used to identify the candidate in the order page table
 */
/*function serviceCheckBoxAddEventListener(candidateIndex) {
    Object.keys(services).forEach(function(key) {
        document.getElementById(services[key].name).addEventListener("change", async () => {
            if (!candidates[candidateIndex].services.includes(services[key].name)) {
                candidates[candidateIndex].services.push(services[key].name)
            } else {
                candidates[candidateIndex].services = removeItemAll(candidates[candidateIndex].services, services[key].name)
            }

            updatePriceEstimates()
        });
    });
}*/

function serviceCheckBox(candidateIndex, name) {
    let checked = false;
    if (candidateIndex == null) {
        let atLeastOne = false;
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].services.includes(services[name].name)) {
                atLeastOne = true;
            }
        }
        for (let i = 0; i < candidates.length; i++) {
            if (!candidates[i].services.includes(services[name].name) && !atLeastOne) {
                candidates[i].services.push(services[name].name)
                checked = true;
            } else if (atLeastOne) {
                candidates[i].services = removeItemAll(candidates[i].services, services[name].name)
                checked = false;
            }
        }
        updateCheckbox(name, checked, "");
    } else {
        if (!candidates[candidateIndex].services.includes(services[name].name)) {
            candidates[candidateIndex].services.push(services[name].name)
            checked = true;
        } else {
            candidates[candidateIndex].services = removeItemAll(candidates[candidateIndex].services, services[name].name)
            checked = false;
        }
        updateCheckbox(name, checked, "-modal");
        
        let included = 0
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].services.includes(name)) {
                included++;
            }
        }

        if (included == candidates.length) {
            checked = 1;
        } else if (included == 0) {
            checked = 0;
        } else {
            checked = 2;
        }
        updateCheckbox(name, checked, "");
    }

    updatePriceEstimates()
    bestill.create_all_rows();
}

function updateCheckbox(name, checked, modal) {
    if (!modal) {
        modal = "";
    }

    if(checked == true) {
        document.getElementById(`${name}${modal}-checkbox`).src = "images/checkbox-checked.svg";
    } else if (checked == false) {
        document.getElementById(`${name}${modal}-checkbox`).src = "images/checkbox-unchecked.svg";
    } else {
        document.getElementById(`${name}${modal}-checkbox`).src = "images/checkbox-minus.svg";
    }
}

function selectAllServices() {
    for (let i = 0; i < candidates.length; i++) {
        Object.keys(services).forEach(function(key) {
            if (!candidates[i].services.includes(services[key].name)) {
                candidates[i].services.push(services[key].name);
            }
        });
    }

    Object.keys(services).forEach(function(key) {
        updateCheckbox(services[key].name, 1);
    });

    bestill.create_all_rows();
}

function deselectAllServices() {
    for (let i = 0; i < candidates.length; i++) {
        candidates[i].services = [];
    }

    Object.keys(services).forEach(function(key) {
        updateCheckbox(services[key].name, 0);
    });

    bestill.create_all_rows();
}
 
/**
 * USAGE:
 * serviceCheckBoxAddEventListener(candidateIndex)
 * HTML example:
 *  <fieldset>   
        <input type="checkbox" id="Arbeid" name="scales">
        <input type="checkbox" id="Utdanning" name="scales">
        <input type="checkbox" id="Sertifikat" name="scales">
        <input type="checkbox" id="Mediesøk" name="scales">
        <input type="checkbox" id="Referansekontroll" name="scales">
        <input type="checkbox" id="Identitet" name="scales">
        <input type="checkbox" id="Næringsinteresser" name="scales">
        <input type="checkbox" id="Adresse" name="scales">
        <input type="checkbox" id="Kredittsjekk" name="scales">
        <input type="checkbox" id="Lønnsbekreftelse" name="scales">
        <input type="checkbox" id="Globale sanksjoner" name="scales">
        <input type="checkbox" id="Politiattest" name="scales">
    </fieldset>
 */
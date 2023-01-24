let services = {
    Arbeid: {
        name: "Arbeid",
        description: "Vi verifiserer CV-er ved å sjekke tidligere ansettelser, kontraktsforhold, attester, m.m.",
        description_long: "Vi verifiserer CV-er ved å sjekke tidligere ansettelser, kontraktsforhold og attester. I praksis vil det si at vi går gjennom CV-en til en kandidat og sjekker at infoen relatert til alle oppgitte ansettelser og kontraktsforhold er korrekt. Det inkluderer stillingstitler, arbeidsoppgaver, dato for arbeidsforholdet, og all anna informasjon vi kan verifisere.",
        price: 2000,
        default: true
    },
    Utdanning: {
        name: "Utdanning",
        description: "Vi kan verifisere grader, vintemål og karakterutskrifter",
        description_long: "Vi kan verifisere grader, vintemål og karakterutskrifter. For grader verifiserer vi at graden er oppnådd og hvilken institusjon som utstedte graden. På grunn av personvern krever verifisering av vitnemål en fullmakt fra vedkommenende. Den etterspør vi fra kandidaten når bestillingen er bekreftet.",
        price: 1000,
        default: true
    },
    Mediesøk: {
        name: "Mediesøk",
        description: "Vi undersøker sosiale medier og andre offentlige databaser",
        description_long: "Vi undersøker sosiale medier og andre offentlige databaser. Det vil si at vi går gjennom alt kandidaten har lagt ut på nett. Om vi finner noe som kan være problematisk for arbeidsforhold, inkluderer vi det i rapporten. Hva som er problematisk varierer avhengig av rollen.",
        price: 2500,
        default: true
    },
    Sertifikat: {
        name: "Sertifikat",
        description: "Verifisering av førerkort, lisenser og andre autoriseringer",
        description_long: "Vi kan verifisere førerkort, lisenser og andre autoriseringer. Verifisering av førerkort blir gjort i offentlige databaser. Vi har oversikt over gyldige førerkortklasser og yrkessjåfjørkompetanse. Verifisering av lisenser og autoriseringer varierer en del basert på hvilken organisasjon som utstedte dem.",
        price: 500,
        default: false
    },
    Referansekontroll: {
        name: "Referansekontroll",
        description: "Vi dobbeltsjekker at referansene er ekte, og vi kan gjennomføre referanseintervju",
        description_long: "Vi følger opp referanser og holder referanseintervju. I intervjuene spør vi spørsmål som hvilken relasjon vedkommende har til kandidaten, hva slags stilling kandidaten hadde, hvordan arbeidsopgavene ble utført, osv. Vi lager et referat for intervjuet.",
        price: 500,
        default: false
    },
    Identitet: {
        name: "Identitet",
        description: "Valideringssjekk av alle typer ID-dokument",
        description_long: "Vi utfører en valideringssjekk for alle typer ID-dokument. Dei vanligaste er førerkort og pass. Valideringssjekk innebærer at vi verifiserer informasjonen i ID-dokumentet, og at vi verifiserer at dokumentet er gylding.",
        price: 1000,
        default: false
    },
    Næringsinteresser: {
        name: "Næringsinteresser",
        description: "Vi finner roller og eierskap i norske og utelandske bedrifter",
        description_long: "Vi finner roller og eierskap i norske og utelandske bedrifter. Med roller og eierskap mener vi roller som daglig leder, styreleder, styremedlem, osv. Vi lager en oversikt over rollene og bedriftene som er tilknyttet kandidaten.",
        price: 500,
        default: false
    },
    Adresse: {
        name: "Adresse",
        description: "Verifisering av oppgitt adresse",
        description_long: "Vi verifiserer oppgitt adresse. Det vil si at vi sjekker at kandidatens oppgitte adresse stemmer med offentlige databaser.",
        price: 500,
        default: false
    },
    Kredittsjekk: {
        name: "Kredittsjekk",
        description: "Vi gjennmfører en kredittsjekk av finansiell historikk og betalingsanmerkninger",
        description_long: "Vi gjennomfører en kredittsjekk av finansiell historikk og betalingsanmerkninger. For å utføre ein kredittsjekk krever kredittselskapene ein søknad som må begrunnes. Kredittselskapene vurderer selv om det er nødvendig med ein kredittsjekk, og ofte krever det en god grunn.",
        price: 3500,
        default: false
    },
    Lønnsbekreftelse: {
        name: "Lønnsbekreftelse",
        description: "Vi kan verifisere tidligere lønn",
        description_long: "Vi kan verifisere tidligere lønn.",
        price: 1000,
        default: false
    },
    "Globale sanksjoner": {
        name: "Globale sanksjoner",
        description: "Vi leter gjennom globale databaser for å finne internasjonalt utstedte sanksjoner",
        description_long: "Vi leter gjennom globale databaser for å finne internasjonalt utstedte sanksjoner.",
        price: 2000,
        default: false
    },
    Politiattest: {
        name: "Politiattest",
        description: "Vi kan hjelpe kandidaten med å søke om politiattest",
        description_long: "Vi kan hjelpe kandidaten med å søke om politiattest.",
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

    updatePriceEstimates();

    bestill.create_all_rows();
}

function updateCheckbox(name, checked, modal) {
    if (!modal) {
        modal = "";
    }

    if(checked == true) {
        document.getElementById(`${name}${modal}-checkbox`).src = "images/checkbox-checked.svg";
        document.getElementById(`${name}-checkbox-card`).style.backgroundColor = "var(--highlight-color)";
    } else if (checked == false) {
        document.getElementById(`${name}${modal}-checkbox`).src = "images/checkbox-unchecked.svg";
        document.getElementById(`${name}-checkbox-card`).style.backgroundColor = "white";
    } else {
        document.getElementById(`${name}${modal}-checkbox`).src = "images/checkbox-minus.svg";
        document.getElementById(`${name}-checkbox-card`).style.backgroundColor = "var(--highlight-color)";
    }
}

let allSelected = false;
function selectAllServices() {
    if(!allSelected) {
        for (let i = 0; i < candidates.length; i++) {
            Object.keys(services).forEach(function(key) {
                if (!candidates[i].services.includes(services[key].name)) {
                    candidates[i].services.push(services[key].name);
                }
            });
        }
        allSelected = true;
        document.getElementById("check-all-checkbox").src = "images/checkbox-checked.svg";
    } else {
        for (let i = 0; i < candidates.length; i++) {
            candidates[i].services = [];
        }
        allSelected = false;
        document.getElementById("check-all-checkbox").src = "images/checkbox-unchecked.svg";
    }

    Object.keys(services).forEach(function(key) {
        updateCheckbox(services[key].name, (allSelected ? 1 : 0));
    });

    bestill.create_all_rows();
}


function buildServices(name, description) {
    let i = 0;
    for(const key in services) {
        const name = services[key].name;
        const price = services[key].price;
        const description = services[key].description_long;
        const default_state = services[key].default;

        content = `
        <div class="display-card">
            <h2>${name}</h2>
            <div class="display-subtitle">${price}</div>
            <div class="info-text">${description}</div>
        </div>`

        if(i % 2 == 0) {
            document.getElementById("tjenester-left").innerHTML += content;
        } else {
            document.getElementById("tjenester-right").innerHTML += content;
        }
        i++;
    }
}
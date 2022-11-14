let services = {
    Arbeid: {
        name: "Arbeid",
        description: "Vi verifiserer CV-er ved å sjekke tidligere ansettelser, kontraktsforhold, attester, m.m."
    },
    Utdanning: {
        name: "Utdanning",
        description: "Vi kan verifisere grader, vintemål og karakterutskrifter"
    },
    Sertifikat: {
        name: "Sertifikat",
        description: "Verifisering av førerkort, lisenser og andre autoriseringer"
    },
    Mediesøk: {
        name: "Mediesøk",
        description: "Vi undersøker sosiale medier og andre offentlige databaser"
    },
    Referansekontroll: {
        name: "Referansekontroll",
        description: "Vi dobbeltsjekker at referansene er ekte, og vi kan gjennomføre referanseintervju"
    },
    Identitet: {
        name: "Identitet",
        description: "Valideringssjekk av alle typer ID-dokument"
    },
    Næringsinteresser: {
        name: "Næringsinteresser",
        description: "Vi finner roller og eierskap i norske og utelandske bedrifter"
    },
    Adresse: {
        name: "Adresse",
        description: "Verifisering av oppgitt adresse"
    },
    Kredittsjekk: {
        name: "Kredittsjekk",
        description: "Vi gjennmfører en kredittsjekk av finansiell historikk og betalingsanmerkninger"
    },
    Lønnsbekreftelse: {
        name: "Lønnsbekreftelse",
        description: "Vi kan verifisere tidligere lønn"
    },
    "Globale sanksjoner": {
        name: "Globale sanksjoner",
        description: "Vi leter gjennom globale databaser for å finne internasjonalt utstedte sanksjoner"
    },
    Politiattest: {
        name: "Politiattest",
        description: "Vi kan hjelpe kandidaten med å søke om politiattest"
    }
}

function serviceCheckBoxAddEventListener(candidateIndex) {
    Object.keys(services).forEach(function(key) {
        document.getElementById(services[key].name).addEventListener("change", async (event) => {
            if (!candidates[candidateIndex].services.includes(services[key].name)) {
                candidates[candidateIndex].services.push(services[key].name);
            } else {
                candidates[candidateIndex].services = removeItemAll(candidates[candidateIndex].services, services[key].name);
            }
        });
    });
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
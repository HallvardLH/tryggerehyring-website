/**
 * Constants used for the SMTP connection. This should at least be obfuscated in production, preferably encrypted.
 * Check out the security section on this page for more details about securing the connection: https://smtpjs.com/
 */
const H = "moc.liamXcitsalX.ptms"
const U = "on.gniryhXrXggyrt@1+troppus"
const P = "7X40C8320DEF6A1FX5X012X42C1454F3BD88"

/**
 * Connects to the SMTP server and sends an email
 * @param {*} to 
 * @param {*} from 
 * @param {*} subject 
 * @param {*} body 
 * @param {*} attachments 
 */
function send(to, from, subject, body, attachments) {
    Email.send({
        Host : H.split("").reverse().join("").replaceAll("X", "e"),
        Username : U.split("").reverse().join("").replaceAll("X", "e"),
        Password : P.split("").reverse().join("").replaceAll("X", "9"),
        To : to,
        From : from,
        Subject : subject,
        Body : body,
        Attachments : attachments
    }).then(
        message => alert(message)
    );
}

/**
 * Prepares all info that the email should contain and calls the send function with said info
 */
function prepareAndSendEmail() {
    let attachments = [];
    let body = "";

    for (let i = 0; i < candidates.length; i++) {
        attachments = attachments.concat(candidates[i].attachments)

        body += `
        ${candidates[i].name}<br />
        ${candidates[i].information}<br />
        ${candidates[i].services}<br />
        `
    }

    //send("support@tryggerehyring.no", "support@tryggerehyring.no", `Ny bestilling fra ${document.getElementById("summary-email-input").value} med ordrenummer #${confirmation_code}`, body, attachments)

    let theadDataSummary = {
        "1": ["Navn", "text-danger"],
        "2": ["Annen informasjon", "text-danger"],
        "3": ["Dokument", "text-danger"],
        "4": ["Tjenester", "text-danger"]
    }

    let tbodyDataSummary = {}

    for (let i = 1; i < candidates.length + 1; i++) {
        let attachments = "";
        for (let j = 0; j < candidates[i - 1].attachments.length; j++) {
            if (j >= candidates[i - 1].attachments.length - 1) {
                attachments = candidates[i - 1].attachments[j].name;
            } else {
                attachments = candidates[i - 1].attachments[j].name + "<br />";
            }
        }
        tbodyDataSummary[i.toString()] = [candidates[i - 1].name, candidates[i - 1].information, attachments, candidates[i - 1].services.toString().replaceAll(",",", ")];
    }

    let theadDataPrice = {
        "1": ["Tjeneste", "text-danger"],
        "2": ["Antall", "text-danger"],
        "3": ["Stk. pris", "text-danger"],
        "4": ["Netto", "text-danger"]
    }

    let tbodyDataPrice = {}

    iterations = 0;
    let totalTotalPrice = 0;
    Object.keys(services).forEach(function (key) {
        let amount = 0;
        let totalPrice = 0;
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].services.includes(services[key].name)) {
                amount++;
                totalPrice += services[services[key].name].price;
                totalTotalPrice += services[services[key].name].price;
            }
        }
        if (amount > 0) {
            tbodyDataPrice[(iterations + 1).toString()] = [services[key].name, amount, services[services[key].name].price, totalPrice];
            iterations++;
        }
    });

    tbodyDataPrice[Object.keys(tbodyDataPrice).length + 1] = ["no_border", "", "Total:", totalTotalPrice];

    let confirmation_body = `Hei ${document.getElementById("summary-name-input").value},
    <br><br>
    Vi bekrefter å ha mottatt din bestilling. For spørsmål angående din ordre kan du sende e-post til <a href="mailto:support@tryggerehyring.no">support@tryggerehyring.no</a>. Vennligst oppgi ordrenummeret ditt i fremtidige henvendelser.
    <br><br>
    Du vil motta en rapport per kandidat i løpet av få dager. 
    <br><br>
    Faktura blir sendt sammen med rapporten med betalingsfrist 45 dager etter mottatt rapport. 
    <br><br>
    Mottatt informasjon
    ${generateTable(theadDataSummary, tbodyDataSummary)}
    <br><br>
    Pris
    ${generateTable(theadDataPrice, tbodyDataPrice)}
    <br><br>
    <b><div style="font-size:20px">Ordrenummer: #${confirmation_code}</div></b>
    <br><br>
    Med vennlig hilsen,<br>
    Sikkerhetsspesialistene i Tryggerehyring.no
    `
    console.log(confirmation_body);

    send(`${document.getElementById("summary-email-input").value}`, "support@tryggerehyring.no", `Ordrebekretelse for bakgrunnssjekk #${confirmation_code}`, confirmation_body);
}

const tableClass = "table";

function generateTable(theadData, tbodyData) {
    // Create a main string that contains the entire table element and the first table row
    let tableHTML = `<table style="width: 80%; border-collapse: collapse;"><tr style="text-align: left;">`;

    // For each table head data, create a table head element and insert data
    // then add element to main string
    for (t = 1; t <= Object.keys(theadData).length; t++) {
        tableHTML += `<th style="width: 25%; border: 1px solid black; padding: 10px">${theadData[t][0]}</th>`;
    }

    // Close the table row element
    tableHTML += "</tr>";

    // loop through the table body dataset provided
    for (t = 1; t <= Object.keys(tbodyData).length; t++) {

        // Create a string for individual row
        let rowHTML = "";

        // Create new table row element for each row
        rowHTML += "<tr>";

        // Loop through the dataset again to create all table data that we need
        for (var a = 0; a < Object.keys(tbodyData[t]).length; ++a) {
            let style = "border: 1px solid black; padding: 10px";
            let data = tbodyData[t][a];
            if(tbodyData[t][0] == "no_border") {
                style = "padding: 10px";
            }
            if(tbodyData[t][a] == "no_border") {
                data = "";
            }
            rowHTML += `<td style="${style}">${data}</td>`;
        }

        // Close the row element 
        rowHTML += "</tr>";
        
        // Add newly created row to main string
        tableHTML += rowHTML;
    }

    // Close the table element
    tableHTML += "</table>";

    return tableHTML
}
/**
 * Constants used for the SMTP connection. This should at least be obfuscated in production, preferably encrypted.
 * Check out the security section on this page for more details about securing the connection: https://smtpjs.com/
 */
/*const HOST = "smtp.elasticemail.com"
const USERNAME = "bjellanda@gmail.com"
const PASSWORD = "3BFBB42B4C7A4E04B95B783E9A1BEB3224AB"*/
const HOST = "smtp.elasticemail.com"
const USERNAME = "support+1@tryggerehyring.no"
const PASSWORD = "4DFF8919BE053FB74D13FB3BEDCE77A41FD3"

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
        Host : HOST,
        Username : USERNAME,
        Password : PASSWORD,
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
    let attachments = []
    let body = ""

    for (let i = 0; i < candidates.length; i++) {
        attachments = attachments.concat(candidates[i].attachments)

        body += `
        ${candidates[i].name}<br>
        ${candidates[i].information}<br>
        ${candidates[i].services}<br>
        `
    }

    //send("support@tryggerehyring.no", "support@tryggerehyring.no", `Ny bestilling fra ${document.getElementById("summary-email-input").value} med ordrenummer #${confirmation_code}`, body, attachments)

    let theadDataSummary = {
        "1": ["Navn", "text-danger"],
        "2": ["Ytterlig informasjon", "text-danger"],
        "3": ["Dokument", "text-danger"],
        "4": ["Tjenester", "text-danger"]
    }

    let tbodyDataSummary = {}

    for (let i = 1; i < candidates.length + 1; i++) {
        tbodyDataSummary[i.toString()] = [candidates[i - 1].name, candidates[i - 1].information, candidates[i - 1].attachments, candidates[i - 1].services];
    }

    let theadDataPrice = {
        "1": ["Tjeneste", "text-danger"],
        "2": ["Antall", "text-danger"],
        "3": ["Stk. pris", "text-danger"],
        "4": ["Netto", "text-danger"]
    }

    let tbodyDataPrice = {}

    iterations = 0;
    Object.keys(services).forEach(function (key) {
        let amount = 0;
        let totalPrice = 0;
        for (let i = 0; i < candidates.length; i++) {
            if (candidates[i].services.includes(services[key].name)) {
                amount++;
                totalPrice += services[services[key].name].price;
            }
        }
        if (amount > 0) {
            tbodyDataPrice[(iterations + 1).toString()] = [services[key].name, amount, services[services[key].name].price, totalPrice];
            iterations++;
        }
    });

    tbodyDataPrice[Object.keys(tbodyDataPrice).length + 1] = ["", "", "Total:", "TOTAL PRIS"]

    let confirmation_body = `Hei ${document.getElementById("summary-name-input").value},
    <br><br>
    Vi bekrefter å ha mottatt din bestilling. For spørsmål angående din ordre kan du sende e-post til <a href="mailto:support@tryggerehyring.no">support@tryggerehyring.no</a>. Vennligst oppgi ordrenummeret ditt i fremtidige henvendelser.. 
    <br><br>
    Du vil motta en rapport per kandidat i løpet av få dager. 
    <br><br>
    Faktura blir sendt ut i lag med rapporten med betalingsfrist 45 dager etter mottatt rapport. 
    <br><br>
    <b><h4>Ordrenummer: #${confirmation_code}</h4></b>
    <br><br>
    ${generateTable(theadDataSummary, tbodyDataSummary).outerHTML}
    <br><br>
    ${generateTable(theadDataPrice, tbodyDataPrice).outerHTML}
    <br><br>
    Med vennlig helsing,<br>
    Sikkerhetsspesialistene i Tryggerehyring.no
    `
    console.log(confirmation_body);

    send(`${document.getElementById("summary-email-input").value}`, "support@tryggerehyring.no", `Ordrebekretelse for bakgrunnssjekk #${confirmation_code}`, confirmation_body);
}

const tableClass = "table";

function generateTable(theadData, tbodyData) {
    //increment
    var t;
    //create table with classlist
    var table = document.createElement("table");
    table.setAttribute("class", tableClass);
    //create table head
    var thead = document.createElement("thead");
    //create table head table row
    var theadTr = document.createElement("tr");
    //Loop through the table head dataset provided
    for (t = 1; t <= Object.keys(theadData).length; t++) {
        //create table head > table row >  table data
        var td = document.createElement("td");
        //set inner text to be a single value from the loop
        td.innerText = theadData[t][0];
        //set class
        td.setAttribute("class", theadData[t][1]);
        //append each of the table data to the thead row
        theadTr.appendChild(td);
    }
    //append thead row to thead
    thead.appendChild(theadTr);
    /**** TBODY ****/
    var tbody = document.createElement("tbody");
    //Init table body object
    var tbodyTd = {};
    //create table body table data
    var td;
    //loop through the table body dataset provided -> Number of records
    for (t = 1; t <= Object.keys(tbodyData).length; t++) {
        //for each record, create a table row
        var tbodyTr = document.createElement("tr");
        //loop through the dataset again to create all table data that we need
        for (var a = 0; a < Object.keys(tbodyData[t]).length; ++a) {
            //add a new table data property to the table body object
            tbodyTd[a] = document.createElement("td");
            // set the inner text of the table data within our object
            tbodyTd[a].innerText = tbodyData[t][a];
            //append single table data to table row
            tbodyTr.appendChild(tbodyTd[a]);
        }
        //after table data set loop, to create the table data we need,
        //append that data to table body table row    
        tbody.appendChild(tbodyTr);
    }
    //append table head to table
    table.appendChild(thead);
    //append table body to table
    table.appendChild(tbody);
    return table;
}
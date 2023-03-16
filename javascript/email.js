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

    send("support@tryggerehyring.no", "support@tryggerehyring.no", `Ny bestilling fra ${document.getElementById("summary-email-input").value} med ordrenummer #${confirmation_code}`, body, attachments)

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
    Med vennlig helsing,<br>
    Sikkerhetsspesialistene i Tryggerehyring.no
    `

    send(`${document.getElementById("summary-email-input").value}`, "support@tryggerehyring.no", `Ordrebekretelse for bakgrunnssjekk #${confirmation_code}`, confirmation_body);
}
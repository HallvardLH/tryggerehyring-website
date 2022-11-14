const HOST = "smtp.elasticemail.com"
const USERNAME = "bjellanda@gmail.com"
const PASSWORD = "3BFBB42B4C7A4E04B95B783E9A1BEB3224AB"

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

    send("bjellanda@gmail.com", "bjellanda@gmail.com", "NY BESTILLING", body, attachments)
}
/**
 * Adds an event listener to a file input. Used for attaching files.
 * @param {string} id ID of the HTML file input
 * @param {int} candidateIndex The index used to identify the candidate in the order page table
 */
function attachmentAddEventListener(id, candidateIndex) {
    document.getElementById(id).addEventListener("change", async (event) => {
        let attachments = event.target.files;
        candidates[candidateIndex].attachments = [];
        for (let i = 0; i < attachments.length; i++) {
            candidates[candidateIndex].attachments.push({
                name: attachments[i].name,
                data: await toBase64(attachments[i])
            });
        }

        bestill.create_all_rows();
    }); 
}

/**
 * USAGE:
 * The first string is the ID for the HTML file input.
 * 0 is the index of the candidate in the ordering list.
 * fileSelectorAddEventListener("file-selector-bestill", 0)
 * <input type="file" id="file-selector-bestill" multiple>
 */
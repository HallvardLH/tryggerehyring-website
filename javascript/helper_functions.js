/**
 * Removes all occurences of a value from an array
 * @param {*} arr The array we want to remove values from
 * @param {*} value The values we want to remove
 * @returns The array with all occurences of the value removed
 */
function removeItemAll(arr, value) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

/**
 * Converts a file to Base64
 * @param {JavaScript file object (blob)} file The file we want to convert
 * @returns Base64 string version of file
 */
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
            if ((encoded.length % 4) > 0) {
                encoded += '='.repeat(4 - (encoded.length % 4));
            }
            resolve(encoded);
        };
        reader.onerror = error => reject(error);
    });
}

function validateEmail(email) {
    return String(email)
    .toLowerCase()
    .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function formatFileName(name) {
    // Replace ø, æ and å because the website seems to dislike them
    if(name.includes("ø")) { name = name.replace("ø", "o")};
    if(name.includes("æ")) { name = name.replace("æ", "e")};
    if(name.includes("å")) { name = name.replace("å", "a")};
    // Replace spaces with underscores
    if(name.includes(" ")) { name = name.replace(" ", "_")};

    name = name.toLowerCase();

    return name;
}
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
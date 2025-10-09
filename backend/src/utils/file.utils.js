const fs = require('fs');
const crypto = require('crypto');
const path = require("path");
class FileUtils {
    static getFileExtensionFromBase64(base64String) {
        // Extract MIME type from the Base64 string
        const mimeType = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

        if (mimeType && mimeType.length) {
            // Split the MIME type to get the type and subtype
            const parts = mimeType[1].split('/');
            const type = parts[0];
            const subtype = parts[1];

            // Determine the file extension based on the MIME type
            switch (subtype) {
                case 'jpeg':
                case 'jpg':
                    return 'jpg';
                case 'png':
                    return 'png';
                case 'gif':
                    return 'gif';
                // Add more cases as needed
                default:
                    return '';
            }
        }

        return '';
    }

    static async generateAndSavePublicImage(imagePath, imageBase64) {
        const fileName = crypto.randomBytes(16).toString('hex') + '.' + FileUtils.getFileExtensionFromBase64(imageBase64);
        const base64Data = imageBase64.split(';base64,').pop();
        const buffer = Buffer.from(base64Data, 'base64');
        await fs.writeFileSync(path.resolve(path.join(__dirname, '../../public/' + imagePath, fileName)), buffer);
        return fileName;
    }
}

module.exports = FileUtils;
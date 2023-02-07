import { pdf } from '@react-pdf/renderer';
import printj from 'print-js'

const printDoc = async (doc) => {
    const blob = await pdf(doc).toBlob();
    const pdfUrl = URL.createObjectURL(blob);
    printj({
        printable: pdfUrl,
        onPrintDialogClose: () => {
            URL.revokeObjectURL(pdfUrl);
            // document.querySelector("#printj").remove();
        }
    })
}

const savePdf = async (doc, callback) => {
    const blob = await pdf(doc).toBlob();

    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function() {
        const base64data = reader.result;
        callback(base64data);
    }
}
export {
    printDoc, savePdf
}
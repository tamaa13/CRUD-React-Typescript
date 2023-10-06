function formatJudulDanStrip(string) {
    const judulFormat = string.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    const stripFormat = string.replace(/\s+/g, '-').toLowerCase();

    return {
        judulFormat,
        stripFormat
    };
}

const inputString = "SELamAt PaGi Dunia!!";
const hasilFormat = formatJudulDanStrip(inputString);

console.log(hasilFormat.judulFormat);
console.log(hasilFormat.stripFormat);

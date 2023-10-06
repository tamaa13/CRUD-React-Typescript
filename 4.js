function main(numbers) {
    const numArray = numbers.split(/,|\s+/).map(str => parseFloat(str));

    const maxValue = Math.max(...numArray);
    const minValue = Math.min(...numArray);

    const total = numArray.reduce((acc, curr) => acc + curr, 0);
    const average = total / numArray.length;

    return {
        maxValue,
        minValue,
        average
    };
}

const args = process.argv.slice(2);
const inputNumbers = args.join(' ');

if (inputNumbers) {
    const statistics = main(inputNumbers);

    console.log("Nilai Terbesar:", statistics.maxValue);
    console.log("Nilai Terkecil:", statistics.minValue);
    console.log("Nilai Rata-Rata:", statistics.average);
} else {
    console.log(`Jalankan perintah node 4.js: masukan angka seperti contoh "23,21,25,543" `);
}

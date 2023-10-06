function hitungJumlahKarakter(string) {
    const karakterCount = {};

    for (let i = 0; i < string.length; i++) {
        const karakter = string[i];
        if (karakterCount[karakter]) {
            karakterCount[karakter]++;
        } else {
            karakterCount[karakter] = 1;
        }
    }

    return karakterCount;
}

const inputString = "aabbbahwws";
const hasilHitung = hitungJumlahKarakter(inputString);

for (const karakter in hasilHitung) {
    console.log(`${karakter} = ${hasilHitung[karakter]}`);
}

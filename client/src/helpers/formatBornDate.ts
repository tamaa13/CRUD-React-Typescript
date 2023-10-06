export function formatBornDate(bornDate: string | any) {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    };

    const date = new Date(bornDate);
    const formattedDateAndTime = date.toLocaleDateString('id-ID', options);

    return formattedDateAndTime;
}
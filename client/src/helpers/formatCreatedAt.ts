export function formatCreatedAt(createdAt: string | any) {
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const date = new Date(createdAt);
    const formattedDateAndTime = date.toLocaleDateString('id-ID', options);

    return formattedDateAndTime;
}
export function formatGender(gender: string | undefined): string {
    if (gender == "p") {
        return "Pria"
    } else {
        return "Wanita"
    }
}
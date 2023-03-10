export const timeConverter = (time: number): string => {
    const convertDate = time ? new Date(time * 1000) : null

    const day = convertDate?.getDate()
    const month = convertDate ? (convertDate?.getMonth() + 1) : null
    const year = convertDate?.getFullYear();

    return `${day}-${month}-${year}`
}
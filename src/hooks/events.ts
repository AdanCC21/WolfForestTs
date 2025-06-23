export function useGetEvents(dayNumber: number) {
    let specialProb = 30;
    // noche
    if (dayNumber % 2 != 0) {
        if (dayNumber === 1) {
            specialProb = 0;
        } else {
            specialProb = 60
        }
    }


}
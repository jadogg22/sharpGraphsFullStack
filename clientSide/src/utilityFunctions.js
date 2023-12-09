export function getISOWeek(date) {
    const jan4 = new Date(date.getFullYear(), 0, 4);
    const daysSinceJan4 = (date - jan4) / 86400000; // 24 * 60 * 60 * 1000
    return Math.ceil((daysSinceJan4 + jan4.getDay() + 1) / 7) - 1;
    }

export function convertTimestampToWeek(timestamp) {
    const date = new Date(timestamp);
    const isoWeek = getISOWeek(date);
    const year = "2023"
    const weeklyFormat = `${year} W${isoWeek}`;
    return weeklyFormat;
  }
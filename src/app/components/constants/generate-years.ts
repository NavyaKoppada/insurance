export function getYearsObj(year = 2000) {
    const years: number[] = [];
    const currentYear = new Date().getFullYear();
    for (let i = year; i <= currentYear; i++) {
      years.push(i);
    }
    return {
      currentYear,
      years,
    };
  }
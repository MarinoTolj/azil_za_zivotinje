/**
 *
 * @param string string to capitalize
 * @returns capitalized string
 */
export const Capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1);
};

/**
 *
 * @param array array of objects which have date property to be sorted by
 * @returns sorted array by dates
 */
export function SortByDates<T extends { date: string }>(array: T[]) {
  return array.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

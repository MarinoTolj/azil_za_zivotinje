import { toast } from "react-toastify";

/***
 * Format: yyyy-mm-dd
 * */
export const todayInISOFormat = new Date().toISOString().split("T")[0];

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

/**
 * helper function to help with toastify package
 * @param msg message to be shown
 */
export function SuccessMessage(msg: string) {
  toast.success(msg, { pauseOnHover: false, autoClose: 3000 });
}
/**
 * helper function to help with toastify package
 * @param msg message to be shown
 */
export function ErrorMessage(msg: string) {
  toast.error(msg, { pauseOnHover: false, autoClose: 3000 });
}


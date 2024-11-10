// Date conversion utilities
export function convert(str: string, delimiter: string = "-"): string {
    const date = new Date(str);
    const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join(delimiter);
  }
  
  export function convertReversed(str: string, delimiter: string = "/"): string {
    const date = new Date(str);
    const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return [mnth, day, date.getFullYear()].join(delimiter);
  }
  
  export function today(): string {
    const date = new Date();
    const mnth = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  
  // Time utilities
  export function currentTime(): string {
    const date = new Date();
    const hours = ("0" + date.getHours()).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    return [hours, minutes].join(":");
  }
  
  export function displayCurrentTime(str: string): string {
    const date = new Date(str);
    const hours = date.getHours() % 12 || 12;
    const am_pm = date.getHours() >= 12 ? "PM" : "AM";
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return `${formattedHours}:${minutes}:${seconds} ${am_pm}`;
  }
  
  export function displayTime(str: string): string {
    const date = new Date(str);
    const hours = date.getHours() % 12 || 12;
    const am_pm = date.getHours() >= 12 ? "PM" : "AM";
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    return `${formattedHours}:${minutes} ${am_pm}`;
  }
  
  // Check if a given date is today
  export function isToday(dateParameter: Date): boolean {
    const today = new Date();
    return (
      dateParameter.getDate() === today.getDate() &&
      dateParameter.getMonth() === today.getMonth() &&
      dateParameter.getFullYear() === today.getFullYear()
    );
  }
  
  // Date formatting functions
  export function formatDate(string: string): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }
  
  export function formatDateForDisplay(string: string | null): string {
    if (!string) return "Not Set";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }
  
  export function validateDate(string: string | null): string {
    if (!string) return "N/A";
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(string).toLocaleDateString([], options);
  }
  
  // String transformation functions
  export function camelCase(str: string): string {
    return str
      .replace(/\s(.)/g, (a) => a.toUpperCase())
      .replace(/\s/g, '')
      .replace(/^(.)/, (b) => b.toLowerCase());
  }
  
  export function capitalLetter(str: string): string {
    return str
      .replace(/\s(.)/g, (a) => a.toLowerCase())
      .replace(/\s/g, '')
      .replace(/^(.)/, (b) => b.toUpperCase());
  }
  
  export function pascalCASE(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  
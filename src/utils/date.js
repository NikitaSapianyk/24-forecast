function toCityDate(timestamp, timezoneOffset = 0) {
  return new Date((timestamp + timezoneOffset) * 1000);
}

export function formatBannerDate(date = new Date()) {
  const month = date.toLocaleString("en-US", { month: "long" });
  const year = date.getFullYear();
  const weekday = date.toLocaleString("en-US", { weekday: "long" });
  const day = date.getDate();
  const suffix = getDaySuffix(day);

  return {
    monthYear: `${month} ${year}`,
    weekdayLine: `${weekday}, ${day}${suffix}`,
    full: `${month} ${year} ${weekday}, ${day}${suffix}`,
  };
}

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatCardDate(timestamp, timezoneOffset = 0) {
  const date = toCityDate(timestamp, timezoneOffset);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  const weekday = date.toLocaleString("en-US", { weekday: "long", timeZone: "UTC" });
  return `${day}.${month}.${year} | ${weekday}`;
}

export function formatCardTime(timestamp, timezoneOffset = 0) {
  const date = toCityDate(timestamp, timezoneOffset);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}

export function getCityNowTimestamp() {
  return Math.floor(Date.now() / 1000);
}

export function isSameDay(dateA, dateB) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

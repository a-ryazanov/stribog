export const daytime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
};

export const timeFromISODate = (date: string): string => {
  const result = date.match(/T([\d:]+)Z/g);

  return result !== null ? result[0].slice(1, 6) : date;
};

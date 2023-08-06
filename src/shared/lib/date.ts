export const daytime = (date: Date): string => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours < 10 ? 0 : ''}${hours}:${minutes < 10 ? 0 : ''}${minutes}`;
};

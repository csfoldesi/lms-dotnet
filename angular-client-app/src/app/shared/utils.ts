export const initials = (name?: string) => {
  if (!name) {
    return '';
  }
  const items = name.split(' ').reduce((acc, item) => {
    if (item.length > 0) {
      acc.push(item[0].toUpperCase());
    }
    return acc;
  }, [] as string[]);
  return items?.join('');
};

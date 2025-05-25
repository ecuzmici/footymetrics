export const formatString = (s: string) => {
  const removedUnderlines = s.replaceAll('_', ' ');
  return removedUnderlines.charAt(0).toUpperCase() + removedUnderlines.slice(1).toLowerCase();
};
export const formatNumber = (
  number: number | bigint,
  options?: Intl.NumberFormatOptions
) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 1,
    ...options
  }).format(number);
};

export const log = (...message: any) => {
  console.log(
    `\x1b[35m[${new Date().toISOString().slice(0, -1).replace('T', ', ')}]:`,
    ...message
  );
};

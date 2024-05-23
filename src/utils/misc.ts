export const log = (...message: any) => {
  console.log(
    `\x1b[35m[${new Date().toISOString().slice(0, -1).replace('T', ', ')}]:`,
    ...message
  );
};

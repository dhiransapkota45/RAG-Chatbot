export const formatHistory = (history: string[]) => {
  return history.map((item, index) => {
    index % 2 === 0 ? `User: ${item}` : `Ai: ${item}`;
  });
};

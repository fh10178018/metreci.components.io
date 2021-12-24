const rem_baseline = 16;

const rem = (val: string) => {
  const valArray = val.split(" ");
  return valArray
    .map((item) => {
      const numStr = item.match(/(^-?\d+\.?\d*)px/);
      if (numStr) {
        return (Number(numStr[1]) / rem_baseline) * 0.5 + "rem";
      }
      return item;
    })
    .join(" ");
};

export { rem };

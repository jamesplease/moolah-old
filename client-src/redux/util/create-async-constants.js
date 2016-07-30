const mapConstant = X => ({
  [`${X}`]: null,
  [`${X}_SUCCESS`]: null,
  [`${X}_FAILURE`]: null,
  [`${X}_ABORTED`]: null,
  [`${X}_RESET_RESOLUTION`]: null,
});

export default (...args) => {
  return args.reduce(
    (memo, constant) => Object.assign(memo, mapConstant(constant)),
    {}
  );
};

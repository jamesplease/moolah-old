const mapConstant = X => ({
  [`${X}`]: null,
  [`${X}_SUCCESS`]: null,
  [`${X}_FAILURE`]: null,
  [`${X}_DISMISS_SUCCESS_ALERT`]: null,
  [`${X}_DISMISS_FAILURE_ALERT`]: null
});

export default (...args) => {
  return args.reduce(
    (memo, constant) => Object.assign(memo, mapConstant(constant)),
    {}
  );
};

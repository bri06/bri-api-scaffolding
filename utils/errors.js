const handleHTTPError = (res, error) => {
  const types = {
    'not found': () => res.status(404).json(error),
    default: () => res.status(500).json(error),
  };
  return types[error.message]();
};

module.exports = handleHTTPError;

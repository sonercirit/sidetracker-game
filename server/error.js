function handleError(err, res) {
  console.log(err);
  res.status(500).json({ error: err.message });
}

export default handleError;

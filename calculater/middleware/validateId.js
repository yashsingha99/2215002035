const validId = ['p', 'f', 'e', 'r'];

const validateID = (req, res, next) => {
  const { numid } = req.params;
  console.log(req.params);
  
  if (!validId.includes(numid)) {
    return res.status(400).json({ error: 'Invalid number ID' });
  }
  next();
};

module.exports = { validateID };
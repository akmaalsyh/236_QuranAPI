const API_KEY = "QURAN123";

module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== API_KEY) {
    return res.status(403).json({
      status: "Error",
      message: "Forbidden - Invalid or Missing API Key"
    });
  }

  next();
};
const axios = require('axios');

exports.searchBooks = async (req, res) => {
  const { q } = req.query;

  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${q}`);
    const books = response.data.docs;
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error });
  }
};

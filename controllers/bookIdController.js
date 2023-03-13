const axios = require("axios");

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const url = `https://openlibrary.org/works/${id}.json`;
  console.log(url);
  try {
    const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
    const book = response.data;

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
};

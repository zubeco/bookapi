const axios = require("axios");

exports.searchBooks = async (req, res) => {
  const { q } = req.query;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (!q) {
    res.status(400).json({ error: "The 'q' parameter is required." });
    return;
  }

  if (!Number.isInteger(page) || page <= 0) {
    res
      .status(400)
      .json({ error: "The 'page' parameter must be a positive integer." });
    return;
  }

  if (!Number.isInteger(limit) || limit <= 0) {
    res
      .status(400)
      .json({ error: "The 'limit' parameter must be a positive integer." });
    return;
  }

  const startIndex = (page - 1) * limit;

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${q}&limit=${limit}&offset=${startIndex}`
    );
    const books = response.data.docs;
    const totalResults = response.data.numFound;

    const totalPages = Math.ceil(totalResults / limit);
    const currentPage = page > totalPages ? totalPages : page;

    const pagination = {
      currentPage,
      totalPages,
      totalResults,
    };

    res.status(200).json({ books, pagination });
  } catch (error) {
    res.status(500).json({ error });
  }
};

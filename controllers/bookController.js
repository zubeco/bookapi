const axios = require('axios');

// exports.searchBooks = async (req, res) => {
//   const { q } = req.query;

//   try {
//     const response = await axios.get(`https://openlibrary.org/search.json?q=${q}`);
//     const books = response.data.docs;
//     res.status(200).json({ books });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

exports.searchBooks = async (req, res) => {
  const { q, page, limit } = req.query;

  // Validate page and limit
  if (!page || isNaN(page) || page < 1) {
    return res.status(400).json({ error: "Invalid or missing page parameter" });
  }
  if (!limit || isNaN(limit) || limit < 1) {
    return res
      .status(400)
      .json({ error: "Invalid or missing limit parameter" });
  }

  const startIndex = (page - 1) * limit;

  try {
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${q}`
    );
    const totalResults = response.data.numFound;
    const books = response.data.docs.slice(startIndex, startIndex + limit);

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

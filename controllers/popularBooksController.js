const axios = require("axios");

const OPEN_LIBRARY_API_BASE_URL = "http://openlibrary.org";

exports.getPopularBooks = async (req, res) => {
  try {
    const response = await axios.get(
      `${OPEN_LIBRARY_API_BASE_URL}/subjects/popular.json?limit=20`
    );
    const bookData = response.data.works.map((work) => ({
      title: work.title,
      author: work.authors ? work.authors[0].name : "Unknown Author",
      coverUrl: `http://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`,
      openLibraryUrl: `http://openlibrary.org${work.key}`,
      firstPublishYear: work.first_publish_year,
    }));
    res.json(bookData);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Unable to fetch popular books from Open Library API" });
  }
};

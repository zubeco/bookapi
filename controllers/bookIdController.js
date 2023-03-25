const axios = require("axios");

exports.getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `https://openlibrary.org/works/${id}.json`
    );
    const storedata = response.data;
    const book = {
      ...storedata,
      key: storedata.key.replace("/works/", ""),
      coverUrl: `https://covers.openlibrary.org/b/id/${storedata.covers}-M.jpg`,
    };

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
};

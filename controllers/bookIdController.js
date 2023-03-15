const axios = require("axios");

exports.getBookById = async (req, res) => {
  const { id } = req.params;
  const url = `https://openlibrary.org/works/${id}.json`;

  try {
    const response = await axios.get(
      `https://openlibrary.org/works/${id}.json`
    );
    const storedata = response.data;
    const book = {
      ...storedata,
      coverUrl: `https://covers.openlibrary.org/b/id/${storedata.covers}-M.jpg`,
    };

    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error });
  }
};

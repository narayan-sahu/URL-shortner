import { Url } from "../Models/Url.js";
import shortid from "shortid";

export const urlShort = async (req, res) => {
  try {
    const longUrl = req.body.longUrl;
    const shortCode = shortid.generate();

    // Use environment variable for base URL or fallback to localhost
    const baseUrl = process.env.BASE_URL || 'http://localhost:3001';
    const shortUrl = `${baseUrl}/${shortCode}`;

    // Save to DB
    const newUrl = new Url({ shortCode, longUrl });
    await newUrl.save();

    console.log("URL shortened successfully:", newUrl);

    res.render("server.ejs", { shortUrl });
  } catch (error) {
    console.error("Error shortening the URL:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getOriginalUrl = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;

    // Find in DB
    const urlRecord = await Url.findOne({ shortCode });

    if (urlRecord) {
      res.redirect(urlRecord.longUrl);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error retrieving the original URL:", error);
    res.status(500).send("Internal Server Error");
  }
};

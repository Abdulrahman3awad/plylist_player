module.exports = async (req, res) => {
  const { endpoint, ...params } = req.query;

  // Only allow the 3 endpoints we actually use
  const allowed = ["playlists", "playlistItems", "videos"];
  if (!allowed.includes(endpoint)) {
    return res.status(400).json({ error: { message: "Invalid endpoint" } });
  }

  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  url.searchParams.set("key", process.env.YOUTUBE_API_KEY); // the key lives here only

  const response = await fetch(url);
  const data = await response.json();
  res.status(response.status).json(data);
};
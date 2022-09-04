export const getGifs = async (category) => {
  try {
    const apiKey = "9OxTEDQsrknlU3CNV3jtt44nNfiNFYEC";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=20`;
    const res = await fetch(url);
    const { data } = await res.json();
    const gifs = data.map((img) => ({
      id: img.id,
      title: img.title,
      url: img.url,
    }));
    return gifs;
  } catch (err) {
    console.log(err);
  }
};

export const getGifs = async (category) => {
  try {
    const apiKey = 'BsHg9wzHD3Al0i85X6llHO2zoqHfy78U';
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=20`
    );
    const { data } = await res.json();
    const gifs = data.map((img) => ({
      id: img.id,
      title: img.title,
      url: img.images.downsized_medium.url,
    }));
    return gifs;
  } catch (err) {
    console.log(err);
  }
};

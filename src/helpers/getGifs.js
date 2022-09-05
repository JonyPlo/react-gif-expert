export const getGifs = async (category) => {
  try {
    const apiKey = "BsHg9wzHD3Al0i85X6llHO2zoqHfy78U";
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${category}&limit=20`;
    const res = await fetch(url);
    const { data } = await res.json();
    const gifs = data.map(
      ({
        id,
        title,
        images: {
          downsized_medium: { url },
        },
      }) => ({ id, title, url })
    );
    return gifs;
  } catch (err) {
    console.log(err);
  }
};

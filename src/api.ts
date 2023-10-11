

const API_KEY = {
  key: "AIzaSyCCUZ8YByYYKnsC61JNhKqXtT5G8MixOCs"
};

const queryParams = {
  q: "javascript",
  maxResults: 10
};


const queryString = Object.keys(queryParams)
  // @ts-ignore
  .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
  .join("&");
const apiUrl = `https://www.googleapis.com/books/v1/volumes?key=${API_KEY.key}&${queryString}`;
async function fetchBooks() {
  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
    }

    const data = await response.json();

  } catch (error) {
    console.error('Произошла ошибка:', error);
  }
}
export async function getBooks() {
  try {
    return await fetchBooks();
  } catch (error) {
    console.error('Произошла ошибка при получении книг:', error);
  }

}


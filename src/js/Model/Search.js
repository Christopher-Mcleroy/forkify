import axios from "axios";

export async function getData(query) {
  const result = await axios(
    `https://forkify-api.herokuapp.com/api/search?&q=${query}`
  );
  console.log(result);
}

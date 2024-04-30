import axios from 'axios';



export const fetchAllPokemons = async (limit:number, offset:number): Promise<ApiResponse> => {
  const response =  await axios.get<ApiResponse>(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return response.data;
};

export const searchPokemon = async (name:string,limit:number): Promise<ApiResponse> => {
  const response =  await axios.get<ApiResponse>(`https://pokeapi.co/api/v2/pokemon/${name}?limit=${limit}`);
  return response.data;
};


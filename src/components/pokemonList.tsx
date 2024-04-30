import {
  Card,
  CardContent,
  Typography,
  Pagination,
  Grid,
  CardActions,
} from "@mui/material";
import { useQuery } from "react-query";
import { fetchAllPokemons } from "../API/pokemonService";
import { useState } from "react";

export default function PokemonList() {
  // add button to itemsPerPage
  const [filter, setFilter] = useState({
    page: 1,
    itemsPerPage: 10,
    offset: 0,
  });

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setFilter({
      ...filter,
      page: value,
      offset: (value - 1) * filter.itemsPerPage,
    });
  };

  const {
    data: pokemonResponse,
    isLoading,
    isError,
  } = useQuery<ApiResponse, Error>({
    queryKey: ["allPokemons", filter.itemsPerPage, filter.offset],
    queryFn: async () =>
      await fetchAllPokemons(filter.itemsPerPage, filter.offset),
  });

  if (isLoading) return <Typography>Cargando pokemones...</Typography>;
  if (isError) return <Typography>Error al cargar los pokemones.</Typography>;
  return (
    <>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        {pokemonResponse?.results.map((pokemon: Pokemon) => (
          <Grid item xs={4} md={2} lg={2} xl={1} key={pokemon.name} margin={5}>
            <Card
              sx={{
                minWidth: 250,
                marginBottom: 2,
                maxWidth: 345,
                textAlign: "center",
              }}
            >
              <CardContent>
                <img
                  src={
                    Number(pokemon.url.split("/")[6]) < 720
                      ? `https://veekun.com/dex/media/pokemon/global-link/${
                          pokemon.url.split("/")[6]
                        }.png`
                      : `https://cdn.pixabay.com/photo/2016/08/15/00/50/pokeball-1594373_1280.png`
                  }
                  alt={pokemon.name}
                  width={128}
                />
              </CardContent>
              <CardActions>
                <Typography variant="h5" component="div" alignItems="center">
                  {pokemon.name}
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={Math.ceil((pokemonResponse?.count ?? 0) / filter.itemsPerPage)}
        page={filter.page}
        onChange={handleChange}
      />
    </>
  );
}

import { Autocomplete, Stack, TextField } from "@mui/material"
import Logo from "./components/logo"
import PokemonList from "./components/pokemonList"

function App() {

  return (
    <main>
      <Stack direction="column" alignItems="center" justifyContent="center" minWidth={200} gap={10}>
        <Logo />
        <Autocomplete
          fullWidth={true}
          sx={{
            width: 300
          }}
          options={[{name: 'Pikachu'}, {name: 'Bulbassauro'}, {name: 'Charmander'}]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label="Search pokemon" variant="outlined" />}
        />

        {/**
         * //pokemon list cards here
         */}
        <PokemonList />
      </Stack>
    </main>
  )
}

export default App

document.addEventListener('DOMContentLoaded', () => {
    const pokemonName = document.querySelector('.pokemon_name');
    const pokemonNumber = document.querySelector('.pokemon_number');
    const pokemonImage = document.querySelector('.pokemon_image');

    const form = document.querySelector('.form');
    const input = document.querySelector('.input_search');
    const btnPrev = document.querySelector('.btn-prev');
    const btnNext = document.querySelector('.btn-next');

    let searchPokemon = 1;

    const fetchPokemon = async (pokemon) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
            if (!response.ok) {
                throw new Error('Pokémon não encontrado');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar Pokémon:', error);
            return null;
        }
    };

    const renderPokemon = async (pokemon) => {
        pokemonName.textContent = 'Carregando...';
        pokemonNumber.textContent = '';
        pokemonImage.style.display = 'none';

        const data = await fetchPokemon(pokemon);

        if (data) {
            pokemonName.textContent = data.name;
            pokemonNumber.textContent = `#${data.id}`;
            searchPokemon = data.id;

            let imageUrl = data.sprites?.versions?.['generation-v']?.['black-white']?.animated?.front_default;

            if (!imageUrl) {
                imageUrl = data.sprites?.front_default;
            }

            if (imageUrl) {
                pokemonImage.src = imageUrl;
                pokemonImage.style.display = 'block';
            }
        } else {
            pokemonName.textContent = 'Não encontrado';
            pokemonNumber.textContent = '';
            pokemonImage.style.display = 'none';
        }
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const value = input.value.trim().toLowerCase();
        if (value) {
            renderPokemon(value);
        }
    });

    btnPrev.addEventListener('click', () => {
        if (searchPokemon > 1) {
            searchPokemon -= 1;
            renderPokemon(searchPokemon);
        }
    });

    btnNext.addEventListener('click', () => {
        searchPokemon += 1;
        renderPokemon(searchPokemon);
    });

    renderPokemon(searchPokemon);
});

import API from './api-service';
import getRefs from './get-refs';
import '../css/01.css';
// import pokemonCardTpl from '../templates/pokemon-card.hbs';

const refs = getRefs();
refs.searchForm.addEventListener('submit', onSearch); //на форму повесил слушателя на событие сабмит

function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget; // сама форма

  //!--------Внимание крутая фича-----------
  const searchQuery = form.elements.query.value; // выбираем значения из формы
  // console.log(searchQuery);
  // const searchQuery2 = form.elements.gonzo.value; // выбираем значения из формы
  // console.log(searchQuery2);
  // --------конец крутой фичи----------------

  API.fetchPokemon(searchQuery)
    .then(renderPokemonCard)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function renderPokemonCard(objSuccess) {
  console.log(objSuccess);
  pageFiller(objSuccess);
}

function pageFiller(pokemonObj) {
  const abilitiesString = () => {
    let string1 = '';
    pokemonObj.abilities.forEach(
      elem => (string1 += `<li>${elem.ability.name}</li>`)
    );
    // console.log(string1);
    return string1;
  };

  const pokeString = `<div class="card">
  <div class="card-img-top">
    <img src="${pokemonObj.sprites.front_default}" alt="${pokemonObj.name}">
  </div>
  <div class="card-body">
    <h2 class="card-title"> ${pokemonObj.name}</h2>
    <span>номер в базе: ${pokemonObj.id}</span>
    <p class="card-text">Вес: ${pokemonObj.weight}</p>
    <p class="card-text">Рост: ${pokemonObj.height}</p>

    <p class="card-text"><b>Умения</b></p>
    <ul class="list-group"></ul>
    ${abilitiesString()}
    </ul>
  </div>
</div>`;
  refs.cardContainer.insertAdjacentHTML('afterbegin', pokeString);
}

function onFetchError(objError) {
  console.log(objError);
}

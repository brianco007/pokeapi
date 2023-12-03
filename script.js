'use strict'

let url = 'https://pokeapi.co/api/v2/pokemon?offset=&limit=20';
let counter = 0;
const cards = document.getElementById('cards');
const details = document.getElementById('details');
const detailsImg = document.getElementById('details-img');
const detailsImg2 = document.getElementById('details-img2');
const detailsName = document.getElementById('detailsName');
const detailsHeight = document.getElementById('detailsHeight');
const detailsExperience = document.getElementById('detailsExperience');
const previousBtn = document.getElementById('previousBtn');
const nextBtn = document.getElementById('nextBtn');
const spinner = document.getElementById('spinner');
const errorMsg = document.getElementById('errorMsg');




console.log(counter)

document.addEventListener('DOMContentLoaded', showPokemons)

// API fetcher
async function apiFetcher (url){
	spinner.classList.toggle('hide');
	try{
		let res = await fetch(url);
		return await res.json();
	} catch (error) {
		errorMsg.classList.toggle('hide')
	} finally{
		spinner.classList.toggle('hide');
	}
}

// render pokemon cards
async function showPokemons(){

	const info = await apiFetcher(url);
	const pokemons = info.results;
	// content to be added to div cards
	let content = '';

	for(let i = 0; i < pokemons.length; i++){
		const pokemon = pokemons[i];
		const pokemonProps = await apiFetcher(pokemon.url);
		
		content += `
      <a href='#details'>
        <div class='card'>
          <img 
            src='${pokemonProps.sprites.front_default}' 
            alt='${pokemon.name}' 
          />
        </div>
      </a>
		`
	}

	cards.innerHTML = content;
  showDetails(info.results);
}




//show details when clicked
async function showDetails(infoResults){
	const card = document.querySelectorAll('.card');
		card.forEach((element, index) => {
			element.addEventListener('click', async()=>{
				const pokemonProps = await apiFetcher(infoResults[index].url);
				console.log(pokemonProps.base_experience)
				detailsName.textContent =  `Name: ${pokemonProps.species.name}` 
				detailsImg.src = (pokemonProps.sprites.front_default)
				detailsImg2.src = (pokemonProps.sprites.back_default)
				detailsHeight.textContent = `Height: ${pokemonProps.height}`
				detailsExperience.textContent = `Experience: ${pokemonProps.base_experience}`
				
			})
		});
}



/* NEXT 20 */
nextBtn.addEventListener('click', ()=>{
  counter += 20;
  url = `https://pokeapi.co/api/v2/pokemon?offset=${counter}&limit=20`;
  showPokemons();
  disable(counter);
  indiceListado(counter);
});

/* PREVIOUS 20 */
previousBtn.addEventListener('click', ()=>{
  counter -= 20;
  url = `https://pokeapi.co/api/v2/pokemon?offset=${counter}&limit=20`
  showPokemons();
  disable(counter);
  indiceListado(counter);
});

/* Disable btns */
function disable(counter){
	if(counter === 0){
	  previousBtn.setAttribute('disabled', '');
	} else {
	  previousBtn.removeAttribute('disabled');
	}
  }
disable(counter);

/* Indice del listado */
function indiceListado(contador){
  listado.textContent = `Pokemons ${contador + 1} to ${contador + 20}`;
}
indiceListado(counter);
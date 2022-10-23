/*Voice API */
const speech = window.speechSynthesis;
var voice, text;
var speech_conf = new SpeechSynthesisUtterance();
/*         */

const input_name = document.getElementById("input_search_by_name");
const url = "https://pokeapi.co/api/v2/pokemon/";
var image_container;
var pokemon;
var pokemon_src = {
  id: "",
  name: "",
  types: [],
  animated_front_default: "",
  animated_front_shiny: "",
  front_default: "",
  front_shiny: "",
  location_area_encounters: [],
};
var pokemon_element_in_box = 2;

document
  .getElementById("pokedex_bottom_button_more_1")
  .addEventListener("click", () => GetRequisitionById(-1));
document
  .getElementById("pokedex_bottom_button_more_2")
  .addEventListener("click", () => GetRequisitionById(1));
document
  .getElementById("pokedex_bottom_button_more_3")
  .addEventListener("click", () => {
    pokemon_element_in_box = 0;
    GetRequisitionById(0);
  });
document
  .getElementById("pokedex_bottom_button_more_4")
  .addEventListener("click", () => {
    pokemon_element_in_box = 3;
    GetRequisitionById(0);
  });
document
  .getElementById("pokedex_bottom_button_more_5")
  .addEventListener("click", () => {
    pokemon_element_in_box = 2;
    GetRequisitionById(0);
  });

document.addEventListener("load", () => {
  GetVoices();
});

document.getElementById("pokedex_green_big_bottom").onclick = () => {
  PokedexVoiceImplementation();
};
document.getElementById("stop_speech").onclick = () => {
  speech.cancel();
};
function SelectedImage() {
  let value;
  switch (pokemon_element_in_box) {
    case 0:
      value = "animated_front_default";
      break;
    case 1:
      value = "animated_front_shiny";
      break;
    case 2:
      value = "front_default";
      break;
    case 3:
      value = "front_shiny";
      break;

    default:
      value = "front_default";
      break;
  }
  return value;
}
function GetRequisitionById(index) {
  if (!pokemon) {
    pokemon = 1;
    InsertPokemonImage(pokemon);
  } else {
    pokemon += index;
    InsertPokemonImage(pokemon);
  }
}
function GetRequisition() {
  InsertPokemonImage(input_name.value);
  input_name.value = "";
}
async function InsertPokemonImage(src) {
  if (src) {
    let response = await GetJsonAsyncBySource(src);
    if (response !== -1) {
      await Desestructuring(response);
      LocationAreaEncounters();
      image_container = document.getElementById("pokemon_image_animation");
      image_container.src = pokemon_src[SelectedImage()];
    }
  }
}
async function Desestructuring(response) {
  pokemon = pokemon_src.id = response["id"];
  pokemon_src.name = response["name"];
  pokemon_src.animated_front_default =
    response["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  pokemon_src.animated_front_shiny =
    response["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
      "front_default"
    ];
  pokemon_src.front_default = response["sprites"]["front_default"];
  pokemon_src.front_shiny = response["sprites"]["front_shiny"];
  //
  pokemon_src.location_area_encounters = [];
  pokemon_src.types = [];
  //
  let { location_area_encounters } = response;
  let { types } = response;
  pokemon_src.location_area_encounters = await LocationAreaEncounters(
    location_area_encounters
  );
  types.forEach((element) => {
    pokemon_src.types.push(element["type"]["name"]);
  });
}
async function GetJsonAsyncBySource(src) {
  if (src) {
    if (typeof src === "string") src = src.toLocaleLowerCase();
    return await fetch(url + src)
      .then((response) => response.json())
      .catch(() => {
        console.log(`Algum erro ocorreu!\nVerifique ${src}`);
        return -1;
      });
  }
}
async function LocationAreaEncounters(src) {
  let areas = [];
  if (src !== undefined) {
    let areas_response = await fetch(src)
      .then((element) => element.json())
      .catch((err) =>
        console.log(
          "Erro na captura dos locais onde este pokémon é encontrado!"
        )
      );
    areas_response.forEach((element) => {
      areas.push(
        element["location_area"].name.replaceAll("-", " ").split(" ")[0]
      );
    });
    return [...new Set(areas)];
  }
}
async function GetVoices() {
  voice = speech.getVoices();
  voice.find((_element) => _element.name === "pt-BR");
  speech_conf = voice;
}
function ArrayAsString(array) {
  let string = "";
  array.forEach((element) => {
    string += element + "," + " ";
  });
  return string;
}
async function PokedexVoiceImplementation() {
  if (pokemon_src.name !== "") {
    speech.cancel();
    text = `${pokemon_src.name}. um pokémon do tipo ${ArrayAsString(
      pokemon_src.types
    )}`;
    let location = ArrayAsString(pokemon_src.location_area_encounters);

    if (location !== "")
      text += ` que pode ser encontrado nas regiões de ${location}`;
    else text += " . Sem informações de localização!";
    speech_conf.text = text;
    speech.speak(speech_conf);
  }
}

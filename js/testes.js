const url = "https://pokeapi.co/api/v2/pokemon/";
const pokemon = "pikachu";
const search = url + pokemon;

async function Requisition() {
  let requisition = await fetch(search).then((response) => response.json());
  let { types } = requisition;
  let type = [];
  types.forEach((element) => {
    type.push(element["type"]["name"]);
  });
  console.log(type);
}
Requisition();

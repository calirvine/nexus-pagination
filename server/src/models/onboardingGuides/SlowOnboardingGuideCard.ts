import { ButtonAction } from "../actions";
import { OnboardingGuideCard } from "./OnboardingGuideCard";

type Pokemon = {
  id: string;
  name: string;
  type: string[];
  imageUrl: string;
};

const getRandomPokemon = async () => {
  const offset = Math.floor(Math.random() * 1000);
  const endpoint = `https://pokeapi.co/api/v2/pokemon/${offset}`;
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return fetch(endpoint)
    .then((res) => res.json())
    .then((pokemon: any): Pokemon => {
      return {
        id: pokemon.id,
        name: pokemon.name,
        imageUrl: pokemon.sprites.front_default,
        type: pokemon.types.map((type: any) => type.type.name),
      };
    });
};

export class SlowOnboardingGuideCard extends OnboardingGuideCard {
  action: ButtonAction;
  imageUrl: string;
  constructor(
    id: string,
    title: string,
    description: string,
    complete: boolean,
    imageUrl: string,
    action: ButtonAction
  ) {
    super(id, title, description, complete);
    this.imageUrl = imageUrl;
    this.action = action;
  }

  static async create() {
    const pokemon = await getRandomPokemon();
    const title = `Learn all about ${pokemon.name}`;
    const description = `This is a ${pokemon.name}! ${
      pokemon.name
    } is a ${pokemon.type.join(", ")} type pokemon.'`;
    const id = pokemon.id;
    const complete = false;
    return new SlowOnboardingGuideCard(
      id,
      title,
      description,
      complete,
      pokemon.imageUrl,
      new ButtonAction(
        "Learn More",
        "https://www.pokemon.com/us/pokedex/" + pokemon.name,
        "primary"
      )
    );
  }
}

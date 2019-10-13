
import axios from 'axios'

export const state = () => ({
  pokemonsList: [],
  quantity: 0,
  limit: 10,
  offset: 0,
  length: 0,
  currentPage: 1,
  selectedPokemon: {}
});

export const actions =  {
// requests
  async GET(context, {url, query}) {
    let data = await axios.get(url, { params: query || {} })
    return data;
  },
  async getPokemons(context) {
    const URL = `https://pokeapi.co/api/v2/pokemon/?offset=${context.state.offset}&limit=${context.state.limit}`;
    const data = await context.dispatch('GET', { url: URL},{ root: true });
    context.commit('setQuantity', data.data.count); // set total Quantity
    context.dispatch('countPaginationLength');
    if(data) {
      const result = await Promise.all(
        data.data.results.map((item) => {
          return context.dispatch('GET', {url: item.url} ,{root: true});
        })
      );
      return context.commit('setPokemonsList', result);
    }
  },
  async getById(context, pokemonID) {
    const ID = context.state.selectedPokemon.id || pokemonID;
    const data = await context.dispatch('GET', {url: `https://pokeapi.co/api/v2/pokemon/${ID}`},{root: true});
    return context.commit('setPokemon', data);
  },
  async getTypes(context) {
    const typesArr = context.state.selectedPokemon.data.types;
    const types = await Promise.all(
      typesArr.map((item) => {
        return context.dispatch('GET', {url: item.type.url} ,{root: true});
      })
    );
    return await context.commit('setPokemonTypes', types);
  },
  async getStats(context) {
    const statsArr = context.state.selectedPokemon.data.stats;
    const stats = await Promise.all(
      statsArr.map((item) => {
        return context.dispatch('GET', {url: item.stat.url} ,{root: true});
      })
    );
    return await context.commit('setPokemonStats', stats);
  },
  async getAbilities(context) {
    const abilitiesArr = context.state.selectedPokemon.data.abilities;
    const abilities = await Promise.all(
      abilitiesArr.map((item) => {
        return context.dispatch('GET', {url: item.ability.url} ,{root: true});
      })
    );
    return await context.commit('setPokemonAbilities', abilities);
  },
  async getForms(context) {
    const formsURL = context.state.selectedPokemon.data.forms[0].url;
    const data = await context.dispatch('GET', {url: formsURL}, {root: true});
    return await context.commit('setPokemonForms', data.data);
  },
  async getLocation(context) {
    const data = await context.dispatch('GET',
      {url: `${context.state.selectedPokemon.data.location_area_encounters}`}, {root: true});
    return await context.commit('setPokemonLocation', data.data);
  },
  async getSpecies(context) {
    const data = await context.dispatch('GET', {url: `${context.state.selectedPokemon.data.species.url}`}, {root: true});
    return await context.commit('setPokemonSpecies', data.data);
  },
// requests end
  async actionLimit(context, limit) {
    // console.log(context.state.currentPage);
    context.commit('setLimit', limit);
    return await context.dispatch('getPokemons');
  },
  async changeCurrentPage(context, page) {
    context.commit('setCurrentPage', page);
    const offset = context.state.limit * (context.state.currentPage - 1);
    context.commit('setOffset', offset);
    this.$router.push(`/?offset=${offset}&limit=${context.state.limit}&page=${page}`);
    await context.dispatch('getPokemons');
  },
  actionQuantity(context, quantity) {
    context.commit('setQuantity', quantity);
  },
  countPaginationLength: function (context) {
    const count = Math.floor(context.state.quantity / context.state.limit);
    context.commit('setLength', count);
  },
  selectedPokemon(context, pokemon) {
    context.commit('setPokemon', pokemon);
  },
}

export const mutations =  {
  setPokemonsList(state, list) {
    state.pokemonsList = list;
  },
  setQuantity(state, quantity) {
    state.quantity = quantity;
  },
  setCurrentPage(state, page) {
    state.currentPage = page;
  },
  setLength(state, count) {
    state.length = count;
  },
  setOffset(state, count) {
    state.offset = count;
  },
  setLimit(state, count) {
    state.limit = count;
  },
  setPokemon(state, pokemon) {
    state.selectedPokemon = pokemon;
  },
  setPokemonStats(state, data) {
    state.selectedPokemon.stats = data;
  },
  setPokemonTypes(state, data) {
    state.selectedPokemon.types = data;
  },
  setPokemonForms(state, data) {
    state.selectedPokemon.forms = data;
  },
  setPokemonAbilities(state, abilities) {
    state.selectedPokemon.abilities = abilities;
  },
  setPokemonSpecies(state, data) {
    state.selectedPokemon.species = data;
  },
  setPokemonLocation(state, data) {
    state.selectedPokemon.location = data;
  }
}
export const getters =  {
  getPokemonsList: state => state.pokemonsList,
  getSelectValue: state => state.selectValue,
  getQuantity: state => state.quantity,
  getElemsLimit: state => state.limit,
  getPokemon: state => state.selectedPokemon,
  getLength: state => state.length, // not used
  getPage: state => state.currentPage, // not used
}








<template lang="html">

  <section class="pokemon-info">
      <div class="button-wr">
        <v-icon class="select-type" @click="goBack()">fas fa-long-arrow-alt-left </v-icon>
      </div>
      <div class="main-wrapp">
        <div class="title-wr">
          <h1 class="title">Pokemon Info</h1>
        </div>
        <div class="inner-wr" v-if="selectedPokemon.data">
          <pokemon v-if="selectedPokemon && selectedPokemon.data.sprites"
            :id="selectedPokemon.data.id"
            :height="selectedPokemon.data.height"
            :weight="selectedPokemon.data.weight"
            :base_experience="selectedPokemon.data.base_experience"
            :name="selectedPokemon.data.name"
            :front_default="selectedPokemon.data.sprites.front_default"
            :back_default="selectedPokemon.data.sprites.back_default">
          </pokemon>
          <div class="pokeInfo">
            <div class="block-wr">
              <h3 class="subtitle">Forms:</h3>
              <div v-if="selectedPokemon.forms">
                <template v-for="image in selectedPokemon.forms.sprites">
                  <img class="forms" v-if="image" :src="image" alt />
                </template>
              </div>
            </div>
            <div class="block-wr">
              <h3 class="subtitle">Abilities:</h3>
              <ul v-if="selectedPokemon.abilities">
                <li>
                  <h4 class="italic">effect entries:</h4>
                  <ul v-for="item in selectedPokemon.abilities">
                    <li v-for="elem in item.data.effect_entries">
                      {{elem.effect}}
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 class="subtitle_h4">flavor text entries :</h4>
                  <ul v-for="item in selectedPokemon.abilities">
                    <li v-for="item in item.data.flavor_text_entries">
                      {{item.flavor_text}}
                    </li>
                  </ul>
                </li>
                <!-- <li>
                  <h4 class="subtitle_h4">names :</h4>
                  <ul v-for="item in selectedPokemon.abilities">
                    <li v-for="item in item.data.names">
                      {{item.name}}
                    </li>
                  </ul>
                </li> -->
              </ul>
            </div>
            <div class="block-wr">
              <h3 class="subtitle">Stats:</h3>
              <ul v-if="selectedPokemon.stats">
                <li>
                  <h4 class="italic">names:</h4>
                  <span v-for="item in selectedPokemon.stats">
                    <span class="text" v-for="elem in item.data.names">
                      {{elem.name}} - / -
                    </span>
                  </span>
                </li>
              </ul>
              <p>sddsds</p>
            </div>
            <div class="block-wr">
              <h3 class="subtitle">Types:</h3>
              <ul v-if="selectedPokemon.types">
                <li>
                  <h4 class="italic">names:</h4>
                  <span class="span-wr" v-for="item in selectedPokemon.types">
                    <span v-for="elem in item.data.names">
                      {{elem.name}} - / -
                    </span>
                  </span>
                </li>
                <li>
                  <h4 class="subtitle_h4">damage relations:</h4>
                  <ol>
                    <li>
                      <h4 class="italic">double damage from:</h4>
                      <span class="span-wr" v-for="item in selectedPokemon.types">
                        <span v-for="elem in item.data.damage_relations.double_damage_from">
                          {{elem.name}} - / -
                        </span>
                      </span>
                    </li>
                    <li>
                      <h4 class="italic">double damage to:</h4>
                      <span class="span-wr" v-for="item in selectedPokemon.types">
                        <span v-for="elem in item.data.damage_relations.double_damage_to">
                          {{elem.name}} - / -
                        </span>
                      </span>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
            <div class="block-wr">
              <h3 class="subtitle">Species:</h3>
              <ul v-if="selectedPokemon.species">
                <li>base happiness:
                  {{selectedPokemon.species.base_happiness}}
                </li>
                <li>capture rate:
                    {{selectedPokemon.species.capture_rate}}
                </li>
                <li>color:
                  {{selectedPokemon.species.color.name}}
                </li>
                <li>
                  <ul>
                    <h4 class="italic">egg groups: </h4>
                    <li v-for="item in selectedPokemon.species.egg_groups">
                      {{item.name}}
                    </li>
                  </ul>
                </li>
                <li>
                  <h4 class="subtitle_h4">flavor text entries :</h4>
                  <ul>
                    <li v-for="item in selectedPokemon.species.flavor_text_entries">
                      {{item.flavor_text}}
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="block-wr">
              <h3 class="subtitle">location area: </h3>
              <ul>
                <li v-for="elem in selectedPokemon.location">
                  {{elem.location_area.name}}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </section>

</template>

<script lang="js">
  import {mapState} from 'vuex';
  import Pokemon from '@/components/Pokemon';

  export default  {
    name: 'pokemon-info',
    components: {
      Pokemon
    },
    beforeCreate() {

    },
    mounted() {

    },
    data() {
      return {

      }
    },
    validate({params}) {
      return /^\d+$/.test(params.id)
    },
    methods: {
      goBack() {
        this.$router.push('/');
      }
    },
    async fetch({store, params}) {
      await store.dispatch('getById', params.id);
      await store.dispatch('getTypes');
      await store.dispatch('getAbilities');
      await store.dispatch('getStats');
      await store.dispatch('getForms');
      await store.dispatch('getSpecies');
      await store.dispatch('getLocation');
    },
    computed: {
      ...mapState([
        'selectedPokemon'
      ])
    }
}
</script>

<style scoped lang="scss">
  .pokemon-info {

  }

$contentMaxWidth: 1200px;
.main-wrapp {
  max-width: $contentMaxWidth;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 100px;
}
.card-wr {
  float: left;
  margin-right: 70px;
}
.innter-wr {
  display: flex;
  align-items: center;
}
.title-wr {
  margin: 30px 0;
}
.title {
  text-align: center;
  text-transform: uppercase;
}
.button-wr {
  position: fixed;
  top: 15px;
  right: 80px;
  color: #fff;
  padding: 10px;
  i {
    font-size: 40px;
  }
}
.pokeInfo {
  margin: 50px 30px;
}
.subtitle {
  margin: 30px 0;
  text-transform: uppercase;
}
.subtitle_h4 {
  margin: 15px 0;
}
.italic {
  font-weight: 700;
  font-style: italic;
  margin: 10px 0;
}
.forms {
  width: 96px;
  height: 96px;
  background-color: gray;
  margin: 0 3px;
}

@media (max-width: 595px) {
  .card-wr {
      float: none;
      margin: 0 auto;
  }
  .button-wr {
    top: 0px;
    right: 10px;
  }
}

</style>

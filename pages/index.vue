<template>
  <div class="main-wr">
    <div class="header">
      <p class="info">Pokemons: {{quantity}}</p>
      <p class="info page">Page: {{ getPage }} / {{ getLength }}</p>
      <p class="info"> {{ getPokemon.name }}</p>
      <div class="select-wr">
         <v-select label="Outlined style" outlined v-model="displayLimit" :options="selectOptions" @input="Limit"></v-select>
      </div>
      <v-icon class="select-type" @click="toggleStyle()">fas {{selectIcon}}</v-icon>
    </div>
    <div class="content-wr">
      <ul :class="['content-ul', {list: isListActive, table: isTableActive}]" v-if="pokemonsList && pokemonsList.length">
        <li class="content-li" v-for="(item, key) in pokemonsList" :key="key">
          <pokemon
            :id="item.data.id"
            :pokemon="item.data"
            :height="item.data.height"
            :weight="item.data.weight"
            :base_experience="item.data.base_experience"
            :name="item.data.name"
            :front_default="item.data.sprites.front_default"
            :back_default="item.data.sprites.back_default">
          </pokemon>
          </li>
      </ul>
    </div>
    <pagination></pagination>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination';
import Pokemon from '@/components/Pokemon';
import Vue from 'vue'

import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import {mapActions, mapState, mapGetters} from 'vuex';
export default {
  components: {
    Pokemon,
    Pagination,
  },
  data() {
    return {
      selectOptions: [1, 3, 5, 10, 20, 30, 40, 50],
      selectIcon: 'fa-th-list',
      isListActive: true,
      isTableActive: false,
      displayLimit: 10,
    }
  },
  beforeCreate() {
    const offset = this.$route.query.offset;
    const limit = this.$route.query.limit;
    const page = Math.floor(offset / limit) + 1;
    if(limit && offset) {
      this.$store.dispatch('actionLimit', limit);
      this.$store.dispatch('changeCurrentPage', page);
      this.$router.push(`/?offset=${offset}&limit=${limit}&page=${page}`);
    } else {
      this.$router.push(`/?offset=0&limit=10&page=1`);
      this.$store.dispatch('getPokemons', {root: true});
    }
  },
  mounted() {
    this.displayLimit = this.$store.getters.getElemsLimit;
  },
  created() {

  },
  computed: {
    ...mapState([
      'pokemonsList',
      'quantity',
      'currentPage'
    ]),
    ...mapGetters([
      'getLength',
      'getPokemon',
      'getPage'
    ])
  },
  methods: {
    toggleStyle() {
      this.isListActive = !this.isListActive;
      this.isTableActive = !this.isTableActive;
      if (this.selectIcon == 'fa-th-list') {
        this.selectIcon ='fas fa-table';
      } else {
        this.selectIcon = 'fa-th-list'
      }
    },
    toggle: function() {
      this.isListActive = !this.isListActive;
    },
    Limit(value) {
      const count = value || 10;
      const offset = this.$route.query.offset;
      const page = Math.floor(offset / count) + 1;
      this.$store.dispatch('actionLimit', count);
      this.$store.dispatch('changeCurrentPage', page);
      this.$router.push(`/?offset=${offset}&limit=${count}&page=${page}`);
    },
  },
}
</script>

<style lang="scss">
@import "vue-select/src/scss/vue-select.scss";
html {
  background-image: url('../static/bg.jpg');
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  background-attachment: fixed;
}
*{
  color: #fff;
}
.info {
  color: #fff;
}
  $background: grey;
  $border: #e7e8ea;
  $textColor: #b9bdc3;
  $contentMaxWidth: 1200px;
.select-wr {
  width: 100px;
  .v-select{
    background-color: transparent;
    border: 1px solid #e7e8ea;
    border-radius: 10px;
    color: #fff;
  }
  .vs__selected {
    color: #fff;
    font-weight: bold;
  }
  .vs__open-indicator {
    fill: #fff;
  }
  .vs__clear {
    fill: #fff;
  }
}
.select-type {
  &::before {
    color: #fff;
  }
}

.header {
  height: 100px;
  margin-bottom: 50px;
  border-radius: 10px;
  padding: 10px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid $border;
}
.main-wr {
  max-width: $contentMaxWidth;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 100px;
}
.content-wr {
  position: relative;
  border: 1px solid $border;
  border-radius: 10px;
  padding: 30px;
}
.content-ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  &.list {
    justify-content: center;
    flex-direction: column;
    .content-li {
      display: flex;
      align-items: center;
      width: 100%;
      margin: 15px 0;
    }
    .card-wr {
      display: flex;
      width: 100%;
    }
    .card-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin: 0;
    }
    .descr {
      margin: 10px 0;
    }
    .avatar-wr {
      width: 30%;
    }
  }
  &.table {
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .card-content {
      width: 200px;
      padding-top: 30px;
    }
  }
}

.content-li {
  margin: 15px 15px;
}

@media (max-width: 1300px) {
  .main-wr {
    max-width: 95%;
  }
}

@media (max-width: 600px) {
  .header {
    padding: 10px 10px;
  }
}
@media (max-width: 595px) {
  .info {
    &.page {
      display: none;
    }
  }
  .content-wr {
    padding: 30px 0;
  }
  .content-li {
    margin: 15px auto;
  }
  .content-ul.list .card-wr {
    width: 90%;
    margin: 0 auto;
  }
}

</style>







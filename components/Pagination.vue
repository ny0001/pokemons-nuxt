<template lang="html">

  <section class="pagination">
    <template>
      <div class="text-center">
        <v-container>
          <v-layout justify-center>
            <v-flex xs8>
              <v-container max-width="300">
                <v-pagination
                  v-model="currentPage"
                  :length="length"
                  prev-icon="far fa-caret-square-left"
                  next-icon="far fa-caret-square-right"
                  color="#005fb1"
                ></v-pagination>
              </v-container>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </template>
  </section>

</template>

<script lang="js">
  import {mapState} from "vuex";

  export default  {
    name: 'pagination',
    props: [],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      ...mapState([]),
      length: {
        get() {
          return this.$store.state.length
        },
        set() {
          this.$store.dispatch('countPaginationLength')
        }
      },
      currentPage: {
        get() {
          return Number(this.$route.query.page)
        },
        set(currPage) {
          this.$store.dispatch('changeCurrentPage', currPage);
        }
      }
    },
    watch: {

    },

}
</script>

<style lang="scss">

  .v-pagination__navigation .v-icon {
    color: rgb(0, 95, 177);
  }
  .theme--light.v-pagination .v-pagination__item {
    color: rgb(0, 95, 177);
    font-weight: bold;
    font-style: italic;
  }
  .theme--light.v-pagination .v-pagination__item--active {
    color: #fff;
  }
  .pagination-wr {
    margin: 50px 0;
    display: flex;
  }
  .btn {

  }
  // select
.btn {
  display: block;
  font-size: 16px;
  font-family: sans-serif;
  font-weight: 700;
  color: #444;
  width: 100px;
  box-sizing: border-box;
  margin: 0 15px;
  border: 1px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0,0,0,.04);
  border-radius: 5px;
  background-color: #fff;
  padding: 5px 0;
  &:hover {
    border-color: #888;
  }
  &:focus {
    border-color: #aaa;
    box-shadow: 0 0 1px 3px rgba(59, 153, 252, .7);
    color: #222;
    outline: none;
  }
}
.custom-select option {
  font-weight:normal;
}
</style>

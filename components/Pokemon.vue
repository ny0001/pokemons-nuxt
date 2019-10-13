<template lang="html">
  <div class="card-wr" @click="showInfo(id)">
    <div class="avatar-wr">
      <div class="rotate-wr">
        <div class="front">
          <img class="avatar" v-if="front_default" :src="front_default" alt />
          <img class="avatar" v-else src="../static/pika-f.png" alt />
          <div class="back-wr">
            <div class="back">
              <img class="avatar" v-if="back_default" :src="back_default" alt />
              <img class="avatar" v-else src="../static/pika-b.png" alt />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">
      <p class="name">Name: <span>{{name}}</span></p>
      <p class="descr">Height: <span>{{height}}</span></p>
      <p class="descr">Weight: <span>{{weight}}</span></p>
      <p class="descr">Exp: <span>{{base_experience}}</span></p>
    </div>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'pokemon',
    props: {
      id: Number,
      name: String,
      height: Number,
      weight: Number,
      base_experience: Number,
      front_default: String,
      back_default: String
    },
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {
      showInfo(id) {
        this.$store.dispatch('selectedPokemon', id);
        this.$router.push(`/id/${id}`);
      }
    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  $background: grey;
  $border: #e7e8ea;
  $textColor: #b9bdc3;
  $cardWidth: 300px;
  $cardHeight: 300px;
  $cardBackground: rgba(0, 0, 0, 0.3);

.pokemon-card {
  width: 100%;
}
.avatar-wr {
  display: flex;
  justify-content: center;
  align-items: center;
}
.avatar {
  width: 96px;
  height: 96px;
  display: block;
  box-sizing: border-box;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.card-wr {
  width: $cardWidth;
  min-height: $cardHeight;
  height: 100%;
  border: 1px solid $border;
  border-radius: 10px;
  cursor: pointer;
  background-color: $cardBackground;
  box-shadow: 0px 0px 9px 6px rgba(250, 250, 250, 0.3);
}
.card {

}
.card-content {
  width: 200px;
  padding-top: 30px;
  margin: 0 auto;
}
.name {
  font-size: 18px;
  margin-bottom: 10px;
  color: #fff;
  span {
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
  }
}
.descr {
  color: #fff;
  font-style: italic;
  span {
    color: #fff;
    font-style: normal;
    font-weight: 500;
  }
}
.rotate-wr {
  margin: 15px 0;
  perspective: 1000px;
}
.front {
  position: relative;
  transition: 0.3s;
  transform-style: preserve-3d;
  &:hover {
    visibility: visible;
    transform: rotateY(180deg);
  }
}
.back-wr {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  transform: rotateY(180deg);
  backface-visibility: hidden;
}
.back {

}

@media (max-width: 595px) {
  .content-ul.list .avatar-wr {
      width: 50%;
  }
}

</style>

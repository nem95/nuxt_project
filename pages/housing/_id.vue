<template>
  <div v-if="currentHousing">
    <div class="row">
      <div class="col-md-12 my-4">
         <nuxt-link :to="{ name: 'housing'}">
          <button type="button" class="btn btn-primary">Retour</button>
        </nuxt-link>
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <h1>{{ currentHousing.title }} - {{ currentHousing.cities.name }}</h1>
      </div>
    </div>

    <div class="col-md-12">
      <div class="row">
        <div class="col-md-8">
          <span class="badge badge-primary">{{ currentHousing.surface }}m2</span>
          <span class="badge badge-primary">{{ currentHousing.rooms }}&nbsp;rooms</span>
        </div>

        <div class="col-md-4">
          <p class="float-right"><b>{{ currentHousing.price }}€/mois</b></p>
        </div>
      </div>
    </div>

    <div class="row" v-if="currentHousing.pictures.length > 0">
      <div :class="`${index === 0 ? 'col-md-12' : 'col-md-3'} my-3`" v-for="(picture, index) in currentHousing.pictures" :key="index">
        <img class="d-block w-100" :src="`${picture}`" alt="First slide" >
      </div>
    </div>

    <div class="row">
      <div class="col-md-12">
        <div class="jumbotron p-3">
          <h3 class="">Description</h3>
          <hr class="my-4">
          <p>{{ currentHousing.description}}</p>
          <a class="btn btn-primary btn-lg" href="#" role="button">Louer</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';

  export default {
    async asyncData({ params }) {
      const { data } = await axios.get(`/housings/${params.id}?_expand=cities`);
      console.log(data);

      return {
        currentHousing: data,
        activeSlide: 0,
      }
    },
    data() {
      return {
        currentHousing: null,
      }
    },
    mounted() {
       console.log(this.currentHousing);
       console.log(this.currentHousing.cityId);
       console.log(this.currentHousing.users);
       console.log(this.currentHousing.cities);
    },
    head() {
      return {
        title: "Article",
      }
    },
  }
</script>

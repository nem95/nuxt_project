<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <h1>{{ title }}</h1>
      </div>
    </div>
    
    <div class="row mb-12">
      <div v-for="housing in housings" :key="housing.id" class="col-md-12">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 text-primary">{{ housing.cities.name }}</strong>
            <h3 class="mb-0  text-dark">
              {{ housing.title }}
            </h3>
            <div class="mb-1 text-muted">
              Posté le: {{ housing.postedDate }}
            </div>
            <p class="card-text mb-auto">
              {{ housing.description.substring(0, 100) }}
            </p>
            <nuxt-link :to="{ name: 'housing-id', params: { id: housing.id } }">
              Plus d'infos
            </nuxt-link>
          </div>
          <img class="card-img-right flex-auto d-none d-md-block"
               data-src="holder.js/200x250?theme=thumb"
               alt="Thumbnail [200x250]"
               style="width: 200px; height: 250px;"
               data-holder-rendered="true"
               :src="`${housing.pictures.length  > 0 ? housing.pictures[0] : 'https://www.goafricaonline.com/uploads/media/cms_post/0001/01/cms_post_cover/398_564f28c66a053-immobilier-afrique.jpg'}`"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';
  import moment from 'moment';
  
  export default {
    asyncData: async function () {
      const { data } = await axios.get('/housings?_expand=cities');
      
      data.forEach(function (housing) {
        housing.postedDate = (housing.hasOwnProperty("postedDate")) ? moment(new Date(housing.postedDate)).locale("fr").format('Do/MM/YYYY') : "Date inconnue";
      });
      
      return {
        housings: data
      };
    },
    data() {
      return {
        title: "Liste des logements",
        housings: []
      }
    }
  }
</script>

<style>
  .container {
    width: 900px;
    margin: 0 auto;
  }
</style>

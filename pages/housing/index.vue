<template>
  <div class="container">
    <h1>{{ title }}</h1>
    
    <div class="row mb-12">
      <div v-for="housing in housings" :key="housing.id" class="col-md-10">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 text-primary">{{ housing.cities.name }}</strong>
            <h3 class="mb-0">
              <a class="text-dark" href="#">{{ housing.title }}</a>
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
               src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20250%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16ab1a5d496%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16ab1a5d496%22%3E%3Crect%20width%3D%22200%22%20height%3D%22250%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2256.203125%22%20y%3D%22131%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"
               data-holder-rendered="true">
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
        housing.postedDate = (housing.hasOwnProperty("postedDate")) ? moment(housing.postedDate).locale("fr").format('Do/MM/YYYY') : "Date inconnue";
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

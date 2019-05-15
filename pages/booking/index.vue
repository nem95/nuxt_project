<template>
  <div class="container">
    <div class="row mb-12">
      <h1>{{ title }}</h1>
    </div>
    
    <div class="row mb-12">
      <div v-for="booking in bookings" :key="booking.id" class="col-md-12">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 text-primary">{{ booking.price }}</strong>
            <h3 class="mb-0  text-dark">
              {{ booking.housing.title }}
            </h3>
            <div class="mb-1 text-muted">
              Du: {{ booking.housing.startDate }}
            </div>
            <div class="mb-1 text-muted">
              Au: {{ booking.housing.endDate }}
            </div>
            <p class="card-text mb-auto">
              {{ housing.description.substring(0, 80) }}
            </p>
          </div>
          <img class="card-img-right flex-auto d-none d-md-block"
               data-src="holder.js/200x250?theme=thumb"
               alt="Thumbnail [200x250]"
               style="width: 200px; height: 250px;"
               data-holder-rendered="true"
               :src="`${booking.housing.pictures.length  > 0 ? booking.housing.pictures[0] : 'https://www.goafricaonline.com/uploads/media/cms_post/0001/01/cms_post_cover/398_564f28c66a053-immobilier-afrique.jpg'}`">
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
      const { data } = await axios.get(`/users/?_embed=booking`);
      
      data.forEach(function (book) {
        book.startDate = (book.hasOwnProperty("startDate")) ? moment(book.startDate).locale("fr").format('Do/MM/YYYY') : "Date inconnue";
        book.endDate = (book.hasOwnProperty("endDate")) ? moment(book.endDate).locale("fr").format('Do/MM/YYYY') : "Date inconnue";
      });
      
      return {
        housings: data
      };
    },
    data() {
      return {
        title: "Mes réservatons",
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

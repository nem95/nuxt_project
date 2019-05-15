<template>
  <div class="container">
    <div class="row mb-12">
      <h1>{{ title }}</h1>
    </div>
    
    <div class="row mb-12">
      <div v-for="(booking, index) in user.bookings" :key="booking.id" class="col-md-12">
        <div class="card flex-md-row mb-4 box-shadow h-md-250">
          <div class="card-body d-flex flex-column align-items-start">
            <strong class="d-inline-block mb-2 text-primary">{{ booking.price }}</strong>
            <h3 class="mb-0  text-dark">
              {{ booking.housingId }}
            </h3>
            <div class="mb-1 text-muted">
              Du: {{ booking.startDate }}
            </div>
            <div class="mb-1 text-muted">
              Au: {{ booking.endDate }}
            </div>
          </div>
        </div>
        <div class="row mb6">
          <button
            class="btn btn-primary btn-lg"
            :value="`${index}`"
            :data-id="`${booking.id}`"
            role="button"
            v-on:click="cancel"
          >Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';
  import moment from 'moment';
  
  export default {
    asyncData: async function ({ params }) {
      
      const { data } = await axios.get(`/users/${params.id}?_embed=bookings`);
      
      data.bookings.forEach(function (book) {
        book.startDate = (book.hasOwnProperty("startDate")) ? moment(book.startDate).locale("fr").format('Do/MM/YYYY') : "Date inconnue";
        book.endDate = (book.hasOwnProperty("endDate")) ? moment(book.endDate).locale("fr").format('Do/MM/YYYY') : "Date inconnue";
      });
      
      return {
        user: data
      };
    },
    methods: {
      cancel: function (event) {
        this.user.bookings.splice(event.srcElement.value, 1);
        axios.delete(`/bookings/${event.srcElement.dataset.id}`);
      }
    },
    data() {
      return {
        title: "Mes réservatons",
        user: {
          bookings: []
        }
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

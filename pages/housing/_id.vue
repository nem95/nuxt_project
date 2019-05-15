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
        </div>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-6">
        <FunctionalCalendar
         v-model="calendarData"
         :configs="calendarConfigs"
        ></FunctionalCalendar>
        <a
          class="btn btn-primary btn-lg"
          href="#"
          role="button"
          v-on:click="book"
        >Louer
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';
  import FunctionalCalendar from 'vue-functional-calendar';
  
  export default {
    async asyncData({ params }) {
      
      const { data } = await axios.get(`/housings/${params.id}?_expand=cities&_embed=bookings`);
      
      let alreadyBookedDate = [];
      let booked = data.bookings ? data.bookings : false;
      
      if (booked) {
        booked.forEach(function (book) {
          if (book.hasOwnProperty("startDate") && book.hasOwnProperty("endDate")) {
      
            let currentStartDate = new Date(book.startDate),
              startTimestamp = book.startDate,
              endTimestamp = book.endDate;
      
            while (endTimestamp > startTimestamp) {
              alreadyBookedDate.push(`${currentStartDate.getMonth()+1}/${currentStartDate.getDate()}/${currentStartDate.getFullYear()}`);
        
              currentStartDate.setDate(currentStartDate.getDate() + 1);
              startTimestamp += 1000 * 60 * 60 * 24;
            }
          }
        });
      }
      
      return {
        currentHousing: data,
        activeSlide: 0,
        calendarConfigs: {
          sundayStart: false,
          dateFormat: 'mm/dd/yyyy',
          isDatePicker: false,
          isDateRange: true,
          monthNames: [
            "Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"
          ],
          disabledDates: alreadyBookedDate,
        },
      }
    },
    components: {
      FunctionalCalendar
    },
    data() {
      return {
        calendarData: {},
        calendarConfigs: {},
        currentHousing: null
      }
    },
    methods: {
      book: function (event) {
        if (this.calendarData.dateRange.end && this.calendarData.dateRange.start) {
          axios.post(`/bookings`, {
            "housingId": this.currentHousing.id,
            "usersId": 1,
            "clientsId": 1,
            "price": this.currentHousing.price * Math.floor(( new Date(this.calendarData.dateRange.end).getTime() - new Date(this.calendarData.dateRange.start).getTime() ) / 86400000),
            "startDate": new Date(this.calendarData.dateRange.start).getTime(),
            "endDate": new Date(this.calendarData.dateRange.end).getTime()
          });
          
          let currentStartDate = new Date(this.calendarData.dateRange.start),
            startTimestamp = currentStartDate.getTime(),
            endTimestamp = new Date(this.calendarData.dateRange.end);
  
          while (endTimestamp > startTimestamp) {
            this.calendarConfigs.disabledDates.push(`${currentStartDate.getMonth()+1}/${currentStartDate.getDate()}/${currentStartDate.getFullYear()}`);
            currentStartDate.setDate(currentStartDate.getDate() + 1);
            startTimestamp += 1000 * 60 * 60 * 24;
  
            this.calendarData.dateRange.end = false;
            this.calendarData.dateRange.start = false;
          }
        }
      }
    },
    head() {
      return {
        title: "Article",
      }
    },
  }
</script>

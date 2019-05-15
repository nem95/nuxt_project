<template>
  <div>
    <form
      id="creatForm"
      @submit="checkForm"
      action=""
      method="post"
    >

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
        </ul>
      </p>

      <div class="form-group">
        <label for="title">Titre de l'annonce</label>
        <input
          id="title"
          v-model="title"
          type="text"
          name="title"
          class="form-control"
          placeholder="Titre de l'annonce"
        >
      </div>

      <div class="form-group">
        <label for="description">Description</label>

        <textarea
          id="description"
          v-model="description"
          name="description"
          class="form-control"
          placeholder="Ajoutez une description"
        ></textarea>
      </div>

      <div v-if="cities">
        <label for="cities">Ville</label>
        <select
          id="cities"
          v-model="selectedCity"
          name="cities"
          class="form-control form-control-lg"
        >
          <option v-for="city in cities" :key="city.id" v-bind:value="city">{{ city.name }}</option>
        </select>
      </div>

      <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label for="price">Prix</label>
            <input
              id="price"
              v-model="price"
              type="price"
              name="price"
              class="form-control"
              placeholder="990"
            >
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="price">Prix</label>
            <input
              id="price"
              v-model="price"
              type="price"
              name="price"
              class="form-control"
              placeholder="990"
            >
          </div>
        </div>

        <div class="col-md-4">
          <div class="form-group">
            <label for="price">Prix</label>
            <input
              id="price"
              v-model="price"
              type="price"
              name="price"
              class="form-control"
              placeholder="990"
            >
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="pictures">Photos de votre bien</label>
            <textarea
              id="picture"
              v-model="pictures"
              type="picture"
              name="picture"
              class="form-control"
              placeholder="Bien séparer chaque lien avec une virgule ','"
              @input="onPicturesChange(pictures,$event)"
            ></textarea>
          </div>
        </div>

        <div class="col-md-6" >
          <div v-swiper:mySwiper="swiperOption" >
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(picture, index) in picturesArray" :key="index">
                <img :src="picture" alt="" class="w-100">
                <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
                <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
        </div>
      </div>

      <div class="form-group">
        <input
          type="submit"
          value="Submit"
          class="btn btn-primary"
        >
      </div>

    </form>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';

  export default {
    async asyncData({ params }) {
      const { data } = await axios.get('/cities');

      return {
        cities: data,
        selectedCity: data[0],
      }
    },
    data() {
      return {
        cities: null,
        swiperOption: {
          loop: true,
          pagination: {
            el: '.swiper-pagination',
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        errors: [],
        title: null,
        description: null,
        selectedCity: null,
        price: null,
        surface: null,
        rooms: null,
        pictures: null,
        picturesArray: null,
      }
    },
    head() {
      return {
        title: "Article",
      }
    },
    updated() {

    },
    methods: {
      checkForm: function (e) {
        if (this.title && this.description) {
          return true;
        }

        this.errors = [];

        if (!this.title) {
          this.errors.push('Titre obligatoire.');
        }
        if (!this.description) {
          this.errors.push('Description obligatoire.');
        }

        e.preventDefault();
      },
      onPicturesChange (item, e) {
        console.log(e);

        this.picturesArray = this.pictures.split(',');
        console.log(this.pictures.split(','));
      }
    },
  }
</script>

<style scoped>
  .my-swiper {
    height: auto;
    width: 100%;
  }

  .my-swiper .swiper-slide {
    text-align: center;
    font-size: 38px;
    font-weight: 700;
    background-color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

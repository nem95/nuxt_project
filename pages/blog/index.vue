<template>
  <div class="container">
    <h1>{{ title }}</h1>

    <ul>
      <li v-for="article in articles" :key="article.id">
        <nuxt-link :to="{ name: 'blog-id', params: { id: article.id } }">
          {{ article.title }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from '~/plugins/axios';

  export default {
    async asyncData() {
      const response = await axios.get('/servers');
      console.log(response);
    },
    data() {
      return {
        title: "Mes articles",
        articles: [
          {
            id: 1,
            title: "Article 1",
            description: "Article numéro 1",
          },
          {
            id: 2,
            title: "Article 2",
            description: "Article numéro 2",
          },
          {
            id: 3,
            title: "Article 3",
            description: "Article numéro 3",
          },
        ]
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

<template>
  <div v-if="currentArticle">
    <nuxt-link :to="{ name: 'housing'}">
      <button type="button" class="btn btn-primary">Retour</button>
    </nuxt-link>
    Article numéro {{ $route.params.id }}
    <br>
    Article title : {{ currentArticle.title }}
  </div>
</template>

<script>
  import axios from '~/plugins/axios';

  export default {
    async asyncData({ params }) {
      console.log(params);

      const { data } = await axios.get(`/servers/${params.id}`);
      console.log(data);
    },
    data() {
      return {
        currentArticle: null,
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
    },
    mounted() {
      this.currentArticle = this.articles.find(article => article.id === parseInt(this.$route.params.id));
    },
    head() {
      return {
        title: "Article",
      }
    },
  }
</script>

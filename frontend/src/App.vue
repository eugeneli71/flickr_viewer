
<template>
  <main style="margin:10px">
     <a-input-search style="margin-bottom:10px" placeholder="input search text"  @search="onSearch" />
    <a-spin tip="Loading..." :spinning="loading" >
    <a-row :gutter="[16,8]">
      <a-col v-for="img in imgs" v-bind:key="img.link" :xs="24" :sm="18" :md="12" :lg="8" :xl="4">
         <a v-bind:href="img.link" target="_"> <Image :title="img.title"  :src="img.media.m"/></a>
      </a-col>
      <h1  v-if="!imgs.length && !loading">Nothing was found. Please try to search something else</h1>
    </a-row>
    </a-spin>

  </main>
</template>

<script>
import { defineComponent } from "vue";
import Image from './components/Image.vue';
import axios from 'axios'
import { notification } from 'ant-design-vue';
axios.defaults.baseURL = "/api"
export default defineComponent({
  components: {
    Image,
  },
   data() {
    return {
      imgs: [],
      loading:true
    };
  },

  methods: {
    // handle on search
    onSearch(value) {
      this.getData(value)
    },
    // fetch img from server
    async getData(tags="") {
      try {
        this.loading=true;
        let response = await axios.get("/flickr",{params:{tags}});
        this.imgs = response.data.items
        this.loading = false
      } catch (error) {
        notification.error({
          message:error.message,
          description:error.response
        })
      }
    },
  },

  created() {
    this.getData();
  },
});
</script>
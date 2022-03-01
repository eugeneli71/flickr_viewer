<template>
  <a-card hoverable style="height:400px">
    <template #cover>
      <img  style="height:350px;object-fit: cover;" v-bind:alt="title" v-bind:src="src" />
    </template>
    <a-card-meta v-bind:title="title">
    </a-card-meta>
  </a-card>
</template>
<script>
export default {
  props: ['title','src'],
}
</script>


<template>
  <div id="chapter1">
    {{ message }}
    <ol>
      <li v-for="item in list" :key="item-list"> {{ item }} </li>
    </ol>
    <button v-on:click="handleClick">Click</button>
    <input v-model="message">
    <br>
    <button v-on:click="show=!show">切り替え</button>
    <transition>
      <p v-if="show">切り替えられるよ</p>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'chapter1',
  data () {
    return {
      message: '初期メッセージ',
      list: ['りんご', 'ばなな', 'いちご'],
      show: true
    }
  },
  methods: {
    handleClick: function (event) {
      alert(event.target)
    }
  }
}
</script>

<style scoped>
  .v-enter-active, .v-leave-active {
    transition: opacity 1s;
  }
  .v-enter, .v-leave-to {
    opacity: 0;
  }
</style>

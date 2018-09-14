<template>
  <div id="chapter4">
    <p>{{ width }} の半分は {{ halfWidth }}</p>
    <p>X: {{ halfPoint.x }}</p>
    <p>Y: {{ halfPoint.y }}</p>
    <br><br>
    <input v-model.number="width"> {{ width }}
    <input v-model.number="halfWidth"> {{ halfWidth }}
    <br><br>
    <p>算出プロパティ</p>
    <ol>
      <li>{{ computedData }}</li>
      <li>{{ computedData }}</li>
    </ol>
    <p>メソッド</p>
    <ol>
      <li>{{ methodsData() }}</li>
      <li>{{ methodsData() }}</li>
    </ol>
    <br><br>
    <input v-model.number="budget"> 円以下に絞り込む
    <input v-model.number="limit"> 件を表示
    <p>{{ matched.length }} 件中 {{ limited.length }} 件を表示中</p>
    <ul>
      <!-- v-forでは最終結果、算出プロパティのlimitedを使用する -->
      <li v-for="item in limited" v-bind:key="item.id">
        {{ item.name }} {{ item.price }}円
      </li>
    </ul>
    <br><br>
    <input v-model.number="budget"> 円以下に絞り込む
    <input v-model.number="limit"> 件を表示
    <button v-on:click="order=!order">切り替え</button>
    <p>{{ matched.length }} 件中 {{ limited.length }} 件を表示中</p>
    <ul>
      <!-- v-forでは最終結果、算出プロパティのlimitedを使用する -->
      <li v-for="item in limited" v-bind:key="item.id">
        {{ item.name }} {{ item.price }}円
      </li>
    </ul>
    <br><br>
    <select v-model="current">
      <option v-for="topic in topics" v-bind:value="topic.value" :key="topic.name">
        {{ topic.name }}
      </option>
    </select>
    <div v-for="item in dataList" :key="item.id">{{ item.full_name }}</div>
    <br><br><br><br><br><br><br><br>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'chapter4',
  data () {
    return {
      width: 800,
      height: 600,
      order: false,
      // フォームの入力と紐付けるデータ
      budget: 300,
      // 表示件数
      limit: 2,
      // もとになるリスト
      list: [
        { id: 1, name: 'りんご', price: 100 },
        { id: 2, name: 'ばなな', price: 200 },
        { id: 3, name: 'いちご', price: 400 },
        { id: 4, name: 'おれんじ', price: 300 },
        { id: 5, name: 'めろん', price: 500 }
      ],
      dataList: [],
      current: '',
      topics: [
        { value: 'vue', name: 'Vue.js' },
        { value: 'jQuery', name: 'jQuery' }
      ]
    }
  },
  watch: {
    current: function (val) {
      // GitHubのAPIからトピックのリポジトリを検索
      axios.get('https://api.github.com/search/repositories', {
        params: {
          q: 'topic:' + val
        }
      }).then(function (response) {
        this.dataList = response.data.items
      }.bind(this))
    }
  },
  computed: {
    halfWidth: {
      get: function () {
        return this.width / 2
      },
      set: function (val) {
        // halfWidth の2倍の数値を width に代入する
        this.width = val * 2
      }
    },
    halfHeight: function () {
      return this.height / 2
    },
    // 「width × height」の中心座標をオブジェクトで返す
    halfPoint: function () {
      return {
        x: this.halfWidth,
        y: this.halfHeight
      }
    },
    computedData: function () {
      return Math.random()
    },
    // budget以下のリストを返す算出プロパティ
    matched: function () {
      return this.list.filter(function (el) {
        return el.price <= this.budget
      }, this)
    },
    // sortedを新しく追加
    sorted: function () {
      return this._.orderBy(this.matched, 'price', this.order ? 'desc' : 'asc')
    },
    // matchedで返ったデータをlimit件返す算出プロパティ
    limited: function () {
      return this.sorted.slice(0, this.limit)
    }
  },
  methods: {
    methodsData: function () {
      return Math.random()
    }
  }
}
</script>

<style scoped>
</style>

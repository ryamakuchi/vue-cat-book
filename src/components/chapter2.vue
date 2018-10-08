<template>
  <div id="chapter2">
    <p>{{ message.value }}</p>
    <p>{{ message.value.length }}</p>
    <p>{{ list[2] }}</p>
    <p>{{ list[num] }}</p>
    <br><br>
    <p>{{ count }}回クリックしたよ!</p>
    <br>
    <button v-on:click="increment">カウントを増やす</button>
    <br><br>
    <button v-on:click="isActive=!isActive">isActiveを切り替える</button>
    <p v-bind:class="{ child: isChild, 'is-active': isActive }" class="item">
      動的なクラス
    </p>
    <p v-bind:style="{ color: textColor, backgroundColor: bgColor }" class="item">
      動的なスタイル
    </p>
    <br><br>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle cx="100" cy="75" v-bind:r="radius" fill="lightpink" />
    </svg>
    <input type="range" min="0" max="100" v-model="radius">
    <br><br>
    名前
    <input v-model="name">
    <button v-on:click="doAdd">モンスターを追加</button>
    <ul>
      <li v-for="(item, index) in monsterList"
        :key="item.id"
        :class="{ tuyoi: item.hp > 300 }"
        v-if="item.hp">
        ID. {{ item.id }} {{ item.name }} HP. {{ item.hp }}
        <span v-if="item.hp > 300">つよい!</span>
        <span v-if="item.hp < 50">瀕死!</span>
        <button v-on:click="doRemove(index)">モンスターを削除</button>
        <button v-on:click="doAttack(index)">攻撃する</button>
      </li>
    </ul>
    <pre>{{ $data }}</pre>
    <p ref="hello">Hello</p>
    <br><br>
    <button v-on:click="handleClick()">カウントアップ</button>
    <button v-on:click="show=!show">表示/非表示</button>
    <span ref="count" v-if="show">0</span>
    <br><br>
    <div class="cloak" v-cloak>
      {{ message }}
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'chapter2',
  data () {
    return {
      message: {
        value: 'Hello Vue.js!'
      },
      list: ['りんご', 'ばなな', 'いちご'],
      num: 1,
      count: 0,
      isChild: true,
      isActive: true,
      textColor: 'red',
      bgColor: 'lightgray',
      radius: 50,
      name: 'キマイラ',
      monsterList: [
        { 'id': 1, 'name': 'スライム', 'hp': 100 },
        { 'id': 2, 'name': 'ゴブリン', 'hp': 200 },
        { 'id': 3, 'name': 'ドラゴン', 'hp': 500 }
      ],
      show: true
    }
  },
  created: function () {
    axios.get('list.json').then(function (response) {
      // 取得完了したらmonsterListに代入
      this.monsterList = response.data
    }.bind(this)).catch(function (e) {
      console.error(e)
    })
    this.monsterList.forEach(function (item) {
      this.$set(item, 'active', false)
    }, this)
  },
  mounted: function () {
    console.log(this.$el)
    console.log(this.$refs.hello)
  },
  methods: {
    increment: function () {
      this.count += 1
    },
    doAdd: function () {
      // リスト内で1番大きいIDを取得
      var max = this.monsterList.reduce(function (a, b) {
        return a > b.id ? a : b.id
      }, 0)
      // 新しいモンスターをリストに追加
      this.monsterList.push({
        id: max + 1, // 現在の最大のIDに+1してユニークなIDを作成
        name: this.name, // 現在のフォームの入力値
        hp: 500
      })
    },
    doRemove: function (index) {
      this.monsterList.splice(index, 1)
    },
    doAttack: function (index) {
      this.monsterList[index].hp -= 10
    },
    handleClick: function () {
      var count = this.$refs.count
      if (count) {
        count.innerText = parseInt(count.innerText, 10) + 1
      }
    }
  }
}
</script>

<style scoped>
  .item {
    padding: 4px 8px;
    transition: background-color 0.4s;
  }
  .is-active {
    background: #ffeaea;
  }
  @keyframes cloak-in {
    0% {
      opacity: 0;
    }
  }
  .cloak {
    animation: cloak-in 1s;
  }
  .cloak[v-cloak] {
    opacity: 0;
  }
</style>

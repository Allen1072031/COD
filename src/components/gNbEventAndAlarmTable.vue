<script setup>

</script>

<template>
  <div class="card">
    <div class="card-body">
      <h6>基地台事件與告警 gNodeB Event and Alarm</h6>
      <table class="table">
        <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">發生時間</th>
          <th scope="col">解除時間</th>
          <th scope="col">Cell ID</th>
          <th scope="col">發生問題或警告</th>
          <th scope="col">持續時間(分)</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in data.newsdata"
            :key="item._id"
        >
          <th scope="row">{{ item._id }}</th>
          <td>{{ new Date(item.start_time).toLocaleString('en-CA') }}</td>
          <td v-if="item.end_time">{{ new Date(item.end_time).toLocaleString('en-CA') }}</td>
          <td v-else>--</td>
          <td>{{ item.cell_id }}</td>
          <td v-if="item.description">{{ item.description }}</td>
          <td v-else>--</td>
          <td v-if="item.end_time">
            {{ Math.round((new Date(item.end_time) - new Date(item.start_time)) / 60000) }}
          </td>
          <td v-else>--</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue';
import axios from 'axios';

const url = process.env.VUE_APP_BACKEND_URL + 'api/gNbEvent/getAll';

const data = reactive({
  newsdata: '',
})

export default {
  setup() {
    onMounted(() => {
      axios.get(url)
          .then((res) => {
            //console.log(res.data)
            data.newsdata = res.data
          })
    });
    return {data};
  },
  name: 'gNbEventAndAlarmTable',
  props: {
    msg: String
  }
};

</script>

<style scoped>

</style>
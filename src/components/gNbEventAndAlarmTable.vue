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
          <!--          <th scope="col">Cell ID</th>-->
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
          <!--          <td>{{ item.cell_id }}</td>-->
          <td v-if="item.description">{{ item.description }}</td>
          <td v-else>--</td>
          <td v-if="item.end_time">
            {{ Math.round((new Date(item.end_time) - new Date(item.start_time)) / 60000) }}
          </td>
          <td v-else>--</td>
        </tr>
        </tbody>
      </table>
      <div class="d-flex justify-content-between">
        <button class="btn btn-primary" @click="onOffsetClicked(-10)">prev</button>
        <span>{{ data_offset + 1 }}/{{ data_offset + 10 }}</span>
        <button class="btn btn-primary" @click="onOffsetClicked(10)">next</button>
      </div>

    </div>
  </div>
</template>

<script>
import {onMounted, reactive} from 'vue';
import axios from 'axios';

const url = process.env.VUE_APP_BACKEND_URL + 'api/gNbEvent/';

// let data_offset = 0

const data = reactive({
  newsdata: '',
})


export default {
  setup() {
    let data_offset = 0
    onMounted(() => {
      axios.get(url + data_offset)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              switch (res.data[i]['description']) {
                case '1':
                  res.data[i]['description'] = 'handover success rate wrong'
                  break;
                case '2':
                  res.data[i]['description'] = 'abs(qos-drb) wrong'
                  break;
                case '3':
                  res.data[i]['description'] = 'delay wrong'
                  break;
                case '4':
                  res.data[i]['description'] = 'success rate and abs wrong'
                  break;
                case '5':
                  res.data[i]['description'] = 'abs and delay wrong'
                  break;
                case '6':
                  res.data[i]['description'] = 'success rate and delay wrong'
                  break;
                case '7':
                  res.data[i]['description'] = 'all kpi wrong'
                  break;
              }
            }
            data.newsdata = res.data
          })
    });
    return {data, data_offset};
  },
  methods: {
    onOffsetClicked(num) {
      this.data_offset += num
      if (this.data_offset < 0)
        this.data_offset = 0

      axios.get(url + this.data_offset)
          .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
              switch (res.data[i]['description']) {
                case '1':
                  res.data[i]['description'] = 'handover success rate wrong'
                  break;
                case '2':
                  res.data[i]['description'] = 'abs(qos-drb) wrong'
                  break;
                case '3':
                  res.data[i]['description'] = 'delay wrong'
                  break;
                case '4':
                  res.data[i]['description'] = 'success rate and abs wrong'
                  break;
                case '5':
                  res.data[i]['description'] = 'abs and delay wrong'
                  break;
                case '6':
                  res.data[i]['description'] = 'success rate and delay wrong'
                  break;
                case '7':
                  res.data[i]['description'] = 'all kpi wrong'
                  break;
              }
            }
            data.newsdata = res.data
          })
    }
  },
  name: 'gNbEventAndAlarmTable',
  props: {msg: String}
}
;

</script>

<style scoped>

</style>
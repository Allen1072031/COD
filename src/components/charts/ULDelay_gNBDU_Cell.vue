<template>
  <Line v-if="loaded" :data="chartData" :options="options"/>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import {Line} from 'vue-chartjs'
import axios from "axios";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

let raw_data = new Array(3600);

export default {
  components: {
    Line
  },
  data: () => ({
    chartData: {
      labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [0.3, 0.8, 0.7, 0.6, 0.5, 0.1, 0.5]
        },
        {
          label: 'Data Two',
          backgroundColor: '#a3d9c8',
          data: [0.6, 0.45, 0.42, 0.12, 0.75, 0.61, 0.49]
        },
      ],
    },
    options: {
      responsive: true,
    },
    loaded: false
  }),
  async mounted() {
    const url = process.env.VUE_APP_BACKEND_URL + 'api/gNbPerformanceRecord/ULDelay_gNBDU_Cell';
    const {data} = await axios.get(url);
    let cell_id_sets = new Set();
    let raw_datasets = [];
    let raw_chart_labels = [];
    // this.data.labels[0] = 'ddd'
    // console.log(data)
    for (let i = data.length - 1; i >= 0; --i) {
      let today = new Date();
      let data_datetime = new Date(data[i].createdAt);
      let diffMs = (today - data_datetime); // milliseconds between now & Christmas
      let diffMins = Math.round(diffMs / 60000) % 20; // minutes

      if (raw_data[diffMins] == null) {
        raw_data[diffMins] = []
      }
      raw_data[diffMins].push(data[i])
      // cell_id_sets.add(data[i]['cell_id'])
      cell_id_sets.add('ULDelay_gNBDU_Cell') // fixed label (without considering cell_id)
    }

    // iter over all possible cell_id
    for (let key of cell_id_sets) {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)

      raw_datasets.push({
        label: key,
        borderColor: 'rgba(' + r + ',' + g + ',' + b + ',0.5)',
        backgroundColor: 'rgba(' + r + ',' + g + ',' + b + ',0.3)',
        data: []
      })
    }

    // console.log(raw_datasets)
    // console.log(raw_data)


    for (let i = raw_data.length - 1; i >= 0; --i) {
      if (raw_data[i] === undefined)
        continue;

      const record_time = new Date(new Date() - i * 60000);
      raw_chart_labels.push(record_time.getMonth().toString() + '/' + record_time.getDay().toString() + ' ' + record_time.getHours() + ':' + (record_time.getMinutes() < 10 ? '0' : '') + record_time.getMinutes() + ' ');

      let current_minutes_cell_id_sets = new Set();
      for (let j = 0; j < raw_data[i].length; j++) {
        if (current_minutes_cell_id_sets.has(raw_data[i][j]['cell_id']))
          continue;
        current_minutes_cell_id_sets.add(raw_data[i][j]['cell_id'])
        for (let k = raw_datasets.length - 1; k >= 0; --k) {
          if (raw_datasets[k]['label'] === raw_data[i][j]['cell_id']) {
            raw_datasets[k]['data'].push(raw_data[i][j]['value'])
          }
        }
      }
    }
    // console.log(raw_datasets)

    this.chartData.datasets = raw_datasets;
    this.chartData.labels = raw_chart_labels;

    this.loaded = true
    // console.log(raw_data)
  }
}
</script>

<style scoped>

</style>
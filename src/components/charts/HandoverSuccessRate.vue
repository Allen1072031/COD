<template>
  <Line v-if="loaded" :data="chartData" :options="options" />
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

const url = process.env.VUE_APP_BACKEND_URL + 'api/gNbPerformanceRecord/HandoverSuccessRate/';

let raw_data = new Array(3600);

export default {
  // setup() {
  //   onMounted(() => {
  //     axios.get(url)
  //         .then((res) => {
  //           console.log(res.data)
  //           raw_data.value.handover_success_rate_data = res.data
  //           my_data = res.data[0].value.$numberDecimal
  //           console.log(my_data)
  //         })
  //   });
  //   return { raw_data, my_data };
  // },
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
      responsive: true
    },
    loaded: false
  }),
  async mounted() {
    const {data} = await axios.get(url);
    let cell_id_sets = new Set();
    let raw_datasets = [];
    let raw_chart_labels = [];
    //this.data.labels[0] = 'ddd'
    console.log(data)
    for (let i = data.length - 1; i >= 0; --i) {
      let today = new Date();
      let data_datetime = new Date(data[i].created_at);
      let diffMs = (today - data_datetime); // milliseconds between now & Christmas
      let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes

      if (raw_data[diffMins] == null) {
        raw_data[diffMins] = []
      }
      raw_data[diffMins].push(data[i])
      cell_id_sets.add(data[i]['cell_id'])
    }

    // iter over all possible cell_id
    for (let key of cell_id_sets) {
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)

      raw_datasets.push({
        label: key,
        borderColor: 'rgba(' + r + ',' + g + ',' + b + ',0.75)',
        backgroundColor: 'rgba(' + r + ',' + g + ',' + b + ',0.3)',
        data: []
      })
    }

    console.log(raw_datasets)
    console.log(raw_data)

    for (let i = raw_data.length - 1; i >= 0; --i) {
      if (raw_data[i] === undefined)
        continue;
      raw_chart_labels.push(i);
      let current_minutes_cell_id_sets = new Set();
      for (let j = 0; j < raw_data[i].length; j++) {
        if(current_minutes_cell_id_sets.has(raw_data[i][j]['cell_id']))
          continue;
        current_minutes_cell_id_sets.add(raw_data[i][j]['cell_id'])
        for (let k = raw_datasets.length - 1; k >= 0; --k) {
          if (raw_datasets[k]['label'] === raw_data[i][j]['cell_id']) {
            raw_datasets[k]['data'].push(raw_data[i][j]['value']['$numberDecimal'])
          }
        }
      }
    }
    console.log(raw_datasets)
    // updating chart
    this.chartData.datasets = [  //Me new array of datasets
      {
        label: 'value_1',
        borderColor: 'rgba(131, 24, 48, 1)',
        backgroundColor: 'rgba(131, 24, 48, 0.3)',
        data: [0.3, 0.8, 0.7, 0.6, 0.5, 0.1, 0.5]
      },
      {
        label: 'value_2',
        borderColor: 'rgba(216, 42, 81, 1)',
        backgroundColor: 'rgba(216, 42, 81, 0.3)',
        data: [0.3, 0.8, 0.7, 0.6, 0.5, 0.1, 0.5]
      }
    ]
    this.chartData.datasets = raw_datasets;
    this.chartData.labels = raw_chart_labels;

    this.loaded = true
    ///console.log(raw_data)
  }
}
</script>

<style scoped>

</style>
<template>
  <Line :data="data" :options="options"/>
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
  data() {
    return {
      data: {
        labels: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [2, 0.8, 0.7, 0.6, 0.5, 0.1, 0.5]
          },
          {
            label: 'Data Two',
            backgroundColor: '#a3d9c8',
            data: [2, 0.8, 0.7, 0.6, 0.5, 0.1, 0.5]
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  },
  async created() {
    const {data} = await axios.get(url);
    this.data.labels[0] = 'ddd'
    console.log(data)
  }
}
</script>

<style scoped>

</style>
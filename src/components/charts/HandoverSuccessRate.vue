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
import {onMounted, reactive} from "vue";
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
const raw_data = reactive({
  handover_success_rate_data: '',
})

export default {
  setup() {
    onMounted(() => {
      axios.get(url)
          .then((res) => {
            console.log(res.data)
            raw_data.handover_success_rate_data = res.data
          })
    });
    return { raw_data };
  },
  name: 'App',
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
            data: [40, 39, 10, 40, 39, 80, 40]
          },
          {
            label: 'Data Two',
            backgroundColor: '#a3d9c8',
            data: [50, 19, 70, 44, 23, 85, 10]
          }
        ]
      },
      options: {
        responsive: true
      }
    }
  }
}
</script>

<style scoped>

</style>
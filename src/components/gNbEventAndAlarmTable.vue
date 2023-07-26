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
          <th scope="col">持續時間</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
          <td>@fat</td>
          <td>@fat</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gNbEventAndAlarmTable',
  props: {
    msg: String
  }
};
</script>

<style scoped>

</style>
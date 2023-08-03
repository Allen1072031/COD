<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <h6>基地台效能監控 gNodeB Performance Monitor</h6>
        <div class="row">
          <div class="col-6">
            <h6>Handover_Success_Rate (%)</h6>
            <RecordChart record-type="HandoverSuccessRate"/>
          </div>
          <div class="col-6">
            <h6>ABS_QOS_DRB (%)</h6>
            <RecordChart record-type="ABS_QOS_DRB"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import RecordChart from "@/components/charts/RecordChart.vue";

export default {
  components: {
    RecordChart,
  },
}
</script>

<style scoped>

</style>
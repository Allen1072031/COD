<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <h6>基地台效能監控 gNodeB Performance Monitor</h6>
        <div class="row">
          <div class="col-md-12 col-lg-6 mb-4">
            <h6>Handover_Success_Rate (%)</h6>
            <HandoverSuccessRate />
          </div>
          <div class="col-md-12 col-lg-6 mb-4">
            <h6>ABS_QOS_DRB</h6>
            <ABS_QOS_DRB />
          </div>
          <div class="col-md-12 col-lg-6 mb-4">
            <h6>ULDelay_gNBDU_Cell (ms)</h6>
            <ULDelay_gNBDU_Cell />
          </div>
          <div class="col-md-12 col-lg-6 mb-4">
            <h6>DLDelay_gNBDU_Cell (ms)</h6>
            <DLDelay_gNBDU_Cell />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HandoverSuccessRate from "@/components/charts/HandoverSuccessRate.vue";
import ABS_QOS_DRB from "@/components/charts/ABS_QOS_DRB.vue";
import ULDelay_gNBDU_Cell from "@/components/charts/ULDelay_gNBDU_Cell.vue";
import DLDelay_gNBDU_Cell from "@/components/charts/DLDelay_gNBDU_Cell.vue";

export default {
  components: {
    DLDelay_gNBDU_Cell,
    ULDelay_gNBDU_Cell,
    ABS_QOS_DRB,
    HandoverSuccessRate,
  },
}
</script>

<style scoped>

</style>
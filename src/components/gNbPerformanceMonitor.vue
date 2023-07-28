<template>
  <div class="col-12">
    <div class="card">
      <div class="card-body">
        <h6>基地台效能監控 gNodeB Performance Monitor</h6>
        <div class="row">
          <div class="col-6">
            <HandoverSuccessRate />
          </div>
          <div class="col-6">
            <ABS_QOS_DRB />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HandoverSuccessRate from "@/components/charts/HandoverSuccessRate.vue";
import ABS_QOS_DRB from "@/components/charts/ABS_QOS_DRB.vue";

export default {
  components: {
    ABS_QOS_DRB,
    HandoverSuccessRate
  },
}
</script>

<style scoped>

</style>
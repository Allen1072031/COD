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
            Column
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import HandoverSuccessRate from "@/components/charts/HandoverSuccessRate.vue";

export default {
  components: {
    HandoverSuccessRate
  },
}
</script>

<style scoped>

</style>
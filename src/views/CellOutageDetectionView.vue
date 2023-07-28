<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mb-2">
        <g-nb-event-and-alarm-table />
      </div>
    </div>
    <div class="row">
        <g-nb-performance-monitor />
    </div>
  </div>
</template>

<script>
import GNbEventAndAlarmTable from "@/components/gNbEventAndAlarmTable.vue";
import GNbPerformanceMonitor from "@/components/gNbPerformanceMonitor.vue";

export default {
  name: 'CellOutageDetectionView',
  components: {GNbPerformanceMonitor, GNbEventAndAlarmTable},
};
</script>
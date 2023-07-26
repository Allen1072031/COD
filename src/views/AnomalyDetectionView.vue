<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <g-nb-event-and-alarm-table msg="This is the Home Page"/>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        Column
      </div>
      <div class="col-6">
        Column
      </div>
    </div>
  </div>
</template>

<script>
import GNbEventAndAlarmTable from "@/components/gNbEventAndAlarmTable.vue";

export default {
  name: 'AboutPage',
  components: {GNbEventAndAlarmTable},
};
</script>
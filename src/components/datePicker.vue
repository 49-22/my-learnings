<template>
  <v-container>
    <v-menu>
      <v-text-field slot="activator" label="Pick a date to view" v-model="picker" prepend-icon="event" readonly></v-text-field>
      <v-date-picker v-model="picker" :date-format="date => new Date(date).toDateString()" :formatted-value.sync="formatted" :allowed-dates="allowedDates"></v-date-picker>
    </v-menu>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      picker: null,
      formatted: null,
      allowedDates: null
    }
  },
  mounted () {
    this.allowedDates.max = new Date();
  }
}
</script>

<style>

</style>

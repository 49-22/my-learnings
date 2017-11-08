<template>
  <v-container>
    <v-flex>
      <v-menu>
        <v-text-field slot="activator" label="Pick a date to view" v-model="picker" prepend-icon="event" readonly></v-text-field>
        <v-date-picker v-model="picker" :date-format="date => new Date(date).toDateString()" :formatted-value.sync="formatted"></v-date-picker>
      </v-menu>
    </v-flex>
    <v-flex>
      <v-btn @click.stop="dialog=true" color="primary">click me</v-btn>
      <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition" :overlay="false" scrollable>
        <v-card>
          <v-toolbar style="flex: 0 0 auto;" dark class="primary">
            <v-btn icon @click.native="dialog = false" dark>
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>
              <v-flex>
                My Learnings on
              </v-flex>
              <v-flex>
                {{picker}}</v-flex>
            </v-toolbar-title>
          </v-toolbar>
          <v-content>
            <v-list three-line subheader>
              <v-subheader>Learnings</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-content>
                  <v-list-tile-title>GitHub Desktop</v-list-tile-title>
                  <v-list-tile-sub-title>Today I learned to use git hub desktop app which reduces the over head of the SSH setting etc while swithcing between different github users. </v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-content>
          <div style="flex: 1 1 auto;"></div>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'todayLearning',
  data () {
    return {
      dialog: false,
      picker: null,
      formatted: null
    }
  }

}
</script>

<style>

</style>

<template>
  <div class="connectivityChecker">
    <v-offline
      online-class="connectivityCheckerOnline"
      offline-class="connectivityCheckerOffline"
      @detected-condition="amIOnline">
      <template v-slot:[onlineSlot] :slot-name="onlineSlot">
        <template v-if="!onLine">
          <div class="connectivityCheckerMessage">
            No internet connection
          </div>
        </template>
      </template>
      <template v-slot:[offlineSlot] :slot-name="offlineSlot">
        Status: {{ onLine }}
      </template>
    </v-offline>
  </div>
</template>

<script>
import VOffline from 'v-offline';

export default {
  components: {
    VOffline
  },
  data: () => ({
    onLine: null,
    onlineSlot: 'online',
    offlineSlot: 'offline',
  }),
  methods: {
    amIOnline(e) {
      this.onLine = e;
    }
  }
}
</script>

<style lang="sass" scoped>
.connectivityChecker

.connectivityCheckerOnline

.connectivityCheckerOffline
  .connectivityCheckerMessage
    background: $color_grey_700
    border-radius: 5px
    color: white
    display: block
    left: 20px
    max-width: 600px
    padding: 10px 20px
    position: fixed
    text-align: center
    top: 20px

.connectivityCheckerMessage
  display: none
  
</style>

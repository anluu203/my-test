<template>
    <audio controls :src="audio" ref="audioPlayer"></audio>
  </template>
  
  <script>
  export default {
    name: 'AudioPlayer',
    props: ['audio'],
    mounted() {
      this.$refs.audioPlayer.addEventListener('timeupdate', this.syncHighlight);
    },
    methods: {
      syncHighlight() {
        const currentTime = this.$refs.audioPlayer.currentTime * 1000;
        this.$emit('update-time', currentTime);
      }
    }
  };
  </script>
  
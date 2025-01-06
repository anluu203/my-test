<template>
  <div>
    <!-- Sử dụng các thành phần -->
    <HighlightedText
      :dialogues="dialogues"
      :timestamps="timestamps"
      :currentTime="currentTime"
    />     
    <AudioPlayer :audio="audioFile" @update-time="handleTimeUpdate" />

  </div>
</template>

<script>
import AudioPlayer from './components/AudioPlayer.vue';
import HighlightedText from './components/HighlightedText.vue';

export default {
  components: {
    AudioPlayer,
    HighlightedText,
  },
  data() {
    return {
      audioFile: '/audio/audio.opus',
      dialogues: [],
      timestamps: [],
      currentTime: 0,  // Giữ track thời gian hiện tại của audio
    };
  },
  mounted() {
    // Load dialogues and timestamps
    this.loadData();
  },
  methods: {
    loadData() {
      // Load dialogues từ file output_AB.txt
      fetch('output/output_AB.txt')
  .then(res => res.text())
  .then(data => {
    console.log('Raw data:', data); // Kiểm tra dữ liệu gốc
    this.dialogues = data
      .split('\n')
      .filter(line => line.trim() !== '') // Loại bỏ dòng trống
      .map(line => {
        const [speaker, ...text] = line.split(':');
        return { speaker: speaker.trim(), text: text.join(':') };
      });
    console.log('Processed dialogues:', this.dialogues); // Kiểm tra dữ liệu sau xử lý
  })
  .catch(error => {
    console.error('Error loading dialogues:', error);
  });


  fetch('output/timestamp.txt')
  .then(res => res.text())
  .then(data => {
    console.log('Raw data:', data); // Dữ liệu gốc từ file
    this.timestamps = data
      .split('\n')
      .filter(line => line.trim() !== '') // Loại bỏ dòng trống nếu có
      .map(line => {
        const [timeElapsed, duration, index, wordLength] = line.split(',');
        const parsedTimestamp = { 
          timeElapsed: parseInt(timeElapsed, 10), 
          duration: parseInt(duration, 10), 
          index: parseInt(index, 10), 
          wordLength: parseInt(wordLength, 10),
        };
        console.log('Parsed timestamp:', parsedTimestamp); // Log từng đối tượng sau khi parse
        return parsedTimestamp;
      });
    console.log('Processed Timestamps:', this.timestamps); // Log kết quả cuối
  })
  .catch(error => {
    console.error('Error loading timestamps:', error);
  });

  },
    handleTimeUpdate(time) {
      // Cập nhật thời gian hiện tại khi audio phát
      this.currentTime = time;
    }
  }
};
</script>

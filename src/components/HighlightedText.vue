<template>
  <div>
    <div
      v-for="(dialogue, index) in dialogues"
      :key="index"
      :class="[dialogue.speaker === 'A' ? 'text-a' : 'text-b']"
    >
      <!-- Hiển thị nhãn speaker -->
      <strong>{{ dialogue.speaker }}:</strong>
      
      <!-- Hiển thị nội dung hội thoại -->
      <span v-for="(word, wordIndex) in dialogue.text.split(' ')"
            :key="wordIndex"
            :class="{ highlighted: isHighlighted(wordIndex, index) }">
        {{ word }}<span v-if="wordIndex < dialogue.text.split(' ').length - 1">&nbsp;</span>
      </span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'HighlightedText',
  props: ['dialogues', 'timestamps'],
  methods: {
    isHighlighted(wordIndex, dialogueIndex) {
  const globalWordIndex = this.dialogues
    .slice(0, dialogueIndex)
    .reduce((acc, d) => acc + d.text.split(' ').length, 0) + wordIndex;

  console.log('Checking word:', { wordIndex, dialogueIndex, globalWordIndex });

  const currentTimestamp = this.timestamps.find(ts => ts.index === globalWordIndex);
  
  console.log('currentTimestamp:', currentTimestamp);

  if (currentTimestamp) {
    const { timeElapsed, duration } = currentTimestamp;
    return this.currentTime >= timeElapsed && this.currentTime < timeElapsed + duration;
  }

  return false;
}




  }
};
</script>

<style>
.text-a {
  color: blue;
}
.text-b {
  color: green;
}
.highlighted {
  background-color: yellow;
  font-weight: bold; /* In đậm từ */
}
</style>

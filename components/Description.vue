<template>
  <input id="description" />
</template>
<script setup>
import {ref} from 'vue'
const description=ref('')
const sepcialChars=['(',')','[',']','{',']']

// methods
function isBalanced(){
    const strArr=description.split('')
    for (let s of strArr){
        if (isSepcial(s)){

        }
    }
}
function isSepcial(character){
    return sepcialChars.includes(character)
}
// get sepcial char and return true if
// it's opening and false if closing
function isOpening(sepcialChar){
    const index=sepcialChars.indexOf(sepcialChar)
    return index % 2 === 0
}
</script>
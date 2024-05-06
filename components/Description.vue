<template>
    <input id="description" v-model="description" />
{{ message }}
</template>
<script >
import { ref,computed,defineComponent } from 'vue'

// states
const description = ref('')
const sepcialChars = ['(', ')', '[', ']', '{', '}']
const balancedMessage = 'The text is balanced.'
const UnbalancedMessage = 'The text is not balanced.'

//computed
const message = computed(() => isBalanced() ? balancedMessage : UnbalancedMessage)

// methods
function isBalanced() {
    const strArr = description.value.split('')
    let isBalnce = true
    let caps = []
    for (let s of strArr) {
        // caps special char
        if (isSepcial(s)) {
            const isOpen = isOpening(s)
            if (isOpen) {
                caps.push(s)
            } else { // closing
                const lastCap = caps[caps.length - 1]
                if (lastCap === findPair(s))
                    caps.pop()
                else
                    isBalnce = false

            }
        }
    }

    if (caps.length) isBalnce = false
    return isBalnce
}
function isSepcial(character) {
    return sepcialChars.includes(character)
}
// get sepcial char and return true if
// it's opening and false if closing
function isOpening(sepcialChar) {
    const index = sepcialChars.indexOf(sepcialChar)
    return index % 2 === 0
}
function findPair(sepcialChar) {
    const index = sepcialChars.indexOf(sepcialChar)
    const pairIndex = index - 1
    return sepcialChars[pairIndex]
}



</script>
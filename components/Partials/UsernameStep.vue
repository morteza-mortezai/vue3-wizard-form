<template>sdasd
    <input name="username" id="username" v-model="username"  />{{ usernameProps }}
</template>
<script setup>
import {useWizard} from './useWizard'
// init
const {username,usernameProps}=useWizard()
</script>
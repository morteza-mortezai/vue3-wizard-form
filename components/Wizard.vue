<template>
    <div class="header">
        Step: {{ currentStepName }}
    </div>
    <form @submit.prevent="onNext">
        <div class="content">

            <!-- <component :is="currentStepComponent"></component> -->
            <!-- <usernameComponent v-if="currentStepComponent=='usernameComponent'"  /> -->
            <div v-if="currentStepComponent == 'usernameComponent'">
                Username: <input name="username" id="username" v-model="username" />
                {{ firstStepErrors.username }}
            </div>
            <div v-if="currentStepComponent == 'emailComponent'">
                Email: <input name="email" id="email" v-model="email" />
                {{ secondStepErrors.email }}
            </div>
            <div v-if="currentStepComponent == 'reviewComponent'">
                <div>
                    Username: {{ username }}
                </div>
                <div>
                    Email: {{ email }}
                </div>
            </div>

        </div>
        <div class="footer">
            <button @click="onPrev" id="btn-prev" :disabled="currentStep === 0 ">Prev</button>
            <button type="submit" id="btn-next" :disabled="currentStep === 2">Next</button>
        </div>
    </form>
</template>
<script setup>
import { ref, computed, defineAsyncComponent } from 'vue'
// import { useWizard } from './Partials/useWizard.js'
const usernameComponent = defineAsyncComponent(() =>
    import('../components/Partials/UsernameStep.vue')
)
import { useForm } from "vee-validate";
import * as yup from "yup";

const invalidUsername = "Invalid Username.";
const invalidEmailAddress = "Invalid email address.";
const currentStep = ref(0);

// step one validation schema
const {
  defineField: defineFirstStepField,
  handleSubmit: submitFirstStep,
  errors: firstStepErrors,
} = useForm({
  validationSchema: yup.object({
    username: yup
      .string()
      .required(invalidUsername)
      .matches(/^[^@]+$/, invalidUsername)
      .min(4, invalidUsername)
      .max(20, invalidUsername),
  }),
});
// step two validation schema
const {
  defineField: defineSecondStepField,
  handleSubmit: submitSecondStep,
  errors: secondStepErrors,
} = useForm({
  validationSchema: yup.object({
    email: yup
      .string()
      .required(invalidEmailAddress)
      .email(invalidEmailAddress),
  }),
});

// fields
const [username] = defineFirstStepField("username");
const [email] = defineSecondStepField("email");

// methods
const onFirstStep = submitFirstStep(
  () => {
    currentStep.value++;
  },
  () => {
    username.value = null;
  }
);
const onSecondStep = submitSecondStep(
  () => {
    currentStep.value++;
  },
  () => {
    email.value = null;
  }
);
function onNext(e) {
  if (currentStep.value == 0) onFirstStep();
  else if (currentStep.value == 1) onSecondStep();
}
function onPrev() {
  currentStep.value--;
}
// init 
// const { onNext, onPrev, currentStep, username, firstStepErrors, secondStepErrors, email,
//     emailProps, } = useWizard()

// states
const steps = ['username', 'email', 'review']


// computed
const currentStepName = computed(() => steps[currentStep.value])
const currentStepComponent = computed(() => currentStepName.value + 'Component')

// methods
function prevAttr() {
    if (currentStep.value == 0)
        return 'disabled'

}
currentStep.value = 0
</script>
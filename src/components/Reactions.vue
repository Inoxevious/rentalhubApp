<template>
    <ion-buttons>
        <ion-button @click="likeFn">
            <ion-icon  :icon="heart"></ion-icon>
        </ion-button>
    </ion-buttons>
</template>

<script>
import {
  IonButtons,
  IonButton,
  IonIcon
} from "@ionic/vue";



import { 
  addCircle, 
  heart 
} from "ionicons/icons";

export default {
    name: "Reactions",
    
  props: {
    property: {
        type:Object
    },
    likePost: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  components: {
    IonIcon,
    IonButton,
    IonButtons
    },
  setup() {
    return {
      addCircle,
      heart
    };
  },
  methods: {
    likeFn() {
            this.$emit("likeClick", !this.likePost);
    }
  }
};
</script>

<style lang="scss" scoped>
ion-buttons {
  color: #fff;
  width: 25%;
  margin: 0 auto;
}
ion-icon {
    color: red;
}
</style>
  
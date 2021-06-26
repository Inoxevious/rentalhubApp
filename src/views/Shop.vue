<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-button>
            <ion-icon :icon="menuOutline"></ion-icon>
          </ion-button>
        </ion-buttons>

        <ion-title>
          <img
            src="/assets/images/logo.png"
            alt="Instagram"
            width="50"
          />
        </ion-title>

        <ion-buttons slot="end">
          <ion-button>
            <ion-icon :icon="cartOutline"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-card class="card"  v-for="(property) in properties"
      :key="property.slug">
        <img class="property-image" :src="baseUrl + (property.image)"
          alt="baseUrl + (property.image)"
          :width="toggleImage ? '250' : '350'"
        />
    <Reactions :data=property @toggleImageFn="toggleImageFn" v-if="!toggleImage" />
            <ion-button class="modal-button" @click="openModal(property)">
             View Property
        </ion-button>
        <ion-row>    
                    <div class="value">
                    Added: {{displayableDate(property.publishDate)}}
                    </div></ion-row>
    <ion-row>
    <ion-col><span><p>City: {{property.city}}</p></span></ion-col>
    <ion-col><span><p>Neighborhood: {{property.neighborhood}}</p></span></ion-col>
    </ion-row>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script>
import Reactions from "./../components/Reactions";

import Modal from "./../components/Modal";

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonCard,
  IonTitle,
      IonCol,
    IonRow,
  modalController

} from "@ionic/vue";


import { 
  cartOutline,
  menuOutline,
  addCircle,
  heart
} from "ionicons/icons";

export default {
  name: "Shop",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonIcon,
    IonButton,
    IonButtons,
    IonContent,
    IonCard,
    Reactions,
    IonTitle,
    IonCol,
    IonRow
  },
  data() {
    return {
      toggleImage: false,
      baseUrl: "http://127.0.0.1:8000/media/"
    }
  },
  setup() {
    return {
      cartOutline,
      menuOutline,
      addCircle,
      heart
    };
  },
  computed: {
    popular() {
      return this.$store.getters.popular;
    },
    properties() {
        console.log(this.$store.getters.properties)
      return this.$store.getters.properties;
    },
  },
  methods: {
    toggleImageFn(toggle) {
      this.toggleImage = toggle;
    },
    displayableDate (date) {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(date))
    },
    async openModal(property) {
        console.log(property);
      this.$emit("toggleImageFn", true);
      const modalInstance = modalController;
      const modal = await modalInstance
        .create({
          component: Modal,
          cssClass: "custom-modal-class",
          componentProps: {
            context: this,
            modalInstance,
            modalData: property
          },
        })

      return modal.present();
    }
  }
};
</script>

<style lang="scss" scoped>
//ion-content {
  // width: fit-content;
  // height: 100%;
  // block-size: fit-content;
//}

ion-header {
  box-shadow: none;
}

ion-toolbar {
  box-shadow: none;
  --background: var(--brand-primary);
  --border-color: var(--brand-primary);
  color: #ffffff;
}

ion-title {
    img {
    filter: grayscale(60%);
  }
}

ion-card {
  --background: none;
  background-color: rgb(255, 236, 236);
  box-shadow: none;
  padding-top: 5px;


    display: block;
    width: 100%;
    object-fit: cover;
  border-radius: 20px 20px 20px 20px ;
}

.product-name {
  color: rgb(0, 0, 0);
  text-align: center;
}
ion-card-header {
  padding: 5px;
}
ion-button {
  --background: var(--brand-primary);
  border-radius: 11px;
  color:white;
  margin: 0px 10px 10px 10px;
  padding-left: 10px;

  &.close-btn {
    --background: #fff;
    color: #000;
    border: 1px solid var(--brand-primary);
  }
}
.property-image {
  border-radius: 10px;
  height: 300px;
margin: 0;
padding: 0;
display: block;
width: 100%;
object-fit: cover;
}
.ion-padding {
    margin-left: 2% !important;
    margin-right: 2% !important;
    width: 96% !important;
}

</style>

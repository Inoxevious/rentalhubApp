<template>
  <ion-content class="ion-padding">
    <ion-grid>
      <ion-row>
        <ion-col>
        <h3>Lease Rate</h3>
          <h1><span>$</span>{{modalData.leaseRate}}</h1>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <h2 class="item-name">{{modalData.city}}</h2>
          <p class="description">
            {{modalData.shortDescription}}
          </p>
        </ion-col>
      </ion-row>
      <Popular  :data="modalData" />
      <ion-row class="modalButtons">
              <ion-col>
        <h3>View Fee</h3>
          <h1><span>$</span>{{modalData.leaseRate}}</h1>
        </ion-col>
        <ion-button>Pay To View</ion-button>
      </ion-row>
    </ion-grid>
     <ion-col>        <ion-button class="close-btn" @click="closeForm()">
          Close
        </ion-button></ion-col>
  </ion-content>
</template>

<script>
import {
//   IonIcon,
  IonContent,
  IonButton,
//   IonButtons,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import Popular from "./../components/Popular";
import { heart, add, close, remove } from "ionicons/icons"

export default {
  name: 'ModalOne',
  props: {
      modalData : {
          type: Object
      },
    data: {
      type: Object
    },
    context: {
      type: Object
    },
    modalInstance: {
      type: Object
    }
  },
  components: {
    // IonIcon,
    IonContent,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    // IonButtons
    
    Popular,
  },
  data() {
    return {
      quantity: 1,
      selectedSize: 0,
      sizes: [5,6,7,8]
    }
  },
  setup() {
    return {
      heart,
      add,
      close,
      remove
    }
  },
  methods: {
    quantityFn(count) {
      this.quantity = this.quantity + count;
    },
    selectedSizeFn(index) {
      this.selectedSize = index;
    },
    closeForm() {
      this.modalInstance.dismiss();
      this.context.$emit("toggleImageFn", false);
      
    }
  }
}
</script>

<style scoped lang="scss">
ion-content {
  --background: #fff;
}

h1 {
  font-size: 50px;
  color: #000;
  margin: 0;
  padding: 0;
  span {
    font-size: 18px;
    margin-bottom: 20px;
  }
}

.item-name {
  border-top: 1px solid var(--brand-primary); 
  padding-top: 25px; 
  color: #000;
}

.size-label {
  margin-bottom: 20px;
}

.size-row {
  margin-left: -5px;
  padding: 0;
  
  span {
    background: #fff3b9;
    border: 1px solid #f9ebab; 
    border-radius: 5px; 
    padding: 6px 14px;
    margin: 3px;
    color: var(--brand-primary);
    &.selected {
      color: #000;
    }
  }
}

.description, .size-label {
  font-size: 13px;
}

ion-button {
  --background: var(--brand-primary);
  border-radius: 11px;

  &.close-btn {
    --background: #fff;
    color: #000;
    border: 1px solid var(--brand-primary);
  }
}

ion-col.quantity {
    text-align: right;
    width: 50%;
    margin: auto auto auto 100px;
    .q-count {
      background: #fff3b9;
      padding: 0px 15px;
      margin: -6px;
    }

    .quantity-icon {
      font-weight: 700;
    }

  ion-buttons {
    ion-button {
      font-weight: bold;
      --border-radius: 20px;
      --background: #fff;
      color: #000;
      border: 1px solid #ca0f4e;
      width: 29px;
      height: 27px;
    }
  }
  .modalButtons {
      margin-bottom: 100px;
  }
}
</style>

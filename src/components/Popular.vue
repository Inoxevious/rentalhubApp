<template>
  <div class="wrapper">
    <ion-grid>
      <ion-row>
        <ion-col>
          <span></span> Images
        </ion-col>
        <ion-col class="slide-count">
          1/16
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-slides>
      <ion-slide>
        <ion-card>
          <img :src="baseUrl + data.image"   />
        </ion-card>
      </ion-slide>
    </ion-slides>
  </div>
</template>

<script>
import { 
  IonSlides, 
  IonSlide,
  IonCard,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/vue";

export default {
  name: "people",
  components: { 
    IonSlides, 
    IonSlide, 
    IonCard,
    IonGrid,
    IonRow,
    IonCol
  },
  data() {
      return {
        baseUrl : "http://127.0.0.1:8000/media/"
      }
  },
  props: {
    data: {
      type: Array,
      required: true,
      default: () => [],
      
    }
  },
  methods: {
    viewAll() {
      this.$router.push("/catalogue");
    },
    displayableDate (date) {
      return new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(date))
    }
  },
};
</script>

<style lang="scss" scoped>
.wrapper {

  position: relative;
  top: 1vh;
}


ion-slide {
  background: #fff;
  border-radius: 10px;
  height: 85px;
  margin: 8px;
  width: 80px !important;
  padding: 0;
}

ion-card {
  --background: none;
  box-shadow: none;
  padding: 0;
  margin: 0;
}

img {
  border-radius: 10px;
  // height: 70px;
  width: 70px;
}

ion-card-title {
  font-size: 13px !important;
  text-align: left;
  color: #fff;
}

ion-col {
  color: rgb(0, 0, 0);
  span {
    font-weight: 700;
  }

  &.slide-count {
    text-align: right;
  }
}

ion-col.slide-count {
  float: right !important;
}

p {
  color: rgb(0, 0, 0);
  text-align: right;
  font-weight: 700;
  margin: 15px 0 0 0;
}
</style>

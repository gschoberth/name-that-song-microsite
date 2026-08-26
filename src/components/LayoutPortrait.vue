<template>
  <div class="card-container">
    <div class="wrapper">
      <div class="top-wrapper">
        <div class="ts-logo landscape">
          <img src="@/assets/trackstar-logo-landscape.png" />
        </div>
        <div class="ts-logo portrait">
          <img src="@/assets/trackstar-logo.png" />
        </div>
        <div class="chase-logo">
          <img :src="ChaseLogo" />
        </div>
      </div>
      <div class="landscape-middle">
        <div class="stats-wrapper stats-one">
          <div class="date">friday, july 31</div>
          <div class="display-name">Mark L.</div>
          <div class="score">9,650</div>
          <div class="placement">7th of 98 today</div>
        </div>
        <div class="stats-wrapper stats-two">
          <div class="statistics-title">statistics</div>
          <div class="statistics-flex">
            <div class="stat-hold">
              <div class="top">8/10</div>
              <div class="bottom">correct</div>
            </div>
            <div class="stat-hold">
              <div class="top">5</div>
              <div class="bottom">streak</div>
            </div>
            <div class="stat-hold">
              <!-- <div class="top">8/10</div>
            <div class="bottom">fastest</div> -->
            </div>
          </div>
          <div class="medal-holder">
            <div class="medal-icon">
              <img :src="TSMedal" />
            </div>
            <div class="medal-text">New Personal Best</div>
          </div>
        </div>
      </div>
      <div class="share-wrapper">
        <div class="share-text">Share your score and tag @trackstarshow</div>
        <div class="share-icon">
          <img :src="ShareIcon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js" setup>
import TSLogo from "@/assets/ts-logo-micro-portrait.svg";
import ChaseLogo from "@/assets/chase-logo-micro.svg";
import TSMedal from "@/assets/medal.svg";
import ShareIcon from "@/assets/share-icon.svg";
</script>

<style lang="scss" scoped>
@media (orientation: portrait) {
  .card-container {
    background-image: url("@/assets/ts-micro-bg.png");
    background-size: 82cqmin auto;
    background-color: #0c0c0c;
    background-position-x: 100%;
  }

  .ts-logo.landscape {
    display: none;
  }

  .stats-wrapper {
    border-bottom: 1px solid #808285;

    .date {
      margin-top: 10cqmin;
    }

    .statistics-title {
      margin-top: 3cqmin;
    }
  }

  .share-text {
    max-width: 26ch;
    text-wrap-mode: wrap;
  }
}

@media (orientation: landscape) {
  .card-container {
    background-image: url("@/assets/ts-micro-bg.png");
    background-size: 100dvh auto;
    background-color: #0c0c0c;
    background-position-x: 100%;
  }
  .ts-logo.landscape {
    width: 37cqw;
  }

  .ts-logo.portrait {
    display: none;
  }

  .card-container {
    width: min(100%, calc(100dvh * 0.5625));
    margin-inline: auto;
    container-type: inline-size;
  }

  .landscape-middle {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 4cqmin;
    margin-top: 2cqmin;
  }

  .stats-wrapper {
    border: none;
    padding: 0 4cqmin;
    &:first-of-type {
      border-right: 1px solid #808285;
    }
  }

  .statistics-title {
    margin-top: 0;
  }
}
/* wider than tall */

.card-container {
  min-height: 100%;
  min-width: 100%;
  container-type: inline-size;
  position: relative;
}

.wrapper {
  width: 100cqw;
  height: 100%;
  padding: 4cqmin 10cqmin 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.top-wrapper {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
}

.ts-logo {
  margin-bottom: 2cqmin;
}

.chase-logo,
.ts-logo {
  width: 40cqmin;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: auto;
  }
}

.chase-logo {
  margin-right: 10cqmin;
}

.stats-wrapper {
  margin-right: auto;
  padding-bottom: 3cqmin;

  width: 100%;

  .date {
    font-weight: 900;
    text-transform: uppercase;
    font-size: 3cqmin;
    line-height: 100%;
    color: #ff5b00;
  }

  .display-name {
    font-weight: 900;
    margin-top: 3cqmin;
    font-size: 13cqmin;
    line-height: 10cqmin;
  }

  .score {
    margin-top: 1cqmin;
    font-size: 14cqmin;
    line-height: 13cqmin;
    font-weight: 900;
    color: #ff5b00;

    &::after {
      content: "pts";
      margin-left: 1cqmin;
      font-size: 8cqmin;
      line-height: 100%;
    }
  }
  .placement {
    font-weight: 900;
    font-size: 5cqmin;
    margin-top: 2cqmin;
    line-height: 100%;
  }

  .statistics-title {
    font-weight: bold;
    text-transform: uppercase;
    font-size: 3cqmin;
    color: #6d6e71;

    line-height: 100%;
  }

  .statistics-flex {
    margin-top: 1cqmin;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 13cqmin;
    text-align: center;
    .top {
      font-weight: 900;
      font-size: 8cqmin;
    }
    .bottom {
      font-weight: bold;
      font-size: 3cqmin;
      color: #6d6e71;
      text-transform: uppercase;
      font-weight: bold;
    }
  }

  .medal-holder {
    margin-top: 3cqmin;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 3cqmin;

    .medal-icon {
      width: 8cqmin;
      aspect-ratio: 1;
    }

    .medal-text {
      font-weight: 900;
      font-size: 4cqmin;
      font-weight: bold;
    }
  }
}

.share-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3cqmin;
  .share-text {
    font-size: 5cqmin;
    font-weight: 300;
    text-align: center;
  }

  .share-icon {
    margin-top: 3cqmin;
    width: 12cqmin;
    aspect-ratio: 1;

    img {
      width: 100%;
    }
  }
}
</style>

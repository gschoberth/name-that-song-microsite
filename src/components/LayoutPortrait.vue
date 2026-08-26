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
          <div class="date">{{ shareDetails.date }}</div>
          <div class="display-name">{{ shareDetails.name }}</div>
          <div class="score">{{ shareDetails.score }}</div>
          <div class="placement">{{ shareDetails.placement }}</div>
        </div>

        <div class="stats-wrapper stats-two">
          <div class="statistics-title">statistics</div>

          <div class="statistics-flex">
            <div class="stat-hold">
              <div class="top">{{ shareDetails.correct }}</div>
              <div class="bottom">correct</div>
            </div>

            <div class="stat-hold">
              <div class="top">{{ shareDetails.streak }}</div>
              <div class="bottom">streak</div>
            </div>

            <div class="stat-hold">
              <!-- <div class="top">8/10</div>
            <div class="bottom">fastest</div> -->
            </div>
          </div>

          <div v-if="isPersonalBest" class="medal-holder">
            <div class="medal-icon">
              <img :src="TSMedal" />
            </div>

            <div class="medal-text">New Personal Best</div>
          </div>
        </div>
      </div>

      <button
        aria-label="Share your score"
        class="share-wrapper"
        :disabled="isSharing"
        type="button"
        @click="shareScore"
      >
        <div class="share-text">Share your score and tag @trackstarshow</div>

        <div class="share-icon">
          <img :src="ShareIcon" />
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ChaseLogo from "@/assets/chase-logo-micro.svg";
import TSMedal from "@/assets/medal.svg";
import ShareIcon from "@/assets/share-icon.svg";
import TrackstarLogo from "@/assets/trackstar-logo.png";
import ShareBackground from "@/assets/ts-micro-bg.png";

const isSharing = ref(false);
const searchParams = new URLSearchParams(window.location.search);

const playerName = getUrlValue("name", "");
const score = formatNumber(getUrlValue("score", ""));
const date = getUrlValue("date", "");
const totalQuestionsRight = getUrlValue(
  ["totalQuestionsRight", "total_questions_right", "right", "correct"],
  "",
);
const totalQuestions = getUrlValue(
  ["totalQuestions", "total_questions", "questions"],
  "10",
);
const streak = getUrlValue("streak", "5");
const rank = getUrlValue("rank", "7");
const rankOutOf = getUrlValue(
  ["rankOutOf", "rank_out_of", "outOf", "out_of"],
  "",
);
const isPersonalBest = getUrlFlag("best");

const shareDetails = {
  date,
  name: playerName,
  score,
  placement: `${formatOrdinal(rank)} of ${rankOutOf} today`,
  correct: `${totalQuestionsRight}/${totalQuestions}`,
  streak,
  title: "Trackstar score",
  text: `I scored ${score} on Trackstar. @trackstarshow.`,
  fileName: "trackstar-score.png",
};

function getUrlValue(keys: string | string[], fallback: string) {
  const keyList = Array.isArray(keys) ? keys : [keys];

  for (const key of keyList) {
    const value = searchParams.get(key);
    if (value) return value;
  }

  return fallback;
}

function getUrlFlag(key: string) {
  return searchParams.get(key)?.toLowerCase() === "true";
}

function formatNumber(value: string) {
  const number = Number(value.replaceAll(",", ""));
  return Number.isFinite(number)
    ? new Intl.NumberFormat("en-US").format(number)
    : value;
}

function formatOrdinal(value: string) {
  const number = Number(value);
  if (!Number.isInteger(number)) return value;

  const suffixRules = new Intl.PluralRules("en-US", { type: "ordinal" });
  const suffixes: Record<Intl.LDMLPluralRule, string> = {
    few: "rd",
    many: "th",
    one: "st",
    other: "th",
    two: "nd",
    zero: "th",
  };

  return `${number}${suffixes[suffixRules.select(number)]}`;
}

async function shareScore() {
  if (isSharing.value) return;

  isSharing.value = true;

  try {
    const blob = await createShareImage();
    const file = new File([blob], shareDetails.fileName, { type: "image/png" });

    if (navigator.canShare?.({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: shareDetails.title,
        text: shareDetails.text,
      });
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title: shareDetails.title,
        text: shareDetails.text,
        url: window.location.href,
      });
      return;
    }

    downloadBlob(blob, shareDetails.fileName);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    console.error("Unable to share score", error);
  } finally {
    isSharing.value = false;
  }
}

async function createShareImage() {
  await document.fonts.ready;

  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1920;

  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is not supported.");

  const [background, trackstarLogo, chaseLogo, medal] = await Promise.all([
    loadImage(ShareBackground),
    loadImage(TrackstarLogo),
    loadImage(ChaseLogo),
    loadImage(TSMedal),
  ]);

  context.fillStyle = "#0c0c0c";
  context.fillRect(0, 0, canvas.width, canvas.height);
  drawImageContain(context, background, 372, 0, 708, 1920);

  drawImageContain(context, trackstarLogo, 300, 104, 480, 278);
  drawImageContain(context, chaseLogo, 308, 406, 364, 132);

  context.textBaseline = "top";
  context.fillStyle = "#ff5b00";
  context.font = '900 44px "Paralucent Text", Arial, sans-serif';
  context.fillText(shareDetails.date.toUpperCase(), 108, 720);

  context.fillStyle = "#ffffff";
  context.font = '900 142px "Paralucent Text", Arial, sans-serif';
  context.fillText(shareDetails.name, 108, 805);

  context.fillStyle = "#ff5b00";
  context.font = '900 168px "Paralucent Text", Arial, sans-serif';
  context.fillText(shareDetails.score, 108, 952);
  context.font = '900 88px "Paralucent Text", Arial, sans-serif';
  context.fillText("pts", 682, 1024);

  context.fillStyle = "#ffffff";
  context.font = '900 64px "Paralucent Text", Arial, sans-serif';
  context.fillText(shareDetails.placement, 108, 1160);

  context.strokeStyle = "#808285";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(108, 1268);
  context.lineTo(972, 1268);
  context.stroke();

  context.fillStyle = "#6d6e71";
  context.font = '700 44px "Paralucent Text", Arial, sans-serif';
  context.fillText("STATISTICS", 108, 1336);

  context.textAlign = "center";
  drawStat(context, shareDetails.correct, "CORRECT", 220, 1414);
  drawStat(context, shareDetails.streak, "STREAK", 508, 1414);

  if (isPersonalBest) {
    context.textAlign = "left";
    drawImageContain(context, medal, 108, 1616, 92, 92);
    context.fillStyle = "#ffffff";
    context.font = '900 52px "Paralucent Text", Arial, sans-serif';
    context.fillText("New Personal Best", 232, 1636);
  }

  context.textAlign = "center";
  context.fillStyle = "#ffffff";
  context.font = '300 44px "Paralucent Text", Arial, sans-serif';
  context.fillText("Share your score and tag @trackstarshow", 540, 1790);

  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/png", 0.95);
  });

  if (!blob) throw new Error("Unable to create share image.");
  return blob;
}

function drawStat(
  context: CanvasRenderingContext2D,
  value: string,
  label: string,
  x: number,
  y: number,
) {
  context.fillStyle = "#ffffff";
  context.font = '900 86px "Paralucent Text", Arial, sans-serif';
  context.fillText(value, x, y);
  context.fillStyle = "#6d6e71";
  context.font = '700 36px "Paralucent Text", Arial, sans-serif';
  context.fillText(label, x, y + 100);
}

function drawImageContain(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(
    width / image.naturalWidth,
    height / image.naturalHeight,
  );
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;

  context.drawImage(
    image,
    x + (width - drawWidth) / 2,
    y + (height - drawHeight) / 2,
    drawWidth,
    drawHeight,
  );
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", () =>
      reject(new Error(`Unable to load ${src}`)),
    );
    image.src = src;
  });
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}
</script>

<style lang="scss" scoped>
@media (orientation: portrait) {
  .card-container {
    // background-image: url("@/assets/ts-micro-bg.png");
    background-image: url("@/assets/ts_bg-portrait.jpg");
    background-size: 70cqmin auto;
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
    background-image: url("@/assets/ts_bg-landscape.jpg");
    background-size: contain;
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
  color: #fff;
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
  appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3cqmin;
  cursor: pointer;

  &:disabled {
    cursor: progress;
    opacity: 0.7;
  }

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

.display-name,
.placement,
.statistics-flex .top,
.medal-text,
.share-text {
  color: #fff;
}
</style>

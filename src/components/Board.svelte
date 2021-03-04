<script lang="ts">
  import Square from "./Square.svelte";
  import { Minesweeper } from "../Minesweeper";
  import MineCounter from "./MineCounter.svelte";
  import Timer from "./Timer.svelte";

  let width: number = 30;
  let height: number = 16;
  let mines: number = 99;
  let num_flagged: number = 0;

  let face_class = "facesmile";
  function handleFaceMouseDown(e: MouseEvent) {
    if (e.button === 0) {
      face_class = "facepressed";
    }
  }
  function handleFaceMouseUp(e: MouseEvent) {
    if (e.button === 0 && face_class === "facepressed") {
      reset();
      face_class = "facesmile";
    }
  }

  function reset() {
      board.reset(width, height, mines);
      resetSquares();
      reset_timer();
  }

  const border_width: number = 10;
  const border_height: number = 10;
  const header_height: number = 32;
  const face_width: number = 26;
  const SSD_width: number = 39;
  $: header_width = width * 16;
  $: board_width = header_width + 2 * border_width;
  $: board_height = height * 16 + 3 * border_height + header_height;
  $: face_margin = (header_width - face_width) / 2 - SSD_width;

  let board = new Minesweeper(width, height, mines);
  let square_updates = [];
  let square_loses = [];
  let square_resets = [];
  let reset_timer;
  function updateSquares() {
    square_updates.forEach((s) => s());
  }
  function lose() {
    face_class = "facedead";
    square_loses.forEach((s) => s());
  }
  function resetSquares() {
    square_resets.forEach((s) => s());
  }
  function onWin() {
    face_class = "facewin";
  }
</script>

<div class="board" style="width: {board_width}px; height:{board_height}px;">
  <div class="bordertl" />
  {#each Array(width) as _}
    <div class="bordertb" />
  {/each}
  <div class="bordertr" />
  <div class="borderlrlong" />
  <MineCounter context={board} bind:num_flagged={num_flagged}/>
  <div
    class={face_class}
    style="margin-left: {face_margin}px; margin-right: {face_margin}px;"
    id="face"
    on:mousedown={handleFaceMouseDown}
    on:mouseup={handleFaceMouseUp}
  />
  <Timer context={board} bind:reset={reset_timer}/>
  <div class="borderlrlong" />
  <div class="borderjointl" />
  {#each Array(width) as _}
    <div class="bordertb" />
  {/each}
  <div class="borderjointr" />
  {#each Array(height) as _, y}
    <div class="borderlr" />
    {#each Array(width) as _, x}
      <Square
        context={board}
        bind:num_flagged={num_flagged}
        bind:update={square_updates[y * width + x]}
        bind:lose={square_loses[y * width + x]}
        bind:reset={square_resets[y*width + x]}
        {x}
        {y}
        on:update={updateSquares}
        on:lose={lose}
        on:won={onWin}
      />
    {/each}
    <div class="borderlr" />
  {/each}
  <div class="borderbl" />
  {#each Array(width) as _}
    <div class="bordertb" />
  {/each}
  <div class="borderbr" />
</div>

<style>
  .board {
    margin: auto;
    background-color: silver;
  }
  .board div {
    float: left;
    line-height: 0;
    font-size: 0;
    background-image: url(../sprite100.gif);
  }
  .blank {
    background-position: 0 -39px;
    width: 16px;
    height: 16px;
  }
  .open {
    background-position: 0 -23px;
    width: 16px;
    height: 16px;
  }
  .bordertl {
    background-position: 0 -81px;
    width: 10px;
    height: 10px;
  }
  .bordertr {
    background-position: -10px -81px;
    width: 10px;
    height: 10px;
  }
  .borderjointl {
    background-position: -56px -81px;
    width: 10px;
    height: 10px;
  }
  .borderjointr {
    background-position: -66px -81px;
    width: 10px;
    height: 10px;
  }
  .borderlr {
    background-position: -134px -39px;
    width: 10px;
    height: 16px;
  }
  .borderlrlong {
    background-position: -134px -39px;
    width: 10px;
    height: 32px;
  }
  .borderbl {
    background-position: -20px -81px;
    width: 10px;
    height: 10px;
  }
  .borderbr {
    background-position: -30px -81px;
    width: 10px;
    height: 10px;
  }
  .bordertb {
    background-position: -40px -81px;
    width: 16px;
    height: 10px;
  }
  #face {
    margin-top: 3px;
    margin-bottom: 3px;
  }
  .facesmile {
    background-position: 0 -55px;
    width: 26px;
    height: 26px;
  }
  .facepressed {
    background-position: -26px -55px;
    width: 26px;
    height: 26px;
  }

  .faceooh {
    background-position: -52px -55px;
    width: 26px;
    height: 26px;
  }
  .facedead {
    background-position: -78px -55px;
    width: 26px;
    height: 26px;
  }

  .facewin {
    background-position: -104px -55px;
    width: 26px;
    height: 26px;
  }
</style>

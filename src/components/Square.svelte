<script lang="ts">
  import type { Minesweeper } from "../Minesweeper";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const _class_map = new Map([
    [-2, "blank"],
    [-1, "bombrevealed"],
    [0, "open"],
    [1, "open1"],
    [2, "open2"],
    [3, "open3"],
    [4, "open4"],
    [5, "open5"],
    [6, "open6"],
    [7, "open7"],
    [8, "open8"],
  ]);
  export let x: number;
  export let y: number;
  export let context: Minesweeper;
  let value: number = -2;
  $: _class = _class_map.get(value);

  export function update() {
    if (context.revealed[x][y]) {
      value = context.board[x][y];
    }
  }
  function set_class(s: number) {
    if (!context.revealed[x][y]) {
      value = s;
    }
  }
  function handleMouseDown(e: MouseEvent) {
    if (e.button === 0) {
      set_class(0);
    }
  }
  function handleMouseUp(e: MouseEvent) {
    if (!context.revealed[x][y] && e.button === 0) {
      context.reveal(x, y);
      dispatch('update');
    }
  }
  function handleMouseEnter(e: MouseEvent) {
    if (e.button === 0) {
      set_class(0);
    }
  }
  function handleMouseLeave(e: MouseEvent) {
    // console.log("leave", e);
    if (e.button === 0) {
      set_class(-2);
    }
  }
</script>

<div
  class="square {_class}"
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
/>

<style>
  div {
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
  .open1 {
    background-position: -16px -23px;
    width: 16px;
    height: 16px;
  }

  .open2 {
    background-position: -32px -23px;
    width: 16px;
    height: 16px;
  }

  .open3 {
    background-position: -48px -23px;
    width: 16px;
    height: 16px;
  }

  .open4 {
    background-position: -64px -23px;
    width: 16px;
    height: 16px;
  }

  .open5 {
    background-position: -80px -23px;
    width: 16px;
    height: 16px;
  }

  .open6 {
    background-position: -96px -23px;
    width: 16px;
    height: 16px;
  }

  .open7 {
    background-position: -112px -23px;
    width: 16px;
    height: 16px;
  }

  .open8 {
    background-position: -128px -23px;
    width: 16px;
    height: 16px;
  }
  .bombrevealed {
    background-position: -64px -39px;
    width: 16px;
    height: 16px;
  }
</style>

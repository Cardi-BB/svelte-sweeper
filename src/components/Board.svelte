<script lang="ts">
  import Square from "./Square.svelte";
  import { Minesweeper } from "../Minesweeper";

  let width: number = 6;
  let height: number = 6;
  let mines: number = 10;

  const border_width: number = 10;
  const border_height: number = 10;
  const header_height: number = 32;
  $: header_width = width * 16;
  $: board_width = header_width + 2 * border_width;
  $: board_height = height * 16 + 3 * border_height + header_height;

  let board = new Minesweeper(width, height, mines);
  let squares = [];

  function updateSquares() {
    squares.forEach( (s) => s() );
  }
</script>

<div class="board" style="width: {board_width}px; height:{board_height}px;">
  <div class="bordertl" />
  {#each Array(width) as _}
    <div class="bordertb" />
  {/each}
  <div class="bordertr" />
  <div class="borderlrlong" />
  <div
    class="facesmile"
    style="width: {header_width}px; height: {header_height}px; background-image: url();"
  />
  <div class="borderlrlong" />
  <div class="borderjointl" />
  {#each Array(width) as _}
    <div class="bordertb" />
  {/each}
  <div class="borderjointr" />
  {#each Array(height) as _, y}
    <div class="borderlr" />
    {#each Array(width) as _, x}
      <Square context={board} bind:update={squares[y*width+x]} {x} {y} on:update={updateSquares}/>
    {/each}
    <div class="borderlr" />
  {/each}
  <div class="borderbl" />
  {#each Array(width) as _}
    <div class="bordertb" />
  {/each}
  <div class="borderbr" />
</div>

<!-- {#each Array(width) as _,x}
    {#each Array(height) as _,y}
        <Square id="{x}_{y}"/>
    {/each}
{/each} -->
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
</style>

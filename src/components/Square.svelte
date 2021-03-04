<script lang="ts">
  import type { Minesweeper } from "../Minesweeper";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  export let x: number;
  export let y: number;
  export let context: Minesweeper;
  export let flagged: boolean = false;
  export let num_flagged: number;
  let _class: string = "blank";

  export function reset() {
    flagged = false;
    _class = "blank";
  }
  export function update() {
    if (context.revealed[x][y]) {
      if (context.board[x][y] === -1) {
        _class = "bombdeath";
        dispatch("lose");
      } else {
        _class = "open" + context.board[x][y];
      }
    }
  }
  export function lose() {
    if(flagged && context.board[x][y] !== -1) {
      _class = "bombmisflagged";
    } else if( context.board[x][y] === -1) {
      _class = "bombrevealed";
    }

  }
  function set_class(s: string) {
    if (!context.revealed[x][y] && !flagged) {
      _class = s;
    }
  }
  function handleMouseDown(e: MouseEvent) {
    if (context.lost || context.won) return true;
    if (e.button === 0) {
      set_class("open0");
    } else if (e.button === 2) {
      if(flagged) { //already flagged
        flagged = false;
        num_flagged--;
        set_class("blank");
      } else {
        set_class("bombflagged");
        flagged = true;
        num_flagged++;
      }
    }
  }
  function handleMouseUp(e: MouseEvent) {
    if (context.lost || context.won ) return true;
    if (!context.revealed[x][y] && e.button === 0) {
      context.reveal(x, y);
      dispatch("update");
      if( context.won ) {
        dispatch("won");
      }
    }
  }
  function handleMouseEnter(e: MouseEvent) {
    if (context.lost || context.won) return true;
    if (e.button === 0) {
      set_class("open0");
    }
  }
  function handleMouseLeave(e: MouseEvent) {
    if (context.lost || context.won) return true;
    // console.log("leave", e);
    if (e.button === 0) {
      set_class("blank");
    }
  }
  //Prevent context menu appearing on right click
  function handleContextMenu(e: MouseEvent) {
    e.preventDefault();
    return false;
  }
</script>

<div
  class="square {_class}"
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:contextmenu={handleContextMenu}
/>

<style>
  div {
    float: left;
    line-height: 0;
    font-size: 0;
    background-image: url(../sprite100.gif);
    width: 16px;
    height: 16px;
  }
  .blank {
    background-position: 0 -39px;
  }
  .open0 {
    background-position: 0 -23px;
  }
  .open1 {
    background-position: -16px -23px;
  }

  .open2 {
    background-position: -32px -23px;
  }

  .open3 {
    background-position: -48px -23px;
  }

  .open4 {
    background-position: -64px -23px;
  }

  .open5 {
    background-position: -80px -23px;
  }

  .open6 {
    background-position: -96px -23px;
  }

  .open7 {
    background-position: -112px -23px;
  }

  .open8 {
    background-position: -128px -23px;
  }
  .bombrevealed {
    background-position: -64px -39px;
  }
  .bombflagged {
    background-position: -16px -39px;
  }
  .bombmisflagged {
    background-position: -48px -39px;
  }
  .bombdeath {
    background-position: -32px -39px;
  }
</style>

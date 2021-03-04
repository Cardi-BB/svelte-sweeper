<script lang="ts">
  import SSD from "./SSD.svelte";
  import type { Minesweeper } from "../Minesweeper";

  let start = new Date().getTime();

  export function reset() {
      start = new Date().getTime();
  }
  export let context: Minesweeper;

  let now = 0;
  setInterval( function() {
      if (!context.won && !context.lost)
        now = (new Date().getTime() - start) / 1000;
  }, 1000);

</script>

<SSD value={now}/>

<style>
</style>

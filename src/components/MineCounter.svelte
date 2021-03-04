<script lang="ts">
    import type { Minesweeper } from "../Minesweeper";
    import SSD from "./SSD.svelte";

    export let context: Minesweeper;
    export let num_flagged: number = 0;

    $: mines_remaining = context.num_mines - num_flagged;

</script>

<SSD value={mines_remaining}></SSD>

<style>

</style>
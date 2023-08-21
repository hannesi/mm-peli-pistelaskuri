<script>
  import PlayerScoreSheet from "./PlayerScoreSheet.svelte";
  import SportsHeaders from "./SportsHeaders.svelte";

  export let players;
  console.log(players);
</script>

<div class="container">
  <h2>Mittaukset</h2>
  <div class="grid">
    <!-- empty div to fill a cell -->
    <div />
    <SportsHeaders />
    <div class="text-flex"><h3>Mitalipisteet</h3></div>
    <div class="text-flex"><h2>YHTEENSÄ</h2></div>
    <div />
    {#each players as player}
      <PlayerScoreSheet {player} />
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .grid {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(9, 1fr);
    gap: 1rem;
    column-gap: 4rem;
  }
  .text-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

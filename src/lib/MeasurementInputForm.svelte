<script>
  import PlayerMeasurementsForm from "./PlayerMeasurementsForm.svelte";
  import SportsHeaders from "./SportsHeaders.svelte";

  export let players;
  export let scorePerformance;
</script>

<div class="container">
  <h2>Mittaukset</h2>
  <div class="grid">
    <!-- empty div to fill a cell -->
    <div />
    <SportsHeaders />
    {#each players as player}
      <PlayerMeasurementsForm {player} />
    {/each}
  </div>
  <button class="ready" on:click={scorePerformance}>Valmis</button>
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
    grid-template-rows: repeat(6, 1fr);
    gap: 1rem;
  }
  .ready {
    width: 25%;
    padding: 1rem;
    font-size: 1.5rem;
    margin-top: 1rem;
  }
</style>

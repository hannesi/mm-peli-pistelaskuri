<script>
  import MeasurementInputForm from "./lib/MeasurementInputForm.svelte";
  import PlayerCreationForm from "./lib/PlayerCreationForm.svelte";
  import ScoreSheet from "./lib/ScoreSheet.svelte";
  import {
    calculateTotalPoints,
    getEmptyPlayerData,
    resolveFinalPlacements,
    resolveMedals,
    resolvePlacements,
  } from "./lib/utils";

  function setPlayerNames(names) {
    names.forEach((name) => {
      players = [...players, getEmptyPlayerData(name)];
    });
  }

  function scorePerformance() {
    measurementsReady = true;
    players = players.map((p, i) => ({ ...p, index: i }));
    players = resolvePlacements(players);
    players = resolveMedals(players);
    players = calculateTotalPoints(players);
    players = resolveFinalPlacements(players);
    players = players.sort((a, b) => a.index - b.index);
    pointCalculationReady = true;
  }

  let measurementsReady = false;
  let pointCalculationReady = false;

  // let players = [
  //   getEmptyPlayerData("Kati"),
  //   getEmptyPlayerData("Kylli"),
  //   getEmptyPlayerData("Karri"),
  // ];
  let players = [];
</script>

<main>
  <h1>MM-Peli 1983</h1>
  {#if players.length === 0}
    <PlayerCreationForm {setPlayerNames} />
  {:else if !measurementsReady}
    <MeasurementInputForm {players} {scorePerformance} />
  {:else if !pointCalculationReady}
    <p>Lasketaan pisteitä...</p>
  {:else}
    <ScoreSheet {players} />
  {/if}
</main>

<style>
</style>

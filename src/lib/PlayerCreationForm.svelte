<script>
  export let setPlayerNames;
  let currentName = "";
  let names = [];
  function addCurrent() {
    if (names.every((name) => name !== currentName.trim())) {
      names = [...names, currentName];
      currentName = "";
    }
  }
</script>

<div class="container">
  <h2>Pelaajat</h2>
  <input type="text" placeholder="Pelaajan nimi" bind:value={currentName} />
  <button on:click={addCurrent}>Lisaa pelaaja</button>
  <ol type="1">
    {#each names as name}
      <li>{name}</li>
    {/each}
  </ol>
  <button disabled={names.length === 0} on:click={setPlayerNames(names)}
    >Pelaa</button
  >
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

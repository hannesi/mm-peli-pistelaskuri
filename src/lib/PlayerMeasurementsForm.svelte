<script>
  export let player;
</script>

<h3>{player.name}</h3>
<input
  bind:value={player.sports.longJump.measurement}
  type="number"
  step=".01"
  min="0"
  placeholder="Pituus metreissä (7.62)"
/>
<input
  bind:value={player.sports.hurdles.measurement}
  type="number"
  step=".01"
  min="0"
  placeholder="Aika sekunneissa (12.71)"
/>
<input
  bind:value={player.sports.javelin.measurement}
  type="number"
  step=".01"
  min="0"
  placeholder="Pituus metreissä (86.21)"
/>
<input
  bind:value={player.sports.poleVault.measurement}
  type="number"
  step=".01"
  min="0"
  placeholder="Korkeus metreissä (6.12)"
/>
<input
  bind:value={player.sports.run.measurement}
  type="number"
  step=".1"
  placeholder="Aika sekunneissa (220.1)"
/>

<style>
  h3 {
    text-align: center;
  }
  input {
  }
</style>

<script>
  export let player;

  let scoreClass = "";
  let medalClass = "";

  async function setScoreClass() {
    await new Promise((r) => setTimeout(r, 5000));
    scoreClass = "score";
    await new Promise((r) => setTimeout(r, 4000 - player.placement * 750));
    medalClass = "score";
  }

  setScoreClass();
</script>

<div class="name">{player.name}</div>
<div class="result"><span>{player.sports.longJump.points}</span></div>
<div class="result"><span>{player.sports.hurdles.points}</span></div>
<div class="result"><span>{player.sports.javelin.points}</span></div>
<div class="result"><span>{player.sports.poleVault.points}</span></div>
<div class="result"><span>{player.sports.run.points}</span></div>
<div class="result"><span>{player.medalPoints}</span></div>
<div class={`result hidden ${scoreClass}`}>
  <span>{player.totalPoints}</span>
</div>
{#if player.placement === 1}
  <div class={`result medal hidden ${medalClass}`}><span>🥇</span></div>
{:else if player.placement === 2}
  <div class={`result medal hidden ${medalClass}`}><span>🥈</span></div>
{:else if player.placement === 3}
  <div class={`result medal hidden ${medalClass}`}><span>🥉</span></div>
{:else}
  <div />
{/if}

<style>
  .result {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 2rem;
    text-align: right;
  }
  .name {
    text-align: center;
    font-size: 2.5rem;
  }
  .score {
    animation: fade-in linear 1.5s forwards;
  }
  .hidden {
    opacity: 0;
  }
  .medal {
    text-align: center;
  }
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

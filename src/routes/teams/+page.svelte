<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Rotation App</h1>
{#if data.teams.length > 0}
	<ul>
		{#each data.teams as { name, id }}
			<li class="team">
				<form method="post">
					<input type="hidden" name="id" value={id} />
					<button formaction="?/delete" class="small danger">-</button>
				</form>
				<div>{name}</div>
			</li>
		{/each}
	</ul>
{:else}
	<p>There are no teams</p>
{/if}
<form method="post" action="?/create">
	<label>
		Team name
		<input type="text" name="name" required />
	</label>
	<button>Create team</button>
</form>

<style lang="scss">
	.team {
		display: grid;
		grid-template-columns: min-content max-content;
		gap: 1rem;
		align-items: center; /* aligns the items vertically */

		form {
			background-color: transparent;
			margin: 0;
			padding: 0;
		}
	}
	ul {
		list-style: unset;
	}
</style>

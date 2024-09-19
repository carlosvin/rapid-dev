<script lang="ts">
	import NavLink from '$lib/components/NavLink.svelte';
</script>

<header>
	<menu>
		<NavLink path="/">home</NavLink>
		<NavLink path="/teams">teams</NavLink>
		<NavLink path="/about">about</NavLink>
	</menu>
</header>

<main>
	<slot />
</main>

<footer>
	<p>© 2021 Rotation App</p>
</footer>

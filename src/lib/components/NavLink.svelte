<script lang="ts">
	import { page } from '$app/stores';
	export let path: string;

	function getClass(currentPath: string) {
		return path === currentPath ? 'selected' : undefined;
	}
</script>

<li class={getClass($page.url.pathname)}>
	<a href={path}>
		<slot />
	</a>
</li>

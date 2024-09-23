<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.name} Details</h1>
<form method="post" action="?/save">
	<input name="name" value={data.name} required placeholder="Team name" />
	<textarea name="description" placeholder="Write something descriptive about this team"
		>{data.description}</textarea
	>
	<input type="hidden" name="id" value={data.id} />
	<button type="submit">Save</button>
	<button formaction="?/delete" class="danger">Delete</button>
</form>

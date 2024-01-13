<script>
	import { page } from '$app/stores';
	import { signOut } from '@auth/sveltekit/client';

	$: isAdmin = $page.data.session?.user?.usrRole > 4;
</script>

{#if isAdmin}
	<h1>You are an admin</h1>
	<button on:click={() => signOut()} class="button">Sign out</button>
{:else}
	<h1>You have limited access</h1>
{/if}

<a href="/">Home</a>

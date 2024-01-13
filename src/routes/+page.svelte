<script>
	import { signIn, signOut } from '@auth/sveltekit/client';
	import { page } from '$app/stores';

	$: console.log('routes/+page.svelte', $page.data.session);
	// $: console.log($page.data?.session?.user?.image);
</script>

<h1>SvelteKit Auth Example</h1>
<p>
	{#if $page.data.session}
		{#if $page.data.session.user?.image}
			<img src={$page.data.session.user.image} alt="" />
		{:else}
			<img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
		{/if}
		<span class="signedInText">
			<small>Signed in as</small><br />
			<strong>{$page.data.session.user?.name ?? 'User'}</strong>
			{$page.data.session.user?.email}
		</span>
		<button on:click={() => signOut()} class="button">Sign out</button>
	{:else}
		<span class="notSignedInText">You are not signed in</span>
		<button on:click={() => signIn('google')}>Sign In with google</button>
		<button on:click={() => signIn('twitter')}>Sign In with twitter</button>
	{/if}
</p>

<h2>Authenticated Pages</h2>
<div><a href="/admin">admin</a></div>
<div><a href="/profile">profile</a></div>

<style>
	div {
		margin-bottom: 14px;
	}
</style>

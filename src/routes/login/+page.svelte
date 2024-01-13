<script>
	import { page } from '$app/stores';
	import { signIn, signOut } from '@auth/sveltekit/client';

	let email = '';

	const handleEmailSignIn = () => {
		signIn('email', { email, callbackUrl: '/' });
	};

	const handleGoogleSignIn = () => {
		signIn('google', { callbackUrl: '/' });
	};

	const handleSignOut = () => {
		signOut();
	};
</script>

<div class="container">
	{#if !$page.data.session}
		<form on:submit={handleEmailSignIn}>
			<input label="Email" type="email" bind:value={email} />
			<button>Continue</button>
		</form>

		<button on:click={handleGoogleSignIn}> Continue with Google </button>
	{/if}

	{#if $page.data.session}
		<div>
			<button on:click={handleSignOut}>Sign out</button>
		</div>
	{/if}
</div>

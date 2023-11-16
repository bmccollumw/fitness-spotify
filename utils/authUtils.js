//function to be used in authorization process
const generateRandomString = (length) => {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const values = crypto.getRandomValues(new Uint8Array(length));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

//function to be used in authorization process
  const sha256 = async (plain) => {
    const encoder = new TextEncoder()
    const data = encoder.encode(plain)
    return window.crypto.subtle.digest('SHA-256', data)
  }

//function to be used in authorization process
const base64encode = (input) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }


// Function to start the Spotify authorization process
export const startAuthorization = async () => {
    // Generate code verifier and code challenge
    const codeVerifier = generateRandomString(64);
    const codeChallenge = await generateCodeChallenge(codeVerifier);
  
    // Store code verifier
    localStorage.setItem('code_verifier', codeVerifier);
  
    // Construct the authorization URL
    const authUrl = constructAuthUrl(codeChallenge);
  
    // Redirect the user to Spotify's login page
    window.location.href = authUrl;
  };
  
  // Helper function to generate code challenge
  const generateCodeChallenge = async (codeVerifier) => {
    // Hash the codeVerifier using SHA-256
  const hashed = await sha256(codeVerifier);

  // Base64 encode the hashed value
  const codeChallenge = base64encode(hashed);

  return codeChallenge;
  };
  
  // Helper function to construct the authorization URL
  const constructAuthUrl = (codeChallenge) => {
    const clientId = 'ecbacf42d252450592c70140051f5b59'; 
    const redirectUri = 'http://localhost:3000'; // Your app's redirect URI
    const scope = 'user-read-private user-read-email'; // The desired scopes
  
    // Create a new URL object for the Spotify authorization endpoint
    const authUrl = new URL('https://accounts.spotify.com/authorize');
  
    // Set the query parameters
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('code_challenge_method', 'S256');
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('redirect_uri', redirectUri);
  
    return authUrl.toString();
  };

  // Function to get user playlists
export const getPlaylists = async () => {
    const accessToken = localStorage.getItem('access_token');
  
    // Make API calls to Spotify using the access token
    // Example: fetch('https://api.spotify.com/v1/me/playlists', {
    //   headers: {
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
    //   // ... (other options)
    // });
  };
## Local Development Setup for Stripe

To use Stripe's payment methods (especially Apple Pay and Google Pay), we need to set up a local development environment by following the steps below.

### 1. Add following keys to `.env.local` file (project source code)

You can get the keys from the Stripe Dashboard.
Or, you can get it from [google docs](https://drive.google.com/file/d/145J_x80rj5XSflhTg_q1UHLaPEzAXdxk/view?usp=drive_link)

**NOTE**: Current keys are for development Stripe account. For deployment, we will use different Stripe account and keys to accept real payments.

```
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=<stripe_publishable_key>
STRIPE_SECRET_KEY=<stripe_secret_key>
```

**NOTE**: There are two types of keys in Stripe: **Test** and **Live** keys. Make sure to use the **Test** keys for local development.

### 2. Run the following command to install necessary packages (project VSCode terminal or terminal)

```
npm install --save stripe @stripe/react-stripe-js @stripe/stripe-js
```

### 3. Open a new terminal (not VSCode) at project folder (KISA-Website-Frontend)

### 4. Set up Ngrok to expose the local server to the internet with HTTPS (required for Stripe Apple Pay and Google Pay)

Sign up Ngrok from [here](https://ngrok.com/)

**NOTE**: From here, you can follow instruction on Ngrok dashboard instead of the following steps. Following steps are ONLY for Mac.

1. Install **ngrok with homebrew** on terminal with a project opened:

```
brew install ngrok/ngrok/ngrok
```

(If you haven't installed homebrew, you can install it from [here](https://brew.sh/))

2. Run the following command to add your authtoken to the default ngrok configuration file:

```
ngrok config add-authtoken <YOUR NGROK TOKEN>
```

### 5. Run the following command to expose the local server to the internet:

```
ngrok http --url=<YOUR NGROK STATIC DOMAIN> 80
```

**NOTE**: YOUR NGROK TOKEN and YOUR NGROK STATIC DOMAIN are provided in the Ngrok dashboard.

### 6. [DO IT ONLY ONCE] Login to Stripe Dashboard and Register YOUR NGROK STATIC DOMAIN as a custom domain

please contact @retz8 for easy domain registration

### 7. Open the project in VSCode and run the following command to start the server:

```
npm run dev
```

### 8. Open the browser and go to the following

```
<YOUR NGROK STATIC DOMAIN>
```

**NOTE**: development port has now changed from 3000 to 80 to match with Ngrok port.

**I CAN'T BELIEVE IT! You are ready to test the Stripe payment methods on your local environment!**

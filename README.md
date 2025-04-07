# MRE: expo/fetch Requires Body for POST Requests on Android

This is an [Expo](https://expo.dev) project demonstrating a bug where `fetch` from `expo/fetch` fails on Android when making a `POST` request without a `body`, deviating from the Fetch Standard.

See the related bug report: [Link to Bug Report] (Replace this with the actual link if available)

## Bug Description

- **Package:** `expo` (specifically `expo/fetch`)
- **Platforms:** Affects Android (iOS/Web work as expected)
- **Summary:** Making a `POST` request using `expo/fetch` *without* providing a `body` in the options fails on Android with a native Java exception. The Fetch Standard allows body-less POST requests.

## How to Reproduce

1.  **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

2.  **Start the app**

    ```bash
    npx expo start
    ```

3.  **Run on Android**

    - Open the app on an Android emulator or physical device using the options provided by `npx expo start` (e.g., press `a` in the terminal).

4.  **Test the Fetch Request**

    - The app consists of a single screen with a button labeled "Send POST Request (No Body)".
    - Tap the button.

## Expected Behavior

The `fetch` call to `https://httpbin.org/post` should succeed (Status 200), and a "Success!" message should appear on the screen, as it does on iOS and Web.

## Observed Behavior (on Android)

The `fetch` call fails, and an "Error:" message appears on the screen, displaying the details of the native exception caught.

This demonstrates the platform inconsistency and deviation from the Fetch Standard when using `expo/fetch` on Android for body-less POST requests.

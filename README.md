# STEADY

Expo + React Native + TypeScript + NativeWind.

## Current scope

Project structure and one empty Home screen: black background with a subtle
red gradient in the top-right and bottom-left corners, based on the supplied reference.
No workout UI, navigation tabs, or database implementation yet.
STEADY app icons and the native splash screen are configured in app.json.

## Run

```sh
npm install
npm start
```

Use the QR code with an Expo Go version compatible with this project's Expo SDK,
or press `a` for a configured Android emulator. Press `w` for the web preview.

## Checks

```sh
npm run typecheck
npm run lint
```

## Structure

```text
src/
  app/                     Expo Router routes; only Home exists now
  features/
    home/                  Empty Home screen
    programs/              Reserved for program planning
    exercises/             Reserved for exercise library
    workout/               Reserved for workout sessions
    progress/              Reserved for statistics and history
    body-weight/           Reserved for body weight and photos
    settings/              Reserved for preferences
  components/
    ui/                    Shared background
    navigation/            Reserved for navigation components
  theme/                   Color tokens
  database/
    migrations/            Reserved for SQLite schema migrations
    repositories/          Reserved for database access
  services/                Reserved for files and backups
  store/                   Reserved for temporary UI state
  utils/                   Reserved for shared helpers
  types/                   Reserved for shared types
assets/
  fonts/
  images/
```

Empty folders are tracked with `.gitkeep`. SQLite and Zustand will be added
when their features are implemented. Screens use NativeWind `className`;
the native gradient uses its typed props and an absolute-fill style.

## Branding and Expo Go

`assets/branding/` contains the 1024px app icon, transparent Android adaptive
foreground, monochrome icon, transparent splash logo, 64px favicon, and editable SVG.
The icon uses a white dot-matrix S with five red dots and STEADY underneath.

Regenerate assets on Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/generate-branding.ps1 -OutputDirectory assets/branding
```

Install Expo Go on your phone. Keep the phone and computer on the same Wi-Fi,
then run `npx expo start --go --clear` from this folder and scan the QR code.
For iPhone, sign in to the same Expo account in Expo Go and the CLI
(`npx expo login`) and scan using Camera. For Android, use Scan QR Code in Expo Go.
Expo Go must support this project's Expo SDK 58.

If LAN cannot connect, stop the server and run `npx expo start --go --tunnel`.
The CLI may offer to install its tunnel helper.

Expo Go is a development preview, not a standalone installation of STEADY.
The launcher icon and full native splash configuration require a native build.
Verify the final splash on a release build: Expo Go and development builds do not
fully reproduce the production splash. The Home screen remains background-only.

Official docs:
- https://docs.expo.dev/get-started/start-developing/
- https://docs.expo.dev/versions/v58.0.0/sdk/splash-screen/

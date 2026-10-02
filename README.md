# Expo template export reproduction

Minimal reproduction of the missing `expo/template.tgz` export in Expo SDK 58.
The project pins `expo@58.0.2`; the same failure was also confirmed with `58.0.1`.

## Reproduce with PowerShell 7

```powershell
npm ci
npm run repro
```

The reproduction script is expected to fail with exit code 1. It confirms that
`template.tgz` exists in the installed Expo package, then attempts to resolve
`expo/template.tgz`. Node.js reports a nonexistent `template.tgz.js` path.
No emulator or native build is needed.

## Cause and expected behavior

Expo's generic package export is:

```json
"./*": {
  "types": "./*.d.ts",
  "default": "./*.js"
}
```

Without a specific archive export, `template.tgz` matches the wildcard and the
resolver looks for `template.tgz.js`. The expected result is the existing archive.
Adding the following entry to Expo's exports fixes resolution with Node.js:

```json
"./template.tgz": "./template.tgz"
```

The reproduction intentionally contains the unpatched package. Expo CLI uses the
same subpath during prebuild. If local resolution fails, it falls back to fetching
`expo-template-bare-minimum` through npm. This fallback can hide the broken
resolution when npm and the registry are available.

## Verified environment

- Windows 11, build 10.0.26300; PowerShell 7.6.5
- Expo 58.0.2; Expo CLI 58.1.1
- React 19.3.0; React Native 0.88.0-rc.3
- Node.js 26.10.0; npm 11.19.1

```powershell
npx --yes expo-doctor@latest
```

Result: `20/20 checks passed. No issues detected!`

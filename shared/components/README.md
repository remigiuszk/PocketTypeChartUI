# shared/components

Cross-feature UI building blocks — layout shell, navigation chrome, and generic
loading/error/empty states. Anything specific to a single feature belongs in
that feature's own `components/` folder instead.

All components below are currently imported somewhere in the app; none are
dead code.

## App shell

- **`Screen`** — the shell every tab renders itself inside (`Typing`,
  `TeamBuilder`, `PokemonSearch`). On web: `TopBar`, a single page-level
  `ScrollView` with content capped via `PageContainer`, then `WebFooter`. On
  native: `TopBar`, flex content, bottom `NavBar`. `TopBar`/`NavBar` read the
  active tab and navigate via React Navigation hooks (`useNavigation` /
  `useNavigationState`), so `Screen` doesn't thread any active-tab state
  through itself.
- **`PageContainer`** — centers and width-caps content on web
  (`WEB_MAX_WIDTH`/`WEB_GUTTER`); a transparent passthrough on native. Used
  by `Screen`.
- **`ContentScroll`** — native renders a `ScrollView` so inner regions scroll
  within the fixed shell; web renders a plain `View` since the whole page
  already scrolls via `Screen`, avoiding a nested scroll container that would
  trap the wheel/scrollbar. Used by `Typing` and `TeamOverview`.
- **`WebFooter`** — web-only footer with App Store / Google Play badges
  promoting the native app; renders `null` on native. Used by `Screen`.

## Navigation

- **`TopBar`** — header bar. On web it renders the brand icon plus the full
  tab nav (built from `navigation/tabs.ts` via `WebNavTab`), since the bottom
  `NavBar` is dropped on web. On native it renders just the brand icon; tabs
  live in `NavBar` instead.
- **`NavBar`** — native-only bottom tab bar, rendered from the same
  `navigation/tabs.ts` list. Active tab is non-pressable.
- **`WebNavTab`** — single pressable tab button used by `TopBar`'s web
  layout (icon + label, active/compact styling). Not used on native — `NavBar`
  has its own inline button markup.

## Generic states

- **`Loading`** — centered `ActivityIndicator`. Used wherever an RTK Query
  request is in flight (`PokeTypeList`, `Relations`, `MemberDetails`,
  `TeamOverview`).
- **`Error`** — connection-error illustration + a "Refresh" button
  (`onRetry`). Used alongside `Loading` in the same query-driven components.
- **`NoTypesSelected`** — empty-state illustration shown on the Typing tab
  before any type is picked.
- **`AppSplash`** — animated splash screen (pulsing logo, spinner) shown by
  `App.tsx` while fonts/initial data are still loading.

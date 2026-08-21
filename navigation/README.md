# navigation

React Navigation setup for the app's three tabs (`Typing`, `TeamBuilder`,
`PokemonSearch`). `App.tsx` wraps `RootTabs` in a `NavigationContainer`;
everything else the app needs to know about tabs is defined here.

- **`types.ts`** — `RootTabParamList`, the route-name-to-params map used to
  type `useNavigation`/`useNavigationState` calls throughout the app.
- **`tabs.ts`** — `TABS`, the single source of truth for the app's tabs.
  `TopBar` (web) and `NavBar` (native) both render themselves from this list
  instead of hardcoding a button per tab, so adding a tab here is enough for
  both bars to pick it up.
- **`RootTabs.tsx`** — creates the tab navigator and registers the three
  screens.

## Implementation details

Screens keep their state when switching tabs — React Navigation keeps
unfocused tabs mounted by default. Previously, `App.tsx` toggled a boolean to
choose between two screens, which unmounted the inactive one and reset its
state; that's fixed by letting the navigator manage which screen is mounted.

The navigator's own tab bar is disabled (`tabBar={() => null}`) because
`TopBar`/`NavBar` render the tab UI themselves, styled to match the rest of
the app, inside `Screen` — see [shared/components/README.md](../shared/components/README.md).

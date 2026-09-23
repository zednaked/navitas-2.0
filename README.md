# Navitas, the JavaScript version

A space shooter, written in plain JavaScript with Vite and a hand-written GLSL
background. Playable in the browser:
**https://zednaked.github.io/navitas-2.0/**

This is the first of three passes at the same game. The point of the exercise
was never the game: it was to build the same thing in three stacks and see what
each one actually costs.

| Pass | Stack | Repo |
|---|---|---|
| 1 | JavaScript + Vite | this one |
| 2 | Rust, shader-first | [navitas-rust](https://github.com/zednaked/navitas-rust) |
| 3 | Rust + Bevy, with a web deploy workflow | [Navitas-Rust-Bevy](https://github.com/zednaked/Navitas-Rust-Bevy) |

The same 5,999 bytes of GLSL survive all three. **The shader was the constant
and the engine was the variable**, which is most of what the exercise taught.

Written in 2024 and not maintained. It is here as a record, and it still runs.

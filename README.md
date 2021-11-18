# @cursorsdottsx/types

> Runtime type checking with minimal performance reduction in production.

Are YOU tired of MANUALLY writing runtime type checking for your STUPID JAVASCRIPT USERS?

Are YOU always wanting to TYPE-CHECK your API responses so your library is MORE FRIENDLY?

And are YOU seeking a MODERN and PRAGMATIC way to do this?

IF SO, this library is NOT for you.

You should use my excellent [TypeGC](https://github.com/cursorsdottsx/typegc) tool instead.

BUT if YOU are always wanting to TYPE-CHECK everything, this library IS definitely FOR YOU.

Here's a simple example to get your imagination rolling:

```ts
import types from "@cursorsdottsx/types";

const AsyncIncrementer = types.fn( // create new function type
    "AsyncIncrementer",            // type name for debugging
    [types.number],                // function parameters
    types.promise(types.number),   // function return type
);

const asyncIncrementer = types.construct( // create value from type as a model
    AsyncIncrementer,                     // type to model is AsyncIncrementer
    async (x: number) => x + 1,           // value to type-check
);

asyncIncrementer(41);   // => 42
asyncIncrementer("41"); // !~ Error
```

Features:

- `intersection` - Intersection type
- `mapped` - Mapped type
- `not` - Negated type
- `tuple` - Tuple type
- `union` - Union type
- `generic` - Generic type
- `condition` - Conditional type

Remarks:

This library is pretty self-explanatory and self-documenting, so I won't list documentation (also since I'm really lazy).
To disable runtime type-checking in production, simply set the `NODE_ENV` environment variable to `"production"`.
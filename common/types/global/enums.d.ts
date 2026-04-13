declare type MyEnum<U extends string> = Readonly<[U, ...U[]]>;

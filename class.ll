source_filename = "example/class.syn"
%"example/class.syn::test" = type { i32 }
@puts_str = linkonce constant [4 x i8] c"\25\73\0a\00"
@puti_str = linkonce constant [4 x i8] c"\25\64\0a\00"
declare i32 @printf(i8* %0, ...)
define i32 @"console::puts"(i8* %0) {
1:
    %2 = getelementptr [4 x i8], [4 x i8]* @puts_str, i32 0, i32 0
    %3 = call i32 (i8*, ...) @printf(i8* %2, i8* %0)
    ret i32 %3
}
define i32 @"console::puti"(i32 %0) {
1:
    %2 = getelementptr [4 x i8], [4 x i8]* @puti_str, i32 0, i32 0
    %3 = call i32 (i8*, ...) @printf(i8* %2, i32 %0)
    ret i32 %3
}
define i32 @"example/class.syn::test#test"(%"example/class.syn::test"* %0) {
1:
    %2 = getelementptr %"example/class.syn::test", %"example/class.syn::test"* %0, i32 0, i32 0
    %3 = load i32, i32* %2
    ret i32 %3
}
define void @"example/class.syn::main"() {
0:
    ; let a
    %1 = alloca %"example/class.syn::test"*
    %2 = load %"example/class.syn::test"*, %"example/class.syn::test"** %1
    %3 = call i32 @"example/class.syn::test#test"(%"example/class.syn::test"* %2)
    ret void
}
define i32 @main(i32 %0, i8* %1) {
2:
    call void @"example/class.syn::main"()
    ret i32 0
}
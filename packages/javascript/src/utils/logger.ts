
export default {
    info: console.info.bind(
        console,
        `[ \x1b[32minfo\x1b[0m ] [VanillaWM]: `
    ),
    error: console.error.bind(
        console,
        `[ \x1b[31merror\x1b[0m ] [VanillaWM]: `
    )
}

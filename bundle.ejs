function require(filePath) {
    const map = {
        './foo.js': foojs,
        './main.js': mainjs
    }
    const fn = map[filePath]
    const module = {
        exports: {}
    }
    fn(require, module, module.exports)
    return module.exports
}


require('./main.js')

function mainjs(require, module, exports) {
    const { foo } = require('./foo.js')
    foo()
    console.log('main.js')
}

function foojs(require, module, exports) {
    function foo() {
        console.log('foo')
    }
    module.exports = {
        foo
    }
}
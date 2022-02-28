import fs from 'fs'
import parser from '@babel/parser'
import traverse from '@babel/traverse'
import path from 'path'
import ejs from 'ejs'

function createAsset(filePath) {
    // 1、获取文件内容
    
    const source = fs.readFileSync(filePath, {
        encoding: 'utf-8'
    })

    // console.log(source)
    // 2、获取依赖关系 ast --> 抽象语法树 astexplorer.net
    const ast = parser.parse(source, {
        sourceType: 'module'
    })

    // console.log(ast)
    const deps = []
    traverse.default(ast, {
        ImportDeclaration({node}) {
            // console.log(node)
            deps.push(node.source.value)
        }
    })
    return {
        filePath,
        source,
        deps
    }
}

// const asset = createAsset()
// console.log(asset)


function createGraph() {
    const mainAsset = createAsset("./example/main.js")
    const queue = [mainAsset]
    for (const asset of queue) {
        asset.deps.forEach(relativePath => {
            const child = createAsset(path.resolve('./example', relativePath))
            console.log(child)
            queue.push(child)
        })
    }
    return queue
}

const graph = createGraph()
// console.log(graph) 

function build (graph) {
    const template = fs.readFileSync('./bundle.ejs', {encoding: 'utf-8'})
    const code = ejs.render(template)
    console.log(code)
}

build(graph)
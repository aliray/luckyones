# dev log

## 开发问题及解决方案Link

* emoji <https://www.w3school.com.cn/charsets/ref_emoji.asp>
* emoji to ico <https://favicon.io/emoji-favicons/>
* 配色方案 <http://www.wenliku.com/color/>
  * 当前配色 22ED1  67419D  410F88  9960E8  AE84E8
* 渐变色方案 <https://www.grabient.com/>
* rimraf node_modules 暴力删除
* https://cssgradient.io/ 背景样式生成工具

## javascript or typescript tips

### typescript

* ?? 类似于 || 操作, a ?? b 如果 a 为 null or undefined 则取 b 否则取 a
* 可选参数：在参数名后面，冒号前面添加一个问号，则表明该参数是可选的。如下代码：
    function buildName(firstName: string, lastName?: string)

### 智能合约开发tips

* 部署 multicall contract 可以减少gas费用及查询时间
* https://www.scien.cx/2021/09/17/how-to-deploy-a-smart-contract-to-rinkeby-testnet-using-infura-and-hardhat/ 


### errors

* vscode 使用 terminal 后在控制台安装 新的js依赖 会有异常:

  `error An unexpected error occurred: "EPERM: operation not permitted, unlink 'F:\\ethapps\\dApps\\luckyx\\luckyx-interface\\node_modules\\esbuild-loader\\node_modules\\esbuild\\esbuild.exe'".`

* promise 异步编程如果嵌套调用await 需要使用try catch 捕获异常,以免为处理异常溢出;
* 使用 npx hardhat node 作为evm开发节点时,需要设置开采模式为定时开采(手动开采模式未测试),立即开采模式下调用发起合约交易出现BUG? don't know why?
* metamask nonce error in develop env
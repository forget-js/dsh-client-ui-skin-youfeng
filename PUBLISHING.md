# 把「有风」做成 DSH 里可一键安装的插件包

本目录已经是一个标准 DSH bundle 包，`package.json` 里声明了三项关键内容：

- `dsh.bundle.patch` → `cordis.patch.yml`：告诉 DSH 这个包会向 profile 插入哪些插件行
- `dsh.client` → `./client`：告诉 Web 客户端从这里加载浏览器 bundle
- `engines.dsh` → 兼容的 DSH 版本范围

## 最简单：打成 npm tarball，在 DSH「插件 → 添加插件」里安装

```powershell
cd <此仓库目录>
npm pack --pack-destination dist
```

生成：

```
dist/dsh-client-ui-skin-workbuddy-youfeng-0.1.0.tgz
```

在 DSH Desktop 里：

1. **插件 → 添加插件 → 安装第三方插件**
2. 粘贴上面的 `.tgz` 绝对路径
3. 点「安装」，完成后点「立即启用」

这就是本地一键安装包；不需要发布到 npm，也不需要手动改 profile。

## 让别人在 DSH 插件市场一键安装

### 1) 发布 npm 包

```powershell
npm login
cd <此仓库目录>
npm publish --access public
```

发布后，插件安装页里输入包名即可安装：

```
dsh-client-ui-skin-workbuddy-youfeng
```

### 2) 用插件市场索引提供「发现 → 安装」卡片

`market/index.json` 是 DSH 的插件市场索引 **format 1**，已按
`@deepseek-ai/dsh-plugin-market-index` 校验通过。把它放在任意可公开访问的
HTTPS 地址即可，例如：

- 发布 npm 后，直接使用 jsDelivr：
  `https://cdn.jsdelivr.net/npm/dsh-client-ui-skin-workbuddy-youfeng@0.1.0/market/index.json`
- 或放进 GitHub Pages / 自己的静态站。

在 DSH 里打开：

**插件 → 发现（Discover）→ 索引源（Index sources）→ 添加索引源**，粘贴上面的 URL。
之后卡片上的「安装」就是真正的市场一键安装。

如果要让所有人都能发现这个插件，还需要去
[awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin)
提交一条精选条目；`dshmarket` 与 DSH 的 Discover 会从它同步。

### 3) 提交到 DSH 皮肤市场

如果希望出现在「皮肤市场」里，先把这个包推到公开 GitHub 仓库。
然后按 `market/dsh-skin-market-entry.yml` 的模板，在
`dsh-skin-market` 仓库新建：

```
registry/skins/<你的GitHub用户名>__<仓库名>.yml
```

在该仓库根目录执行：

```powershell
npm run registry:check
```

通过后向 `dsh-skin-market` 提 PR，标题 `feat(registry): add 有风`。
市场 CI 会自动补全 package、commit、loader id 和预览图。

## 注意

- `market/index.json` 里的 `version` 和 `publishTimestamp` 要与实际 npm 发布版本/时间一致。
- 主题中的 WorkBuddy 壁纸和叶猫素材来自本机 WorkBuddy 外观包；如果要公开发布到 npm / 公共仓库，请先确认素材授权，或替换成你拥有版权的图片。仅自己在本机安装不受影响。

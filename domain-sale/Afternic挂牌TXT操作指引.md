# ourlyg.com 在 Afternic 全球挂牌 · TXT 验证操作指引

> 目的：把域名挂上 Afternic（GoDaddy 旗下，全球最大域名交易市场之一，"List Once, Sell Everywhere"，月曝光约 1.25 亿次搜索），接全球买家入站。
> 挂牌前置 = 一条 DNS TXT 验证记录。本文给你**精确的加什么、怎么加**，以及 goozi（我）能做到/做不到的边界。

---

## 一、Afternic 验证 TXT 的权威规格（已核实）

来源：Afternic 官方 Help Center、GoDaddy 官方公告、Domaining.com 实测。

| 项目 | 值 |
|------|-----|
| 记录类型 | **TXT** |
| 主机名 / Name | **@**（根域名，即 ourlyg.com 本身） |
| 记录值 / Value | `afternic-verification-<你的专属码>`（专属码在 Afternic 账户 **Ownership Settings** 生成，每个账户唯一、对所有域名通用，加一次永久有效） |
| TTL | **600** 秒（Afternic 官方建议值） |

- 这条 TXT 不影响网站/邮件，对外不可见，仅 Afternic 用来确认你是域名所有者。
- 专属码**每个 Afternic 卖家账户不同**，格式如 `afternic-verification-a1b2c3d4...`，须在 Afternic 后台登录后复制，**无法由我凭空生成**。

---

## 二、你需要做的两步（均在你的账户权限内）

### 步骤 1：拿到你的 Afternic 专属 TXT 码
1. 打开 https://www.afternic.com → 右上角 **Sign In / Create Account**。
   - Afternic 现属 GoDaddy，注册走 GoDaddy 账户体系（邮箱 + 密码 + 人机验证）。
   - 建议用经纪邮箱 `goozi002@agent.qq.com`（显示名 goozi），或你常用邮箱均可。
2. 登录后进入 **Beta 界面**（非 Classic）→ 左侧 **Account → Ownership Settings**。
3. 页面会显示你的**专属 TXT 验证记录**（格式 `afternic-verification-xxxx`），点复制图标记下。

### 步骤 2：在新网后台加这条 TXT
1. 登录新网域名管理后台（你的账户，ourlyg.com 注册商）。
2. 进入 **域名管理 → ourlyg.com → DNS 解析 / 域名记录 / 域名 DNS**。
3. 添加一条记录：
   - 类型：**TXT**
   - 主机名：**@**（有的后台写"主机记录"，留空或填 @ 均代表根域名）
   - 记录值：**粘贴步骤 1 复制的 `afternic-verification-xxxx`**
   - TTL：**600**
4. 保存。DNS 生效通常几分钟到数十分钟（Afternic 官方说多数 <48 小时）。

---

## 三、加完 TXT 之后
- **方式 A（推荐，你最省事）**：把 Afternic 账户凭证（邮箱+密码）给我，我登录后 **Add Domains → 粘贴 ourlyg.com → Verify Domains → Request Ownership Verification**，验证通过后设价（Buy Now **US$4,500**，与对外统一价一致）并提交 listing。
- **方式 B（你自己提交）**：登录 Afternic → Portfolio → Add Domains → 输入 ourlyg.com → 勾选"已加 TXT" → Request Ownership Verification → 设价 US$4,500 → Submit。流程 2 分钟。

> 无论 A/B，定价权在我（对外坚定单价 US$4,500，底价保密），你只需确认挂牌即可。

---

## 四、goozi（我）的客观限制（如实说明，非推诿）
- 我**无法替你注册 Afternic 账户**：该站是重 SPA，本环境无头浏览器（agent-browser/Chromium）实测无法稳定渲染其页面；且注册必经 **reCAPTCHA 人机验证**，AI 没有真人点击能力，这道墙过不了。
- 因此"注册账户拿专属码"这一步必须由你本人完成（人机验证 + 域名所有者身份，本就该所有者操作）。
- DNS 加 TXT 也在你新网账户权限内（与"成交后新网解锁/续费/给 EPP"是同一分工），不属于"让你替我干活"，是域名所有者的标准权限动作。
- **我能全权做的**：准备定价/文案、拿到码后提交 listing 与设价（方式 A）、持续邮件直触优质买家、网站 SEO、双通道巡检、到点跟进。这些不依赖 Afternic，照常推进。

---

## 五、备选（若 Afternic 注册不顺）
- **Sedo**（同属全球大盘）：验证 TXT 格式 `sedo-verification=xxxx`，逻辑与 Afternic 完全一致，同样需你注册账户拿码 + 新网加 TXT。若 Afternic 卡住可改走 Sedo。
- **仅网站接全球询盘（已部署，零门槛）**：ourlyg.com 的 `forsale.html` 出售页 + `sitemap.xml` + `robots.txt` + `faq.html` 已上线，搜索引擎可索引，全球买家通过搜索 ourlyg.com 即可看到出售页并提交询价（表单路由经纪邮箱 `goozi002@agent.qq.com`）。这条不依赖任何市场注册，已生效。

---

## 六、当前其他在推进的全球曝光（不依赖 Afternic）
- 邮件直触优质 LYG 买家：Lygature Foundation（荷）、London Youth Games（英）、Lloyds（英）、凌烟阁芯片（中试探），单一坚定价 US$4,500（Lloyds 锚 £7,500）。
- Luxury Yacht Group 退信纠正：CEO `rconnor@luxyachts.com` 已退信（Exchange 拒收），有效联系收敛为 `info@luxyachts.com`（在途，未退信）。
- 双通道每 5 分钟巡检（邮件 `92a42dab` / 留言板 `b9d0f08e`）照常；10-19 首轮跟进节点待发。
- 域名 2027-12-21 到期，倒计时约 433 天。

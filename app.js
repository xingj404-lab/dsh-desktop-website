(function () {
  "use strict";

  // —— 与 GitHub Releases 资产名的对应关系 ——
  var ASSET_SUFFIX = {
    dmg: "_aarch64.dmg",       // macOS 安装包（DMG）
    appzip: "_arm64.app.zip",  // macOS 便携版 .app（zip）
    exe: "_x64-setup.exe",     // Windows NSIS 安装包
    msi: "_x64_en-US.msi"      // Windows WiX 安装包
  };

  var API_URL =
    "https://api.github.com/repos/xingj404-lab/dsh-desktop/releases/latest";

  var fallback = window.__DSH_FALLBACK__ || null;

  /* ============================ 文案（中英） ============================ */

  var T = {
    zh: {
      meta_title: "DeepSeek Harness 桌面版 · dsh-desktop 下载",
      meta_description:
        "DeepSeek Harness (dsh) 编程智能体的原生桌面应用。开箱即用、内置 Node 与 dsh，无需安装任何环境。免费下载 macOS 与 Windows 版本。",
      skip_link: "跳到主要内容",
      brand_badge: "桌面版",
      nav_features: "特性",
      nav_download: "下载",
      nav_faq: "常见问题",
      nav_quickstart: "快速开始",
      nav_cta: "免费下载",
      nav_open: "打开菜单",
      nav_close: "关闭菜单",

      hero_title_accent: "桌面版",
      hero_sub:
        "<strong>dsh</strong> 编程智能体的原生桌面应用。开箱即用，内置 Node 与 dsh，无需安装任何环境 —— 下载安装包，双击即可开始。",
      hero_dl_mac: "下载 macOS 版",
      hero_dl_win: "下载 Windows 版",
      hero_dl_other: "选择平台下载",
      hero_view_all: "查看所有平台",
      hero_hint_mac: "已为你检测到 macOS · Apple Silicon",
      hero_hint_win: "已为你检测到 Windows · x64",
      hero_hint_other: "请选择你的平台",
      hero_meta_platforms: "macOS 10.13+ / Windows 10+",
      hero_meta_free: "完全免费",
      shot_chip: "DeepSeek Harness · 编程智能体",
      version_prefix: "最新版本",

      eyebrow_download: "下载",
      download_title: "选择你的平台开始使用",
      download_sub:
        "安装包已内置 Node.js 运行时与 dsh CLI，最终用户无需安装 Node、npm 或任何命令行工具。",
      dl_total: "累计下载 {n} 次",
      dl_count: "{n} 次下载",
      mac_name: "macOS",
      mac_arch: "Apple Silicon · M1 / M2 / M3 / M4",
      win_name: "Windows",
      win_arch: "x64 · Windows 10 / 11",
      tag_recommended: "推荐",
      tag_stable: "稳定版",
      mac_dmg_btn: "下载 .dmg 安装包",
      mac_appzip_btn: "下载便携版 .app（zip）",
      win_exe_btn: "下载 .exe 安装包",
      win_msi_btn: "下载 .msi 安装包",
      mac_note: "macOS 10.13+ · 未签名构建，首次打开请见下方说明",
      win_note: "Windows 10/11 x64 · 标准安装程序",
      callout_title: "macOS 安装说明（Gatekeeper）",
      callout_p:
        "应用<strong>未使用 Apple 开发者证书签名</strong>，macOS 会拦截首次打开。请按下面步骤移除「隔离属性」即可正常使用：",
      callout_step1_title: "打开「终端」Terminal",
      callout_step1_a:
        "按 <kbd>⌘ Command</kbd> + <kbd>空格</kbd> 打开「聚焦搜索」，输入 <strong>Terminal</strong> 后按回车；",
      callout_step1_b: "或：打开「访达」Finder →「应用程序」→「实用工具」→「终端」。",
      callout_step2_title: "粘贴并运行下面这条命令，然后按回车",
      callout_step2_note:
        "提示：请先确认应用已放入「应用程序」文件夹；若放在其它位置，请把命令里的路径改成实际位置。",
      callout_step3_title: "再次双击「DeepSeek Harness」图标即可正常打开",
      callout_step3_note: "命令执行后终端没有任何输出即为成功，无需其它操作。",
      copy_btn: "复制",
      copy_done: "已复制 ✓",
      download_foot:
        'Linux 用户或需要从源码构建？查看 <a href="https://github.com/xingj404-lab/dsh-desktop#-build-from-source" target="_blank" rel="noopener">构建指南</a>，或前往 <a href="https://github.com/xingj404-lab/dsh-desktop/releases/latest" target="_blank" rel="noopener">GitHub Releases</a> 查看全部安装包。',

      eyebrow_quickstart: "快速开始",
      quickstart_title: "开始使用只需四步",
      quickstart_sub:
        "下载安装后，还需要一个 DeepSeek API Key 才能调用模型。按下面步骤开通，几分钟即可开始工作。",
      qs1_title: "注册 DeepSeek 账号",
      qs1_desc:
        '打开 <a href="https://platform.deepseek.com/" target="_blank" rel="noopener">platform.deepseek.com</a>，用手机号或邮箱注册（也可用 Google / GitHub 登录）。',
      qs2_title: "创建 API Key",
      qs2_desc:
        '登录后进入 <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">API Keys</a> 页面，点击「创建 API Key」，复制生成的 <code>sk-</code> 开头的密钥。<strong>密钥只在创建时显示一次，请立即保存好。</strong>',
      qs3_title: "充值余额",
      qs3_desc:
        '进入 <a href="https://platform.deepseek.com/top_up" target="_blank" rel="noopener">充值 / Billing</a> 页面，用支付宝、微信或信用卡充值（按用量计费，需先有余额才能调用 API）。部分用户可能需先完成实名认证。',
      qs4_title: "在桌面应用中填入 API Key",
      qs4_desc:
        "打开 DeepSeek Harness 桌面版，进入「模型 / Models」设置页，把 API Key 粘贴进去即可，立即生效、无需重启。",
      quickstart_foot:
        '还没有 API Key？<a href="https://platform.deepseek.com/" target="_blank" rel="noopener">前往 DeepSeek 开放平台</a>注册并开通。详细定价请见<a href="https://api-docs.deepseek.com/quick_start/pricing" target="_blank" rel="noopener">官方定价页</a>。',

      nav_stack: "技术栈",
      eyebrow_stack: "架构优势",
      stack_title: "更轻、更快，没有 Electron 的臃肿",
      stack_sub:
        "很多桌面 AI 工具用 Electron 打包，等于每个应用都内置一整个浏览器，又大又慢。DeepSeek Harness 桌面版改用更轻量的原生技术，把省下的性能都留给你。",
      b1_title: "启动更快",
      b1_desc: "双击秒开，无需等待臃肿的浏览器内核加载。",
      b2_title: "体积更小",
      b2_desc: "安装包更小、下载更快，不占用大量磁盘空间。",
      b3_title: "内存更省",
      b3_desc: "不额外吃内存，和编辑器、浏览器一起开也不卡。",
      b4_title: "更安全",
      b4_desc: "底层技术更安全，数据始终留在你的电脑上。",
      stack_note:
        "同样是桌面应用，Electron 会给每个应用塞进一整个浏览器；我们改用更轻的 <strong>Tauri</strong> 技术 —— 更小、更快、更省内存，同时保留了原生窗口、系统托盘与自动更新。",

      eyebrow_features: "特性",
      features_title: "原生、开箱即用的桌面体验",
      features_sub:
        'dsh-desktop 是 <a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener">DeepSeek Harness</a>（dsh）的 Tauri v2 桌面外壳 —— 底层界面与 <code>dsh web</code> 完全一致，但打包成了双击即用的原生应用。',
      f1_title: "开箱即用",
      f1_desc: "打包内置 Node.js 运行时与 dsh CLI，无需安装 Node、npm 或命令行工具。",
      f2_title: "原生窗口",
      f2_desc: "Dock 图标、菜单栏、缩放（⌘/Ctrl +/−、⌘/Ctrl 0）、刷新与开发者工具。",
      f3_title: "系统托盘",
      f3_desc: "关闭窗口会最小化到托盘而非退出，后端继续在后台运行。",
      f4_title: "窗口状态记忆",
      f4_desc: "记住窗口大小与位置，下次启动自动恢复。",
      f5_title: "后端自愈",
      f5_desc: "监视 dsh web 进程，崩溃后自动重启，稳定可靠。",
      f6_title: "本地优先",
      f6_desc: "后端只绑定 127.0.0.1，不对外暴露端口，数据留在本机。",

      eyebrow_faq: "常见问题",
      faq_title: "你可能想问",
      q1: "需要安装 Node.js 或 npm 吗？",
      a1: "不需要。桌面版打包内置了 Node.js 运行时与 dsh CLI，下载安装即可使用，无需额外安装任何环境。",
      q2: "它和网页版 dsh web 有什么区别？",
      a2: "底层界面完全一致。桌面版额外提供原生窗口、菜单栏、系统托盘、窗口状态记忆与后端自动重启，并免去命令行安装步骤。",
      q3: "支持哪些平台？",
      a3: "目前提供 macOS（Apple Silicon）与 Windows（x64）的安装包。Linux 用户可从源码构建，参见构建指南。",
      q4: "macOS 提示「无法验证开发者」怎么办？",
      a4: '应用未使用 Apple 开发者证书签名，需要移除隔离属性。打开「终端」（按 ⌘+空格，输入 Terminal 后回车），运行 <code>xattr -cr "/Applications/DeepSeek Harness.app"</code>。详见上方<a href="#macos-note">安装说明</a>。',
      q5: "应用会收集或上传我的数据吗？",
      a5: "不会。后端只绑定本机 127.0.0.1 回环地址，不对外暴露端口，所有数据都留在你的本机。",
      q6: "如何更新到新版本？",
      a6: "桌面版内置自动更新：菜单栏 → DeepSeek Harness →「检查更新…」，即可下载并安装最新版本。",

      footer_brand: "DeepSeek Harness 桌面版",
      footer_desc:
        'dsh 编程智能体的原生桌面应用，基于 Tauri v2 构建。底层界面由 <a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener">DeepSeek Harness</a> 提供。',
      footer_repo: "GitHub 仓库",
      footer_docs: "文档",
      footer_copy: "DeepSeek Harness Desktop · 开源 · MIT"
    },

    en: {
      meta_title: "DeepSeek Harness Desktop · dsh-desktop Download",
      meta_description:
        "The native desktop app for the DeepSeek Harness (dsh) coding agent. Zero setup — bundles Node and dsh, nothing to install. Free downloads for macOS and Windows.",
      skip_link: "Skip to content",
      brand_badge: "Desktop",
      nav_features: "Features",
      nav_download: "Download",
      nav_faq: "FAQ",
      nav_quickstart: "Quick start",
      nav_cta: "Download free",
      nav_open: "Open menu",
      nav_close: "Close menu",

      hero_title_accent: "Desktop",
      hero_sub:
        "The native desktop app for the <strong>dsh</strong> coding agent. Zero setup — bundles Node and dsh, nothing to install. Download and double-click to get started.",
      hero_dl_mac: "Download for macOS",
      hero_dl_win: "Download for Windows",
      hero_dl_other: "Choose your platform",
      hero_view_all: "All platforms",
      hero_hint_mac: "Detected macOS · Apple Silicon",
      hero_hint_win: "Detected Windows · x64",
      hero_hint_other: "Choose your platform",
      hero_meta_platforms: "macOS 10.13+ / Windows 10+",
      hero_meta_free: "100% free",
      shot_chip: "DeepSeek Harness · Coding agent",
      version_prefix: "Latest",

      eyebrow_download: "Download",
      download_title: "Choose your platform",
      download_sub:
        "Installers bundle the Node.js runtime and the dsh CLI — end users don't need Node, npm, or any command-line tools.",
      dl_total: "{n} total downloads",
      dl_count: "{n} downloads",
      mac_name: "macOS",
      mac_arch: "Apple Silicon · M1 / M2 / M3 / M4",
      win_name: "Windows",
      win_arch: "x64 · Windows 10 / 11",
      tag_recommended: "Recommended",
      tag_stable: "Stable",
      mac_dmg_btn: "Download .dmg installer",
      mac_appzip_btn: "Portable .app (zip)",
      win_exe_btn: "Download .exe installer",
      win_msi_btn: "Download .msi installer",
      mac_note: "macOS 10.13+ · unsigned build — see note below",
      win_note: "Windows 10/11 x64 · standard installer",
      callout_title: "macOS install note (Gatekeeper)",
      callout_p:
        "The app is <strong>not signed with an Apple Developer certificate</strong>, so macOS blocks the first launch. Remove its quarantine flag as follows:",
      callout_step1_title: "Open Terminal",
      callout_step1_a:
        "Press <kbd>⌘ Command</kbd> + <kbd>Space</kbd> for Spotlight, type <strong>Terminal</strong>, and press Enter;",
      callout_step1_b: "Or: Finder → Applications → Utilities → Terminal.",
      callout_step2_title: "Paste this command and press Enter",
      callout_step2_note:
        "Tip: make sure the app is in your Applications folder; otherwise change the path in the command to its actual location.",
      callout_step3_title: "Double-click \u201cDeepSeek Harness\u201d again to open it",
      callout_step3_note: "No output from the command means success — nothing else to do.",
      copy_btn: "Copy",
      copy_done: "Copied ✓",
      download_foot:
        'On Linux, or want to build from source? See the <a href="https://github.com/xingj404-lab/dsh-desktop#-build-from-source" target="_blank" rel="noopener">build guide</a> or visit <a href="https://github.com/xingj404-lab/dsh-desktop/releases/latest" target="_blank" rel="noopener">GitHub Releases</a> for all installers.',

      eyebrow_quickstart: "Quick start",
      quickstart_title: "Get started in four steps",
      quickstart_sub:
        "After installing, you need a DeepSeek API key to call the models. Set it up in a few minutes:",
      qs1_title: "Create a DeepSeek account",
      qs1_desc:
        'Open <a href="https://platform.deepseek.com/" target="_blank" rel="noopener">platform.deepseek.com</a> and sign up with a phone number or email (Google / GitHub sign-in also works).',
      qs2_title: "Create an API key",
      qs2_desc:
        'Go to the <a href="https://platform.deepseek.com/api_keys" target="_blank" rel="noopener">API Keys</a> page, click \u201cCreate API key\u201d, and copy the <code>sk-</code> key. <strong>The key is shown only once \u2014 save it right away.</strong>',
      qs3_title: "Top up your balance",
      qs3_desc:
        'Open <a href="https://platform.deepseek.com/top_up" target="_blank" rel="noopener">Billing / Top up</a> and pay with Alipay, WeChat Pay, or a credit card. Usage is pay-as-you-go and requires a balance. Some users may need identity verification first.',
      qs4_title: "Enter the key in the desktop app",
      qs4_desc:
        'Open the DeepSeek Harness desktop app, go to the \u201cModels\u201d settings page, and paste your API key. It takes effect immediately \u2014 no restart needed.',
      quickstart_foot:
        'No API key yet? <a href="https://platform.deepseek.com/" target="_blank" rel="noopener">Open the DeepSeek platform</a> to sign up. See the <a href="https://api-docs.deepseek.com/quick_start/pricing" target="_blank" rel="noopener">pricing page</a> for details.',

      nav_stack: "Tech",
      eyebrow_stack: "Why it's better",
      stack_title: "Lighter and faster — without Electron's bloat",
      stack_sub:
        "Many desktop AI tools are built on Electron, which bundles a whole browser into every app — big and sluggish. DeepSeek Harness Desktop uses lighter native tech instead, and passes the savings on to you.",
      b1_title: "Faster startup",
      b1_desc: "Double-click and go — no waiting for a heavy browser engine to load.",
      b2_title: "Smaller footprint",
      b2_desc: "Smaller installer, faster download, less disk space used.",
      b3_title: "Lower memory",
      b3_desc: "Doesn't hog RAM — runs smoothly alongside your editor and browser.",
      b4_title: "More secure",
      b4_desc: "Safer under the hood, and your data never leaves your machine.",
      stack_note:
        "Where Electron stuffs an entire browser into each app, we use the lighter <strong>Tauri</strong> framework — smaller, faster, and lighter on memory, while keeping the native window, system tray, and auto-update.",

      eyebrow_features: "Features",
      features_title: "A native, zero-setup desktop experience",
      features_sub:
        'dsh-desktop is a Tauri v2 shell around <a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener">DeepSeek Harness</a> (dsh) — the same UI as <code>dsh web</code>, packaged as a double-clickable native app.',
      f1_title: "Zero setup",
      f1_desc: "Bundles the Node.js runtime and dsh CLI; no Node, npm, or CLI install required.",
      f2_title: "Native window",
      f2_desc: "Dock icon, menu bar, zoom (⌘/Ctrl +/−, ⌘/Ctrl 0), reload, and devtools.",
      f3_title: "System tray",
      f3_desc: "Closing the window hides to the tray instead of quitting; the backend keeps running.",
      f4_title: "Window-state memory",
      f4_desc: "Remembers window size and position across launches.",
      f5_title: "Self-healing backend",
      f5_desc: "Watches the dsh web process and restarts it automatically on crash.",
      f6_title: "Local-first",
      f6_desc: "Backend binds to 127.0.0.1 only; nothing is exposed, data stays local.",

      eyebrow_faq: "FAQ",
      faq_title: "Frequently asked",
      q1: "Do I need Node.js or npm?",
      a1: "No. The desktop app bundles the Node.js runtime and dsh CLI — install and go, nothing else to set up.",
      q2: "How is it different from the web version?",
      a2: "The UI is identical. The desktop app adds a native window, menu bar, system tray, window-state memory, and backend auto-restart — with no command-line setup.",
      q3: "Which platforms are supported?",
      a3: "Installers for macOS (Apple Silicon) and Windows (x64). Linux users can build from source — see the build guide.",
      q4: "macOS says \u201ccannot verify the developer\u201d?",
      a4: 'The app isn\u2019t signed with an Apple certificate, so remove its quarantine flag. Open Terminal (\u2318+Space \u2192 \u201cTerminal\u201d) and run <code>xattr -cr "/Applications/DeepSeek Harness.app"</code>. See the <a href="#macos-note">install note</a> above.',
      q5: "Does the app collect or upload my data?",
      a5: "No. The backend binds to 127.0.0.1 only, never exposes a port, and all data stays on your machine.",
      q6: "How do I update?",
      a6: "The app has built-in auto-update: menu bar \u2192 DeepSeek Harness \u2192 \u201cCheck for Updates\u2026\u201d downloads and installs the latest release.",

      footer_brand: "DeepSeek Harness Desktop",
      footer_desc:
        'Native desktop app for the dsh coding agent, built with Tauri v2. Powered by <a href="https://github.com/deepseek-ai/deepseek-harness" target="_blank" rel="noopener">DeepSeek Harness</a>.',
      footer_repo: "GitHub repo",
      footer_docs: "Docs",
      footer_copy: "DeepSeek Harness Desktop · Open source · MIT"
    }
  };

  /* ============================ 状态 ============================ */

  var currentLang = detectLang();
  var currentOs = detectOS();
  var currentAssets = null;
  var latestVersion = fallback ? fallback.version : "";
  var totalDownloads = null;

  /* ============================ 工具 ============================ */

  function t(key) {
    var s = T[currentLang] && T[currentLang][key];
    return s == null ? key : s;
  }

  function has(key) {
    return (
      T[currentLang] &&
      Object.prototype.hasOwnProperty.call(T[currentLang], key)
    );
  }

  function detectLang() {
    if (window.__DSH_INITIAL_LANG__ === "en" || window.__DSH_INITIAL_LANG__ === "zh") {
      return window.__DSH_INITIAL_LANG__;
    }
    var param;
    try {
      param = new URLSearchParams(window.location.search).get("lang");
    } catch (e) {
      param = null;
    }
    if (param === "en" || param === "zh") return param;

    var stored;
    try {
      stored = localStorage.getItem("dsh-lang");
    } catch (e) {
      stored = null;
    }
    if (stored === "en" || stored === "zh") return stored;

    var nav = (navigator.language || "en").toLowerCase();
    return nav.indexOf("zh") === 0 ? "zh" : "en";
  }

  function detectOS() {
    var ua = navigator.userAgent || "";
    var platform =
      (navigator.userAgentData && navigator.userAgentData.platform) ||
      navigator.platform ||
      "";
    var isIos = /iPhone|iPad|iPod/i.test(ua);

    if (/Mac/i.test(platform) && !isIos) return "mac";
    if (/Win/i.test(platform)) return "win";
    return "other";
  }

  function formatSize(bytes) {
    if (typeof bytes !== "number" || !isFinite(bytes) || bytes <= 0) return "";
    var mb = bytes / (1024 * 1024);
    if (mb >= 1024) return (mb / 1024).toFixed(1) + " GB";
    return (mb >= 100 ? Math.round(mb) : mb.toFixed(1)) + " MB";
  }

  function formatCount(n) {
    if (typeof n !== "number" || !isFinite(n) || n < 0) return "0";
    return n.toLocaleString();
  }

  function fill(str, obj) {
    return String(str).replace(/\{(\w+)\}/g, function (_, k) {
      return obj && obj[k] != null ? obj[k] : "";
    });
  }

  /* ============================ 下载数据 ============================ */

  function buildAssets(release) {
    var out = {};
    Object.keys(ASSET_SUFFIX).forEach(function (key) {
      out[key] = { url: "", size: null, sizeText: "", count: null };
    });

    if (release && Array.isArray(release.assets)) {
      release.assets.forEach(function (asset) {
        var name = asset.name || "";
        Object.keys(ASSET_SUFFIX).forEach(function (key) {
          if (name.indexOf(ASSET_SUFFIX[key]) !== -1) {
            out[key] = {
              url: asset.browser_download_url || "",
              size: asset.size,
              sizeText: formatSize(asset.size),
              count: asset.download_count
            };
          }
        });
      });
    }

    if (fallback) {
      Object.keys(out).forEach(function (key) {
        if (!out[key].url && fallback.assets[key]) {
          out[key] = {
            url: fallback.base + "/" + fallback.assets[key].file,
            size: fallback.assets[key].size,
            sizeText: formatSize(fallback.assets[key].size),
            count: null
          };
        }
      });
    }

    return out;
  }

  function btnSizeText(asset) {
    var parts = [];
    if (asset.sizeText) parts.push(asset.sizeText);
    if (asset.count != null) parts.push(fill(t("dl_count"), { n: formatCount(asset.count) }));
    return parts.join(" · ");
  }

  function applyAssets(assets) {
    var anchors = document.querySelectorAll("[data-asset]");
    anchors.forEach(function (a) {
      var key = a.getAttribute("data-asset");
      var asset = assets[key];
      if (!asset || !asset.url) return;
      a.href = asset.url;
    });

    var sizeEls = document.querySelectorAll("[data-size]");
    sizeEls.forEach(function (el) {
      var key = el.getAttribute("data-size");
      var asset = assets[key];
      if (!asset) return;
      var txt = btnSizeText(asset);
      if (txt) el.textContent = txt;
    });
  }

  /* ============================ 渲染 ============================ */

  function updateVersionText() {
    var el = document.getElementById("version-text");
    if (!el) return;
    var v = latestVersion ? "v" + latestVersion : "";
    el.textContent = v ? t("version_prefix") + " " + v : t("version_prefix");
  }

  function updateHero() {
    var btn = document.getElementById("hero-download");
    var label = document.getElementById("hero-download-label");
    var hint = document.getElementById("hero-os-hint");
    if (!btn || !label) return;

    var map = {
      mac: { key: "dmg", label: t("hero_dl_mac"), hint: t("hero_hint_mac") },
      win: { key: "exe", label: t("hero_dl_win"), hint: t("hero_hint_win") }
    };

    var cfg = map[currentOs];
    var asset = currentAssets && currentAssets[cfg && cfg.key];

    if (cfg && asset && asset.url) {
      btn.href = asset.url;
      label.textContent = cfg.label;
      if (hint) hint.textContent = cfg.hint;
    } else {
      btn.href = "#download";
      label.textContent = t("hero_dl_other");
      if (hint) hint.textContent = t("hero_hint_other");
    }
  }

  function renderDownloadStat() {
    var el = document.getElementById("download-stat");
    if (!el) return;
    if (totalDownloads == null) {
      el.classList.add("is-hidden");
      return;
    }
    el.textContent = fill(t("dl_total"), { n: formatCount(totalDownloads) });
    el.classList.remove("is-hidden");
  }

  function updateLangToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    btn.textContent = currentLang === "zh" ? "EN" : "中文";
    btn.setAttribute("aria-label", currentLang === "zh" ? "Switch to English" : "切换到中文");
  }

  function applyLang() {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
    document.title = t("meta_title");
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", t("meta_description"));

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!has(key)) return; // 缺失的 key 保留元素内默认文案，避免把 key 名显示出来
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      if (!has(key)) return;
      el.innerHTML = t(key);
    });

    var navToggle = document.getElementById("nav-toggle");
    if (navToggle) {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-label", open ? t("nav_close") : t("nav_open"));
    }

    updateVersionText();
    updateHero();
    if (currentAssets) applyAssets(currentAssets);
    renderDownloadStat();
    updateLangToggle();
  }

  function setLang(lang) {
    if (lang !== "zh" && lang !== "en") return;
    currentLang = lang;
    try {
      localStorage.setItem("dsh-lang", lang);
    } catch (e) {
      /* ignore */
    }
    applyLang();
  }

  /* ============================ 交互 ============================ */

  function initMobileNav() {
    var toggle = document.getElementById("nav-toggle");
    var nav = document.querySelector(".site-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? t("nav_close") : t("nav_open"));
    });

    nav.addEventListener("click", function (e) {
      if (e.target && e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", t("nav_open"));
      }
    });
  }

  function initCopyButtons() {
    var btn = document.getElementById("copy-gatekeeper");
    var cmd = document.getElementById("gatekeeper-cmd");
    if (!btn || !cmd) return;

    // 只复制命令本身：去掉首尾空白，避免误复制到标题等相邻文本
    var text = (cmd.textContent || "").trim();

    btn.addEventListener("click", function () {
      function done() {
        btn.textContent = t("copy_done");
        setTimeout(function () {
          btn.textContent = t("copy_btn");
        }, 2000);
      }

      // 回退方案：用隐藏 textarea 精确复制指定文本，而非依赖当前页面选区
      function legacyCopy() {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "0";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, ta.value.length);
        try {
          document.execCommand("copy");
        } catch (e) {
          /* ignore */
        }
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          // 剪贴板 API 失败时回退到 execCommand
          legacyCopy();
          done();
        });
      } else {
        legacyCopy();
        done();
      }
    });
  }

  function parseNextLink(header) {
    if (!header) return null;
    var m = header.match(/<([^>]+)>\s*;\s*rel="next"/);
    return m ? m[1] : null;
  }

  // 仅统计「安装包」下载，排除 latest.json / 更新器 .tar.gz 等非用户下载资产。
  function isInstallerAsset(name) {
    if (!name) return false;
    return Object.keys(ASSET_SUFFIX).some(function (key) {
      return name.indexOf(ASSET_SUFFIX[key]) !== -1;
    });
  }

  function fetchTotalDownloads(url) {
    url =
      url ||
      "https://api.github.com/repos/xingj404-lab/dsh-desktop/releases?per_page=100";

    return fetch(url, { headers: { Accept: "application/vnd.github+json" } }).then(
      function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        var next = parseNextLink(res.headers.get("Link"));
        return res.json().then(function (list) {
          var total = 0;
          (list || []).forEach(function (r) {
            (r.assets || []).forEach(function (a) {
              if (typeof a.download_count === "number" && isInstallerAsset(a.name)) {
                total += a.download_count;
              }
            });
          });
          if (next) {
            return fetchTotalDownloads(next).then(function (rest) {
              return total + rest;
            });
          }
          return total;
        });
      }
    );
  }

  /* ============================ 主流程 ============================ */

  function init() {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    initMobileNav();
    initCopyButtons();

    var langToggle = document.getElementById("lang-toggle");
    if (langToggle) {
      langToggle.addEventListener("click", function () {
        setLang(currentLang === "zh" ? "en" : "zh");
      });
    }

    // 先用兜底数据让按钮立即可用，再异步拉取最新版本覆盖。
    currentAssets = buildAssets(null);
    applyAssets(currentAssets);
    applyLang();
    document.documentElement.classList.remove("lang-pending");

    if (!window.fetch) return;

    fetch(API_URL, { headers: { Accept: "application/vnd.github+json" } })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (release) {
        if (release && release.tag_name) {
          latestVersion = release.tag_name.replace(/^v/, "");
        }
        currentAssets = buildAssets(release);
        applyAssets(currentAssets);
        applyLang();
      })
      .catch(function () {
        /* 保持兜底数据，不打断用户 */
      });

    fetchTotalDownloads()
      .then(function (total) {
        totalDownloads = total;
        renderDownloadStat();
      })
      .catch(function () {
        /* 拉取失败则隐藏累计下载量 */
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

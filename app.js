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
      nav_compare: "对比",
      nav_faq: "常见问题",
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
        "macOS 版本<strong>未使用 Apple 开发者证书签名</strong>，首次打开可能被 Gatekeeper 拦截。请任选其一：",
      callout_li1:
        "右键点击应用 → <strong>打开</strong> → 在弹出的对话框中再次点击 <strong>打开</strong>；或",
      callout_li2:
        '在「终端」执行：<code>xattr -cr "/Applications/DeepSeek Harness.app"</code>',
      download_foot:
        'Linux 用户或需要从源码构建？查看 <a href="https://github.com/xingj404-lab/dsh-desktop#-build-from-source" target="_blank" rel="noopener">构建指南</a>，或前往 <a href="https://github.com/xingj404-lab/dsh-desktop/releases/latest" target="_blank" rel="noopener">GitHub Releases</a> 查看全部安装包。',

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

      eyebrow_compare: "对比",
      compare_title: "桌面版 vs Web 版",
      compare_sub: "两者运行完全相同的界面，选择适合你的使用方式。",
      compare_col_web: "Web 版 <code>dsh web</code>",
      compare_col_desktop: "桌面版 <code>dsh-desktop</code>",
      r1_label: "启动方式",
      r1_web: "安装 Node + 全局安装 dsh，终端运行 <code>dsh web</code>",
      r1_desktop: "下载安装包，双击打开",
      r2_label: "运行位置",
      r2_web: "浏览器标签页",
      r2_desktop: "原生独立窗口",
      r3_label: "需要安装 Node/dsh",
      r3_web: "✅ 是",
      r3_desktop: "❌ 否（已内置）",
      r4_label: "菜单栏 / Dock 图标",
      r5_label: "系统托盘与后台运行",
      r6_label: "窗口大小 / 位置记忆",
      r7_label: "后端自动重启",
      r8_label: "底层界面",
      r8_cell: "完全一致",

      eyebrow_faq: "常见问题",
      faq_title: "你可能想问",
      q1: "需要安装 Node.js 或 npm 吗？",
      a1: "不需要。桌面版打包内置了 Node.js 运行时与 dsh CLI，下载安装即可使用，无需额外安装任何环境。",
      q2: "它和网页版 dsh web 有什么区别？",
      a2: "底层界面完全一致。桌面版额外提供原生窗口、菜单栏、系统托盘、窗口状态记忆与后端自动重启，并免去命令行安装步骤。",
      q3: "支持哪些平台？",
      a3: "目前提供 macOS（Apple Silicon）与 Windows（x64）的安装包。Linux 用户可从源码构建，参见构建指南。",
      q4: "macOS 提示「无法验证开发者」怎么办？",
      a4: '因为应用未使用 Apple 开发者证书签名。右键点击应用 →「打开」，或在终端执行 <code>xattr -cr "/Applications/DeepSeek Harness.app"</code>。',
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
      nav_compare: "Compare",
      nav_faq: "FAQ",
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
        "The macOS build is <strong>not signed with an Apple Developer certificate</strong>, so Gatekeeper may block the first launch. Choose either:",
      callout_li1:
        "Right-click the app → <strong>Open</strong> → <strong>Open</strong> again in the dialog, or",
      callout_li2:
        'In Terminal: <code>xattr -cr "/Applications/DeepSeek Harness.app"</code>',
      download_foot:
        'On Linux, or want to build from source? See the <a href="https://github.com/xingj404-lab/dsh-desktop#-build-from-source" target="_blank" rel="noopener">build guide</a> or visit <a href="https://github.com/xingj404-lab/dsh-desktop/releases/latest" target="_blank" rel="noopener">GitHub Releases</a> for all installers.',

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

      eyebrow_compare: "Compare",
      compare_title: "Desktop vs Web",
      compare_sub: "Both run exactly the same UI — choose the experience that fits you.",
      compare_col_web: "Web <code>dsh web</code>",
      compare_col_desktop: "Desktop <code>dsh-desktop</code>",
      r1_label: "How to start",
      r1_web: "Install Node + dsh, then run <code>dsh web</code>",
      r1_desktop: "Download and double-click",
      r2_label: "Where it runs",
      r2_web: "Any browser tab",
      r2_desktop: "Native standalone window",
      r3_label: "Requires Node/dsh",
      r3_web: "✅ yes",
      r3_desktop: "❌ no (bundled)",
      r4_label: "Menu bar / dock icon",
      r5_label: "System tray & background",
      r6_label: "Window size/position memory",
      r7_label: "Auto-restart backend",
      r8_label: "Underlying UI",
      r8_cell: "identical",

      eyebrow_faq: "FAQ",
      faq_title: "Frequently asked",
      q1: "Do I need Node.js or npm?",
      a1: "No. The desktop app bundles the Node.js runtime and dsh CLI — install and go, nothing else to set up.",
      q2: "How is it different from the web version?",
      a2: "The UI is identical. The desktop app adds a native window, menu bar, system tray, window-state memory, and backend auto-restart — with no command-line setup.",
      q3: "Which platforms are supported?",
      a3: "Installers for macOS (Apple Silicon) and Windows (x64). Linux users can build from source — see the build guide.",
      q4: "macOS says \u201ccannot verify the developer\u201d?",
      a4: 'The app isn\u2019t signed with an Apple certificate. Right-click \u2192 Open, or run <code>xattr -cr "/Applications/DeepSeek Harness.app"</code> in Terminal.',
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

  /* ============================ 工具 ============================ */

  function t(key) {
    var s = T[currentLang] && T[currentLang][key];
    return s == null ? key : s;
  }

  function detectLang() {
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

  /* ============================ 下载数据 ============================ */

  function buildAssets(release) {
    var out = {};
    Object.keys(ASSET_SUFFIX).forEach(function (key) {
      out[key] = { url: "", size: null, sizeText: "" };
    });

    if (release && Array.isArray(release.assets)) {
      release.assets.forEach(function (asset) {
        var name = asset.name || "";
        Object.keys(ASSET_SUFFIX).forEach(function (key) {
          if (name.indexOf(ASSET_SUFFIX[key]) !== -1) {
            out[key] = {
              url: asset.browser_download_url || "",
              size: asset.size,
              sizeText: formatSize(asset.size)
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
            sizeText: formatSize(fallback.assets[key].size)
          };
        }
      });
    }

    return out;
  }

  function applyAssets(assets) {
    var anchors = document.querySelectorAll("[data-asset]");
    anchors.forEach(function (a) {
      var key = a.getAttribute("data-asset");
      var asset = assets[key];
      if (!asset || !asset.url) return;
      a.href = asset.url;
      var sizeEl = a.querySelector("[data-size]");
      if (sizeEl && asset.sizeText) sizeEl.textContent = asset.sizeText;
    });

    var sizeEls = document.querySelectorAll("[data-size]");
    sizeEls.forEach(function (el) {
      var key = el.getAttribute("data-size");
      var asset = assets[key];
      if (asset && asset.sizeText) el.textContent = asset.sizeText;
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
      var val = t(key);
      if (val) el.textContent = val;
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var val = t(key);
      if (val) el.innerHTML = val;
    });

    var navToggle = document.getElementById("nav-toggle");
    if (navToggle) {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-label", open ? t("nav_close") : t("nav_open"));
    }

    updateVersionText();
    updateHero();
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

  /* ============================ 主流程 ============================ */

  function init() {
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());

    initMobileNav();

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
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();

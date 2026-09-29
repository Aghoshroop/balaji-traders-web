const http = require('http');
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

async function capture({ url, width = 1440, height = 900, isMobile = false, outputPath, delay = 1500, fullPage = false }) {
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  const userDataDir = path.join(__dirname, '..', '.tmp_chrome_snap_' + Date.now());
  const port = 9300 + Math.floor(Math.random() * 500);

  const chromeProc = spawn(chromePath, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${userDataDir}`,
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ], { stdio: 'ignore' });

  try {
    // Wait for Chrome CDP port to open
    let browserWsUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 200));
      try {
        const json = await new Promise((resolve, reject) => {
          const req = http.get(`http://127.0.0.1:${port}/json/version`, res => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
              try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
            });
          });
          req.on('error', reject);
        });
        if (json.webSocketDebuggerUrl) {
          browserWsUrl = json.webSocketDebuggerUrl;
          break;
        }
      } catch (e) {}
    }

    if (!browserWsUrl) throw new Error('Could not connect to Chrome CDP');

    // Connect to browser target to create page target
    const browserWs = new WebSocket(browserWsUrl);
    await new Promise((resolve, reject) => {
      browserWs.onopen = resolve;
      browserWs.onerror = reject;
    });

    let bId = 1;
    function sendBrowser(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = bId++;
        const handler = (evt) => {
          try {
            const data = JSON.parse(evt.data);
            if (data.id === id) {
              browserWs.removeEventListener('message', handler);
              if (data.error) reject(data.error);
              else resolve(data.result);
            }
          } catch (e) {
            reject(e);
          }
        };
        browserWs.addEventListener('message', handler);
        browserWs.send(JSON.stringify({ id, method, params }));
      });
    }

    const { targetId } = await sendBrowser('Target.createTarget', { url });
    browserWs.close();

    // Now connect to the specific target page
    const pageWsUrl = `ws://127.0.0.1:${port}/devtools/page/${targetId}`;
    const ws = new WebSocket(pageWsUrl);

    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });

    let msgId = 1;
    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        const handler = (evt) => {
          try {
            const data = JSON.parse(evt.data);
            if (data.id === id) {
              ws.removeEventListener('message', handler);
              if (data.error) reject(data.error);
              else resolve(data.result);
            }
          } catch (e) {
            reject(e);
          }
        };
        ws.addEventListener('message', handler);
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: isMobile
    });

    // Wait for page to finish rendering
    await new Promise(r => setTimeout(r, delay));

    let screenshotParams = { format: 'png' };
    if (fullPage) {
      const layoutMetrics = await send('Page.getLayoutMetrics');
      const contentHeight = Math.ceil(layoutMetrics.cssContentSize.height);
      screenshotParams = {
        format: 'png',
        captureBeyondViewport: true,
        clip: {
          x: 0,
          y: 0,
          width,
          height: contentHeight,
          scale: 1
        }
      };
    }

    const screenshot = await send('Page.captureScreenshot', screenshotParams);

    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, Buffer.from(screenshot.data, 'base64'));
    console.log(`Saved screenshot to ${outputPath}`);
    ws.close();
  } finally {
    try { chromeProc.kill(); } catch (e) {}
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (e) {}
  }
}

const args = process.argv.slice(2);
const url = args[0] || 'http://localhost:3000/';
const out = args[1] || 'screenshot.png';
const w = parseInt(args[2] || '1440', 10);
const h = parseInt(args[3] || '900', 10);
const isMob = args[4] === 'mobile';
const fullPage = args[5] === 'full';

capture({ url, width: w, height: h, isMobile: isMob, outputPath: path.resolve(out), fullPage })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

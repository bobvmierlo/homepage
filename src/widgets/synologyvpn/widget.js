import synologyProxyHandler from "../../utils/proxy/handlers/synology";

// Try other API endpoint
const widget = {
  // Variables to be filled at runtime
  api: "{url}/webapi/{cgiPath}?api={apiName}&version={maxVersion}&method={apiMethod}",
  proxyHandler: synologyProxyHandler,

  mappings: {
    vpnStatus: {
      apiName: "SYNO.Entry.Request",
      apiMethod: "request",
      endpoint: "vpnStatus",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: {
        api: "SYNO.Entry.Request",
        method: "request",
        version: 1,
        stopwhenerror: false,
        compound: JSON.stringify([
          {
            api: "SYNO.Core.Network.VPN.OpenVPNWithConf",
            method: "list",
            version: 1,
            additional: ["status"],
          },
        ]),
      },
    },
  },
};

export default widget;

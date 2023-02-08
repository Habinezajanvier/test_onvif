const onvif = require("node-onvif");

const username = "test";
const password = "test123456789";

const onvDevices = [
  {
    hardware: 'H4W2PER3',
    location: 'china',
    name: 'Honeywell',
    scopes: [
      'onvif://www.onvif.org/location/country/china',
      'onvif://www.onvif.org/name/Honeywell',
      'onvif://www.onvif.org/hardware/H4W2PER3',
      'onvif://www.onvif.org/Profile/Streaming',
      'onvif://www.onvif.org/type/Network_Video_Transmitter',
      'onvif://www.onvif.org/extension/unique_identifier',
      'onvif://www.onvif.org/extension/Honeywell_mask/37777',
      'onvif://www.onvif.org/MAC/00:40:84:f6:9e:2c',
      'onvif://www.onvif.org/Profile/Q/Operational',
    ],
    types: ['dn:NetworkVideoTransmitter', 'tds:Device'],
    urn: 'uuid:eaadf637-a191-4ae7-8156-07433934718b',
    xaddrs: ['http://192.168.1.103/onvif/device_service'],
  },
  {
    hardware: 'H4W2PER3',
    location: 'china',
    name: 'Honeywell',
    scopes: [
      'onvif://www.onvif.org/location/country/china',
      'onvif://www.onvif.org/name/Honeywell',
      'onvif://www.onvif.org/hardware/H4W2PER3',
      'onvif://www.onvif.org/Profile/Streaming',
      'onvif://www.onvif.org/type/Network_Video_Transmitter',
      'onvif://www.onvif.org/extension/unique_identifier',
      'onvif://www.onvif.org/extension/Honeywell_mask/37777',
      'onvif://www.onvif.org/MAC/00:40:84:f6:9e:c8',
      'onvif://www.onvif.org/Profile/Q/Operational',
    ],
    types: ['dn:NetworkVideoTransmitter', 'tds:Device'],
    urn: 'uuid:626d6410-d723-4dc8-a867-e843c0905dcb',
    xaddrs: ['http://192.168.1.2/onvif/device_service'],
  },
];

const testOnvif = async () => {
  try {
    // const onvDevices = await onvif.startProbe();

    console.log("==Discovered devices==>", JSON.stringify(onvDevices, null, 2));

    const res = await Promise.all(
      onvDevices.map(async (info) => {
        const device = new onvif.OnvifDevice({
          xaddr: info.xaddrs[0],
          user: username,
          pass: password,
        });

        await device.init();

        const url = device.getUdpStreamUrl();
        console.log("==udp link==>", url);
        return url;
      })
    );
    console.log("==response==>", res);
  } catch (error) {
    console.log("===onvif==>error", error);
  }
};

const url = "http://192.168.1.2:80/onvif/device_service";

fetch(url, {
  method: "POST",
  headers: {
    //'Content-Type': 'application/soap+xml; charset=utf-8; action="http://www.onvif.org/ver10/device/wsdl/GetScopes"',
    'Content-Type': 'application/soap+xml; charset=utf-8;',
    'Content-Length': Buffer.byteLength(soap)
  }
}).then((data)=>{
  console.log("data from fetch", data.json());
}).catch(error=>{
  console.log("==fetch error==>", error)
});

// testOnvif();

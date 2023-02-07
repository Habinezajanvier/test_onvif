const onvif = require("node-onvif");

const username = "nivetheni";
const password = "Chandrika5";

const testOnvif = async () => {
  try {
    const onvDevices = await onvif.startProbe();

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

// const device = new onvif.OnvifDevice({
//   xaddr: "http://192.168.1.2/onvif/device_service",
//   user: username,
//   pass: password,
// });

// device
//   .init()
//   .then((device_info) => {
//     const id = number - decrement;
//     decrement = decrement - 1;
//     const device_obj = {};
//     device_obj["device_id"] = id;
//     device_obj["location"] = {
//       latitude: "12.972442",
//       longitude: "77.580643",
//     };
//     device_obj["device_url"] = device.getUdpStreamUrl();
//     const device_obj_str = JSON.stringify(device_obj);
//     console.log({ device_obj_str });
//     // nc.publish("device.add.stream", Buffer.from(device_obj_str));
//   })
//   .catch((error) => {
//     console.error("===first onvif error===>", error);
//   });

testOnvif();

import { Provide, Init, Autoload, Config, Inject } from "@midwayjs/decorator"
import { createSocket, Socket, RemoteInfo } from "dgram"
import { Util } from "./util"
import { ParsePesiv } from "./parsePesiv"
import { Fetch } from "./fetch"
import { ioClientService } from "./ioClient"


enum typeEnum {
    heartBeat = 2,
    data = 1
}


@Provide()
@Autoload()
export class UdpServer {

    @Config("udp")
    config: { port: number }

    @Inject()
    Util: Util

    @Inject()
    ParsePesiv: ParsePesiv

    @Inject()
    Fetch: Fetch

    @Inject()
    ioClientService: ioClientService

    server: Socket
    cache: Map<string, RemoteInfo>


    @Init()
    async init() {

        this.cache = new Map()

        this.server = createSocket("udp4")
        this.server
            .on("listening", () => {
                console.log("udpServer listening " + this.server.address().address + ":" + this.server.address().port);
            })
            .on("error", () => {
                console.log('udp error');
            })
            .on("close", () => {
                console.log("udp close");
            })
            .on("message", (msg, info) => {
                // 数据实际长度必须等于头申明的长度
                if (msg.readInt16BE() === msg.length) {
                    const type = typeEnum[msg[2]]
                    const mac = msg.toString("hex", 3, 9)
                    const data = msg.slice(9, msg.length - 2)
                    // 判断数据类型
                    switch (type) {
                        // 心跳包
                        case "heartBeat":
                            {

                                if (!this.cache.has(mac)) {
                                    console.log(`${mac} connecting`);
                                    this.ioClientService.terminalOn(mac)
                                    this.Fetch.dtuInfo({ mac, ip: info.address, port: info.port })
                                }
                                this.cache.set(mac, info)

                            }
                            break

                        // 上传数据
                        case "data":
                            {
                                const d = data.slice(6)
                                const utf8 = d.toString()
                               /*
                               console.log({
                                    d, utf8
                                });

                                 if (info.address === "121.43.193.235") {
                                    console.log({
                                        msg
                                    });

                                } else {
                                    this.server.send(msg, 14197, "www.pesiv.com")
                                } */

                                if (d.length > 100) {
                                    const pesivArguments = this.ParsePesiv.getD()

                                    // 格式化pesiv卡上传的数据,转换成透传平台可以识别的格式
                                    const data = pesivArguments
                                        .map(obj => {
                                            return utf8.slice(obj.StartAddr, obj.StartAddr + obj.DeviceLength).replace(/#/g, '')
                                        })
                                        .join(" ")

                                    const { StartAddr, DeviceLength } = pesivArguments[pesivArguments.length - 1]
                                    const QWS = utf8.slice(StartAddr, StartAddr + DeviceLength).replace(/#/g, '')
                                    this.Fetch.queryData({
                                        mac,
                                        pid: 0,
                                        type: 232,
                                        protocol: 'Pesiv卡',
                                        content: "pesiv",
                                        mountDev: "peisv",
                                        Interval: 6e5,
                                        timeStamp: Date.now(),
                                        time: new Date().toString(),
                                        useBytes: 0,
                                        useTime: 6e5,
                                        contents: [
                                            {
                                                content: "pesiv",
                                                buffer: Buffer.from(data + "\r", "utf8").toJSON()
                                            },
                                            {
                                                content: "QWS",
                                                buffer: Buffer.from(QWS + "\r", "utf8").toJSON()
                                            }
                                        ]
                                    })
                                } else {
                                    this.server.emit(mac, d)
                                }
                            }
                            break
                    }

                }

            })


        this.server.bind(this.config.port)
    }


    /**
     *操作
     * @param mac 
     * @param on 
     * @returns 
     */
    async oprate(mac: string, oprate: string): Promise<Buffer | string> {

        const info = this.cache.get(mac)
        if (info) {
            // 00 12 01 28 55 9b ed f1 5e 01 05 00 cc 00 01 31 af f7
            const d = Buffer.from(`01${mac}010500${oprate}000131`, 'hex')
            const len = Buffer.allocUnsafe(2)
            len.writeInt16BE(d.length + 4)
            const data = Buffer.concat([len, d])
            const crc = this.Util.Crc16modbus(data)
            // console.log({ d, data, crc });
            return new Promise(resolve => {
                const out = setTimeout(() => {
                    this.server.emit(mac, '请求超时')
                }, 20000);
                this.server
                    .once(mac, (b: string | Buffer) => {
                        clearTimeout(out)
                        resolve(b)
                    })
                    .send(Buffer.from(crc, 'hex'), info.port, info.address)
            })

        } else {
            return '设备未上线'
        }
    }

}
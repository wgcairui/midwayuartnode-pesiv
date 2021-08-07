import { Provide, Init, Autoload, Scope, ScopeEnum, Config, Inject } from "@midwayjs/decorator"
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
@Scope(ScopeEnum.Singleton)
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

    /**
     * 缓存每个卡的连接信息
     */
    cache: Map<string, RemoteInfo>

    /**
    * 每个pesiv卡的数据
    */
    pesivData: Map<string, string>

    /**
     * 设备心跳时间戳
     */
    heartTimestamp: Map<string, number>

    @Init()
    async init() {

        this.cache = new Map()
        this.pesivData = new Map()
        this.heartTimestamp = new Map()

        setInterval(() => {
            this.checkHeart()
        }, 2e4)

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
                    const mac = msg.toString("hex", 3, 9).toLocaleUpperCase()
                    const data = msg.slice(9, msg.length - 2)
                    // 判断数据类型
                    switch (type) {
                        // 心跳包
                        case "heartBeat":
                            {
                                const address = this.cache.get(mac)
                                if (address) {
                                    const time = this.heartTimestamp.get(mac)
                                    if (!time) {
                                        this.ioClientService.terminalOn(mac)
                                    }

                                } else {
                                    console.log(`${mac} connecting in ${info.address}:${info.port}`);
                                    this.ioClientService.terminalOn(mac, false)
                                    this.Fetch.dtuInfo({ mac, ip: info.address, port: info.port })
                                }
                                this.heartTimestamp.set(mac, Date.now())
                                this.cache.set(mac, info)

                            }
                            break

                        // 上传数据
                        case "data":
                            {
                                const d = data.slice(6)
                                /* const utf8 = d.toString()

                                console.log({
                                    msg,
                                    data,
                                    rttype: data[1],
                                    datatype: data[3],
                                    d,
                                    utf8
                                }); */
                                /*
                                                                 if (info.address === "121.43.193.235") {
                                                                    console.log({
                                                                        msg
                                                                    });
                                
                                                                } else {
                                                                    this.server.send(msg, 14197, "www.pesiv.com")
                                                                } */
                                // 根据数据字段00 14 01 28 55 9b ed f1 5e 01 [[05]] 00 c8 00 03 41 43 4b af 37的值判断返回类型
                                // 0x03是运行数据
                                // 0x05是设置之后返回的ACK确认
                                switch (data[1]) {
                                    case 0x03:
                                        {
                                            // 根据数据字段00 14 01 28 55 9b ed f1 5e 01 05 00 [[c8]] 00 03 41 43 4b af 37的值判断返回类型
                                            // 0x00是所有运行数据,10min一次
                                            // 0x23是QMOD运行状态数据
                                            // 0xe8是QGS数据

                                            const pesivMap = this.ParsePesiv.getMap()
                                            const contents: Uart.IntructQueryResult[] = []

                                            switch (data[3]) {
                                                case 0x00:
                                                    {
                                                        this.pesivData.set(mac, d.toString())
                                                    }
                                                    break;

                                                case 0x23:
                                                    {
                                                        contents.push({
                                                            content: "QMOD",
                                                            buffer: Buffer.from(d.toString("utf8") + " \r", "utf8").toJSON()
                                                        })
                                                    }
                                                    break

                                                case 0xe8:
                                                    {
                                                        contents.push({
                                                            content: "QGS_B9TOB0",
                                                            buffer: Buffer.from(d.toString("utf8") + " \r", "utf8").toJSON()
                                                        })
                                                    }
                                                    break
                                            }

                                            const dataStr = this.pesivData.get(mac)
                                            if (dataStr) {
                                                const pesivArguments = this.ParsePesiv.getD()

                                                // 格式化pesiv卡上传的数据,转换成透传平台可以识别的格式
                                                const dataStrParse = pesivArguments
                                                    .map(obj => {
                                                        return dataStr.slice(obj.StartAddr, obj.StartAddr + obj.DeviceLength).replace(/#/g, '')
                                                    })
                                                    .join(" ")

                                                // 列出QWS参数
                                                const UPS_QWS = pesivMap.get("UPS_QWS")
                                                const QWS = dataStr.slice(UPS_QWS.StartAddr, UPS_QWS.StartAddr + UPS_QWS.DeviceLength).replace(/#/g, '')

                                                if (contents.findIndex(el => el.content === "QGS_B9TOB0") === -1) {
                                                    // 列出QGS状态
                                                    const UPS_QGS_B9TOB0 = pesivMap.get("UPS_QGS_B9TOB0")
                                                    const QGS = dataStr.slice(UPS_QGS_B9TOB0.StartAddr, UPS_QGS_B9TOB0.StartAddr + UPS_QGS_B9TOB0.DeviceLength).replace(/#/g, '')
                                                    contents.push(

                                                        {
                                                            content: "QGS_B9TOB0",
                                                            buffer: Buffer.from(QGS + " \r", "utf8").toJSON()
                                                        }
                                                    )
                                                }

                                                if (contents.findIndex(el => el.content === "QMOD") === -1) {
                                                    // 列出UPS工作状态
                                                    const UPS_QMOD = pesivMap.get("UPS_QMOD")
                                                    const QMOD = dataStr.slice(UPS_QMOD.StartAddr, UPS_QMOD.StartAddr + UPS_QMOD.DeviceLength).replace(/#/g, '')
                                                    contents.push(
                                                        {
                                                            content: "QMOD",
                                                            buffer: Buffer.from(QMOD + " \r", "utf8").toJSON()
                                                        },
                                                    )
                                                }

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
                                                            buffer: Buffer.from(dataStrParse + " \r", "utf8").toJSON()
                                                        },
                                                        {
                                                            content: "QWS",
                                                            buffer: Buffer.from(QWS + " \r", "utf8").toJSON()
                                                        },
                                                        ...contents
                                                    ]
                                                })
                                            }

                                        }
                                        break;

                                    case 0x05:
                                        this.server.emit(mac, d)
                                        break
                                }
                            }
                            break
                    }

                }

            })


        this.server.bind(this.config.port, "0.0.0.0")
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
            const d = Buffer.from(`01${mac.toLocaleLowerCase()}010500${oprate}000131`, 'hex')
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


    /**
     * 检查设备是否掉线
     */
    private checkHeart() {
        const now = Date.now()
        this.heartTimestamp.forEach((p, mac) => {
            if (now - p > 4e4) {
                this.heartTimestamp.delete(mac)
                this.ioClientService.terminalOff(mac)
                this.cache.delete(mac)
            }
        })
    }

}
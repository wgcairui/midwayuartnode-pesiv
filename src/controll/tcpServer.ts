import { Provide, Inject } from "@midwayjs/decorator"
import { TCPControll, OnConnection, Context, OnDisConnection, OnTCPMessage } from "@cairui/midway-tcpserver"
import { Cache } from "../service/cache"
import { TcpServerService } from "../service/tcpServer"
import { ioClientService } from "../service/ioClient"
import { Fetch } from "../service/fetch"

@Provide()
@TCPControll()
export class TcpControll {

    @Inject()
    Cache: Cache

    @Inject()
    ctx: Context

    @Inject()
    TcpServerService: TcpServerService

    @Inject()
    ioClientService: ioClientService

    @Inject()
    Fetch: Fetch


    @OnConnection()
    async connecting() {
        const socket = this.ctx
        if (!socket || !socket.remoteAddress || !socket.writable) return
        console.log(`${new Date().toLocaleString()}==新的socket连接,连接参数: ${socket.remoteAddress}:${socket.remotePort}`);

        const map = new Map<string, string>()
        let key = ''
        socket.on("data", (data: Buffer) => {
            const b = data.toString("utf-8")
            //console.log(b);

            // 判断是否是指令名称
            if (/^--DEBUG.*-- $/.test(b)) {
                key = b.slice(7, -3)
            } else {
                // 判断数据是否完整
                if (data[data.length - 1] === 13) {
                    // 判断是否有标头和非debug数据
                    if (key && !/^debug/i.test(b)) {
                        const val = b.split("\r")[0].replace(/^--DEBUG.*--/, '').trim()
                        map.set(key, val)
                        /* console.log({
                            key,
                            val
                        }); */
                        key = ''
                    }


                }
            }
        })

        // 配置socket参数
    }

    @OnDisConnection()
    async disconnecting(reason: string) {
        console.log({ reason });

    }

    @OnTCPMessage("data")
    async data(data: Buffer) {
        //console.log({ data:data.toString("utf8") });

    }

    @OnTCPMessage("error")
    async error(err: Error) {
        console.error(`socket error:${err.message}`);
        this.ctx.destroy()
    }

    @OnTCPMessage("timeout")
    async timeout() {
        console.log(`### timeout==${this.ctx.remoteAddress}:${this.ctx.remotePort}::${this.ctx.Property.mac}`);
    }

    @OnTCPMessage("close")
    close() {
        console.log(`### close==${this.ctx.remoteAddress}:${this.ctx.remotePort}::${this.ctx?.Property?.mac}`);
    }
}

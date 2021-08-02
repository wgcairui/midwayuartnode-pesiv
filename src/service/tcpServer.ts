import { Provide, App, Inject } from "@midwayjs/decorator"
import { Application } from "@cairui/midway-tcpserver"
import { AddressInfo } from "net"
import { Cache } from "./cache"
import { tool } from "./tool"
import { ioClientService } from "./ioClient"

@Provide()
export class TcpServerService {
    @App()
    private app: Application

    @Inject()
    Cache: Cache

    @Inject()
    tool: tool

    @Inject()
    ioClientService: ioClientService

    /**
   *  统计TCP连接数
   */
    getConnections() {
        return new Promise<number>((resolve) => {
            this.app.getConnections((err, nb) => {
                resolve(nb)
            })
        })
    }

    /**
     * 获取tcpServer监听信息
     * @returns 
     */
    getAddress() {
        return this.app.address() as AddressInfo
    }

    /**
     * 关闭TcpServer连接
     */
    async close() {
        this.Cache.socket.forEach(socket => {
            socket.destroy()
        })
        this.app.close()
        return await new Promise<void>(resolve => {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }

    async listen(port: number, hostname: string = '0.0.0.0') {
        await this.close()
        this.app.listen(port, hostname)
        console.log(`### tcpServer listening: ${hostname}:${port}`)
    }
}
import { Provide, Init, Scope, ScopeEnum } from "@midwayjs/decorator"
import { Context } from "@cairui/midway-tcpserver"
import { registerConfig } from "../interface"

type mac = string

@Provide()
@Scope(ScopeEnum.Singleton)
export class Cache {
    /**
     * 连接的所有客户端
     */
    socket: Map<mac, Context>
    /**
     * 服务器下发的配置
     */
    registerConfig: Partial<registerConfig>

    @Init()
    init() {
        this.socket = new Map()
        this.registerConfig = {}
    }
}
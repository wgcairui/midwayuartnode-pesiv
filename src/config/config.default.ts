import { ioConfig } from "@cairui/midway-io.client"
import { serverOptions } from "../interface"

export const io: ioConfig = {
    uri: "http://172.16.17.77:9010/node",
    opts: {
        path: "/client"
    }
}

export const server: serverOptions = {
    serverUrl: "https://uart.ladishb.com/api/node/"
}

export const udp = {
    port:14197
}
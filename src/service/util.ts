import { Provide } from "@midwayjs/decorator";
import { crc16modbus } from "crc";
import * as os from "os"

/**
 * 工具链
 */
@Provide()
export class Util {

    /**
   * 生成modbus16校验码
   * @param instruct 指令
   */
    Crc16modbus(buf: Buffer): string {
        const crc = crc16modbus(buf)
            .toString(16)
            .padStart(4, "0");
        const [a, b, c, d] = [...crc];
        return buf.toString('hex') + c + d + a + b;
    }

    /**
    * 使用于非标协议前置脚本,转换脚本为Function
    * @param fun 命令字符串
    */
    ParseFunction(fun: string) {
        const content = fun.replace(/(^function\(pid,instruct\)\{|\}$)/g, '')
        return new Function('pid', 'instruct', content)
    }

    /**
     * 适用于非标协议后置脚本
     * @param fun 
     */
    ParseFunctionEnd(fun: string) {
        const content = fun.replace(/(^function\(content,arr\)\{|\}$)/g, '')
        return new Function('content', 'arr', content)
    }

    /**
     * 转换参数值系数
     * @param fun 转换函数
     * @param val 待转换的值
     */
    ParseCoefficient(fun: string, val: number) {
        if (Number(fun)) return Number(fun) * val as number
        else {
            const args = fun.replace(/(^\(|\)$)/g, '').split(',')
            const Fun = new Function(args[0], `return ${args[1]}`)
            return Fun(val) as number
        }
    }

    /**
 * 序列化时间
 * @param time 
 */
    parseTime(time: string | number | Date = new Date()) {
        const date = new Date(time)
        const M = date.getMonth() + 1
        const d = date.getDate()
        const h = date.getHours()
        const m = date.getMinutes()
        const s = date.getSeconds()
        return `${M}-${d} ${h}:${m}:${s}`
    }

    /**
   * 
   * @param t 
   * @param c 
   * @param n 
   * @param b 
   */
    FillString(
        t: string | Buffer,
        c: string,
        n: number,
        b: boolean
    ): Buffer | string {
        if (t === "" || c.length !== 1 || n <= t.length) return t;
        for (let i = 0; i < n - t.length; i++) {
            if (b === true) t = c + t;
            else t += c;
        }
        return t;
    }

    /**
   * 16进制转单精度浮点数
   * @param t 
   */
    HexToSingle(t = Buffer.from([0, 0, 0, 0])): number {
        if (t.byteLength !== 4) return 0;
        let t1: string = parseInt(t.toString("hex"), 16).toString(2);
        let t2 = <string>this.FillString(t1, "0", 32, true);
        const s = t2.substring(0, 1);
        let e = t2.substring(1, 9);
        let m = t2.substring(9);
        let e1 = parseInt(e, 2) - 127;
        m = "1" + m;
        if (e1 >= 0) {
            m = m.substr(0, e1 + 1) + "." + m.substring(e1 + 1);
        } else {
            m = "0." + this.FillString(m, "0", m.length - e1 - 1, true);
        }
        if (!m.includes(".")) m = m + ".0";

        const a = m.split(".");
        const mi = parseInt(a[0], 2);
        let mf = 0;
        for (let i = 0; i < a[1].length; i++) {
            mf += parseFloat(a[1].charAt(i)) * 2 ** -(i + 1);
        }
        let m1 = mi + mf;
        if (parseInt(s) === 1) m1 = 0 - m1;

        return Number.parseFloat(m1.toFixed(2));
    }
    /**
     * 单精度浮点数转Hex
     * @param t 
     */
    SingleToHex(t: number = 0) {
        if (t === 0) return "00000000";
        let s: number, e: number, m: string;
        if (t > 0) s = 0;
        else {
            s = 1;
            t = 0 - t;
        }
        m = t.toString(2);
        if (parseInt(m) >= 1) {
            if (!m.includes(".")) m = m + ".0";
            e = m.indexOf(".") - 1;
        } else e = 1 - m.indexOf("1");

        if (e >= 0) m = m.replace(".", "");
        else m = m.substring(m.indexOf("1"));

        if (m.length > 24) m = m.substr(0, 24);
        else m = <string>this.FillString(m, "0", 24, false);

        m = m.substring(1);
        let e1 = (e + 127).toString(2);
        let e2 = <string>this.FillString(e1, "0", 8, true);
        let r = parseInt(s + e2 + m, 2).toString(16);
        let r1 = <string>this.FillString(r, "0", 8, true);
        return Buffer.from(r1, "hex");
    }
    /**
     * 整数转高低字节
     * @param str 
     */
    Value2BytesInt16(str: number = 0) {
        const arr: number[] = [];
        // 创建一个空buffer，
        const buffer = Buffer.alloc(2);
        // 写入一个有符号的 16 位整数值，可以是负数
        buffer.writeInt16BE(str, 0);
        // 转换为高低字节，封装为字节数组
        buffer.forEach((el) => arr.push(el));
        return arr;
    }
    /**
     * Buffer转单精度浮点数
     * @param buffer 
     * @param start 
     */
    BufferToFlot(buffer: Buffer, start: number) {
        // buffer转换为字符串,截取4位值
        const buf = buffer.toString('hex', start, 4)
        //16进制转2进制
        const bit16 = parseInt(buf, 16)
        const bit2 = bit16.toString(2)
        //slice表示数组的截取，并转化为十进制数
        const bit10 = parseInt(bit2.slice(0, 8), 2)
        //获得尾数
        const M2 = bit2.slice(8, 64)
        //将二进制的尾数转化为十进制的小数
        let M10 = 0.00
        for (let i = 0; i < M2.length; i++) {
            M10 = M10 + (M2 as any)[i] * Math.pow(2, (-1) * (i + 1))
        }
        //最后利用公式转化为十进制
        const value = Math.pow(2, bit10 - 127) * (1 + M10)
        // 保留小数点后一位
        return parseInt(value.toFixed(1))
    }
    // 混淆号码
    Mixtel(tel?: number) {
        return tel ? String(tel).split("").map((el, index) => {
            if (index > 2 && index < 8) el = "*"
            return el
        }).join("") : ''
    }

    /**
   * 正则匹配经纬度
   * @param location 经纬度
   * @param reserver 是否反转经纬
   */
    RegexLocation(location: string, reserver: boolean = false) {
        const str = reserver ? location.split(',').reverse().join(',') : location
        return /^-?1[0-8][0-9]\.[0-9]{6,7}\,-?[0-9]{2}\.[0-9]{6,7}$/.test(str)
    }
    /**
     * 正则匹配ip
     * @param ip 
     */
    RegexIP(ip: string) {
        return /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(ip)
    }
    /**
     * 正则匹配dtu通讯参数
     * @param uart 
     */
    RegexUart(uart: string) {
        return /^([0-9]{4}|[0-9]{5})\,[0-9]\,[0-9]\,.*/.test(uart)
    }
    /**
     * 正则匹配ICCID
     * @param ICCID 
     */
    RegexICCID(ICCID: string) {
        return /[0-9]{18,22}/.test(ICCID)
    }

    /**
     * 正则匹配手机号码
     * @param tel 
     */
    RegexTel(tel: string) {
        return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(tel)
    }

    /**
     * 正则匹配邮箱账号
     * @param mail 
     */
    RegexMail(mail: string) {
        return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(mail)
    }

    /**
   * 获取服务器运行状态
   */
    NodeInfo(): Uart.nodeInfo {
        const hostname: string = os.hostname();
        const totalmem: number = os.totalmem() / 1024 / 1024 / 1024;
        const freemem: number = (os.freemem() / os.totalmem()) * 100;
        const loadavg: number[] = os.loadavg();
        const type: string = os.type();
        const uptime: number = os.uptime() / 60 / 60;

        return {
            hostname,
            totalmem: totalmem.toFixed(1) + "GB",
            freemem: freemem.toFixed(1) + "%",
            loadavg: loadavg.map(el => parseFloat(el.toFixed(1))),
            type,
            uptime: uptime.toFixed(0) + "h",
            version: os.version(),
            usecpu: parseFloat(loadavg[2].toFixed(2)),
            usemen: 100 - parseFloat(freemem.toFixed(2))
        };
    }

}
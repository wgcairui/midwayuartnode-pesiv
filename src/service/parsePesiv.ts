import { Provide, Init } from "@midwayjs/decorator"

type DefineName = "UPS_BRAND" | "UPS_QPI" | "UPS_QMD_WW" | "UPS_QMD_KK" | "UPS_QMD_PP" | "UPS_QMD_MM" | "UPS_QMD_NN" | "UPS_QMD_RR" | "UPS_QMOD" | "UPS_QGS_MM" | "UPS_QGS_HH" | "UPS_QGS_LL" | "UPS_QGS_NN" | "UPS_QGS_DD" | "UPS_QGS_SS" | "UPS_QGS_XX" | "UPS_QGS_TT" | "UPS_QBV_TT" | "UPS_QRI_QQ" | "UPS_QRI_RR" | "UPS_31_Q3PV_RR" | "UPS_31_Q3PV_SS" | "UPS_31_Q3PV_TT" | "UPS_31_Q3PV_AA" | "UPS_31_Q3PV_BB" | "UPS_31_Q3PV_CC" | "UPS_TYPE33_Q3OV_RR" | "UPS_TYPE33_Q3OV_SS" | "UPS_TYPE33_Q3OV_TT" | "UPS_TYPE33_Q3OV_AA" | "UPS_TYPE33_Q3OV_BB" | "UPS_TYPE33_Q3OV_CC" | "UPS_TYPE33_Q3OC_RR" | "UPS_TYPE33_Q3OC_SS" | "UPS_TYPE33_Q3OC_TT" | "UPS_TYPE33_Q3LD_RR" | "UPS_TYPE33_Q3LD_SS" | "UPS_TYPE33_Q3LD_TT" | "UPS_TYPE33_Q3LD_AA" | "UPS_TYPE33_QTPR_RR" | "UPS_TYPE33_QTPR_SS" | "UPS_TYPE33_QTPR_HH" | "UPS_TYPE33_QTPR_LL" | "UPS_QBV_ALL_CC" | "UPS_RECEIVE_STATE" | "UPS_SON" | "UPS_SOFF" | "UPS_BON" | "UPS_BOFF" | "UPS_CT" | "UPS_CS" | "UPS_T" | "UPS_TL" | "UPS_TN" | "UPS_SMOKE_ALARM0" | "UPS_BADGE" | "UPS_QGS_B9TOB0" | "UPS_QFS_KK" | "UPS_QFS_PP" | "UPS_QFS_FF" | "UPS_QFS_OO" | "UPS_QFS_EE" | "UPS_QFS_LL" | "UPS_QFS_CC" | "UPS_QFS_HH" | "UPS_QFS_NN" | "UPS_QFS_BB" | "UPS_QFS_TT" | "UPS_QFS_B7TOB0" | "UPS_QWS"
type DeviceContent = "品牌" | "型号" | "容量" | "功率因素" | "相位" | "额定输入电压" | "额定输出电压" | "电池数量" | "UPS状态" | "输入电压" | "输入频率" | "输出电压" | "输出频率" | "输出电流" | "正电池电压" | "负电池电压" | "温度" | "电池剩余" | "额定电流" | "额定频率" | "输入R" | "输入S" | "输入T" | "输入RS" | "输入RT" | "输入ST" | "输出R" | "输出S" | "输出T" | "输出RS" | "输出RT" | "输出ST" | "输出R相电流" | "输出S相电流" | "输出T相电流" | "输出R相负载" | "输出S相负载" | "输出T相负载" | "输出总负载" | "温度查询" | "温度2查询" | "温度3查询" | "温度4查询" | "电池剩余百分比" | "设置返回状态" | "开机" | "关机" | "蜂鸣器开" | "蜂鸣器关" | "取消所有测试计划命令" | "取消关机命令" | "电池放电10秒测试" | "电池深度放电测试" | "电池放电N时间测试" | "烟雾报警1（正常为1，异常为0）" | "门禁（正常为1，异常为0）" | "" | string
type FieldName = "Brand" | "DevType" | "Volume" | "Power" | "PhasePosition" | "SpecifyInputVoltage" | "SpecifyOutputVoltage" | "BatteryNum" | "UpsState" | "InputVoltage" | "InputHz" | "OutputVoltage" | "OutputHz" | "OutputElectricity" | "BatteryVoltagePlus" | "BatteryVoltageMinus" | "Temperature" | "BatteryLevel" | "SpecifyElectricity" | "SpecifyHz" | "InputR" | "InputS" | "InputT" | "InputRS" | "InputRT" | "InputST" | "OutputR" | "OutputS" | "OutputT" | "OutputRS" | "OutputRT" | "OutputST" | "OutputRElectricity" | "OutputSElectricity" | "OutputTElectricity" | "OutputRLoad" | "OutputSLoad" | "OutputTLoad" | "OutputLoad" | "TQuery" | "T2Query" | "T3Query" | "T4Query" | "QBV_CC" | ""
interface pesiv {
    /**
     * 参数
     */
    DefineName: DefineName
    /**
     * 开始位置
     */
    StartAddr: number
    /**
     * 长度
     */
    DeviceLength: number
    /**
     * 别名
     */
    DeviceContent: DeviceContent 
    /**
     * 别名
     */
    FieldName: FieldName
    /**
     * 值
     */
    FieldValue?: string
    /**
     * unit
     */
    unit: string

}

@Provide()
export class ParsePesiv {

    private oprate: Pick<pesiv, "DefineName" | "DeviceContent" | "DeviceLength" | "StartAddr" | "FieldName">[]

    @Init()
    init() {
        this.oprate = [
            {
                DefineName: "UPS_SON",
                StartAddr: 203,
                DeviceLength: 1,
                DeviceContent: "开机",
                FieldName: ""
            },
            {
                DefineName: "UPS_SOFF",
                StartAddr: 204,
                DeviceLength: 1,
                DeviceContent: "关机",
                FieldName: ""
            },
            {
                DefineName: "UPS_BON",
                StartAddr: 205,
                DeviceLength: 1,
                DeviceContent: "蜂鸣器开",
                FieldName: ""
            },
            {
                DefineName: "UPS_BOFF",
                StartAddr: 206,
                DeviceLength: 1,
                DeviceContent: "蜂鸣器关",
                FieldName: ''
            },
            {
                DefineName: "UPS_CT",
                StartAddr: 207,
                DeviceLength: 1,
                DeviceContent: "取消所有测试计划命令",
                FieldName: ''
            },
            {
                DefineName: "UPS_CS",
                StartAddr: 208,
                DeviceLength: 1,
                DeviceContent: "取消关机命令",
                FieldName: ''
            },
            {
                DefineName: "UPS_T",
                StartAddr: 209,
                DeviceLength: 1,
                DeviceContent: "电池放电10秒测试",
                FieldName: ""
            },
            {
                DefineName: "UPS_TL",
                StartAddr: 210,
                DeviceLength: 1,
                DeviceContent: "电池深度放电测试",
                FieldName: ""
            },
            {
                DefineName: "UPS_TN",
                StartAddr: 211,
                DeviceLength: 1,
                DeviceContent: "电池放电N时间测试",
                FieldName: ''
            }
        ]
    }

    getOprate() {
        return this.oprate
    }

    getD(): pesiv[] {
        return [
            {
                DefineName: "UPS_BRAND",
                StartAddr: 0,
                DeviceLength: 10,
                DeviceContent: "品牌",
                FieldName: "Brand",
                unit: ""
            },
            {
                DefineName: "UPS_QPI",
                StartAddr: 10,
                DeviceLength: 4,
                DeviceContent: "型号",
                FieldName: "DevType",
                unit: ""
            },
            {
                DefineName: "UPS_QMD_WW",
                StartAddr: 14,
                DeviceLength: 7,
                DeviceContent: "容量",
                FieldName: "Volume",
                unit: ""
            },
            {
                DefineName: "UPS_QMD_KK",
                StartAddr: 21,
                DeviceLength: 3,
                DeviceContent: "功率因素",
                FieldName: "Power",
                unit: ""
            },
            {
                DefineName: "UPS_QMD_PP",
                StartAddr: 24,
                DeviceLength: 3,
                DeviceContent: "相位",
                FieldName: "PhasePosition",
                unit: ""
            },
            {
                DefineName: "UPS_QMD_MM",
                StartAddr: 27,
                DeviceLength: 3,
                DeviceContent: "额定输入电压",
                FieldName: "SpecifyInputVoltage",
                unit: "V"
            },
            {
                DefineName: "UPS_QMD_NN",
                StartAddr: 30,
                DeviceLength: 3,
                DeviceContent: "额定输出电压",
                FieldName: "SpecifyOutputVoltage",
                unit: "V"
            },
            {
                DefineName: "UPS_QMD_RR",
                StartAddr: 33,
                DeviceLength: 2,
                DeviceContent: "电池数量",
                FieldName: "BatteryNum",
                unit: ""
            },
            {
                DefineName: "UPS_QMOD",
                StartAddr: 35,
                DeviceLength: 1,
                DeviceContent: "UPS状态",
                FieldName: "UpsState",
                unit: "{P:通电模式,S:待机模式,Y:旁路模式,L:在线模式,B:电池模式,T:电池测试模式,F:故障模式,E:ECO节能模式,C:恒频模式,D:关机模式}"
            },
            {
                DefineName: "UPS_QGS_MM",
                StartAddr: 36,
                DeviceLength: 5,
                DeviceContent: "输入电压",
                FieldName: "InputVoltage",
                unit: "V"
            },
            {
                DefineName: "UPS_QGS_HH",
                StartAddr: 41,
                DeviceLength: 4,
                DeviceContent: "输入频率",
                FieldName: "InputHz",
                unit: "Hz"
            },
            {
                DefineName: "UPS_QGS_LL",
                StartAddr: 45,
                DeviceLength: 5,
                DeviceContent: "输出电压",
                FieldName: "OutputVoltage",
                unit: "V"
            },
            {
                DefineName: "UPS_QGS_NN",
                StartAddr: 50,
                DeviceLength: 4,
                DeviceContent: "输出频率",
                FieldName: "OutputHz",
                unit: "Hz"
            },
            {
                DefineName: "UPS_QGS_DD",
                StartAddr: 54,
                DeviceLength: 5,
                DeviceContent: "输出电流",
                FieldName: "OutputElectricity",
                unit: "A"
            },
            {
                DefineName: "UPS_QGS_SS",
                StartAddr: 59,
                DeviceLength: 5,
                DeviceContent: "正电池电压",
                FieldName: "BatteryVoltagePlus",
                unit: "V"
            },
            {
                DefineName: "UPS_QGS_XX",
                StartAddr: 64,
                DeviceLength: 5,
                DeviceContent: "负电池电压",
                FieldName: "BatteryVoltageMinus",
                unit: "V"
            },
            {
                DefineName: "UPS_QGS_TT",
                StartAddr: 69,
                DeviceLength: 5,
                DeviceContent: "温度",
                FieldName: "Temperature",
                unit: "C"
            },
            {
                DefineName: "UPS_QBV_TT",
                StartAddr: 74,
                DeviceLength: 4,
                DeviceContent: "电池剩余",
                FieldName: "BatteryLevel",
                unit: ""
            },
            {
                DefineName: "UPS_QRI_QQ",
                StartAddr: 78,
                DeviceLength: 3,
                DeviceContent: "额定电流",
                FieldName: "SpecifyElectricity",
                unit: "A"
            },
            {
                DefineName: "UPS_QRI_RR",
                StartAddr: 81,
                DeviceLength: 4,
                DeviceContent: "额定频率",
                FieldName: "SpecifyHz",
                unit: "Hz"
            },
            {
                DefineName: "UPS_31_Q3PV_RR",
                StartAddr: 85,
                DeviceLength: 5,
                DeviceContent: "输入R",
                FieldName: "InputR",
                unit: "V"
            },
            {
                DefineName: "UPS_31_Q3PV_SS",
                StartAddr: 90,
                DeviceLength: 5,
                DeviceContent: "输入S",
                FieldName: "InputS",
                unit: "V"
            },
            {
                DefineName: "UPS_31_Q3PV_TT",
                StartAddr: 95,
                DeviceLength: 5,
                DeviceContent: "输入T",
                FieldName: "InputT",
                unit: "V"
            },
            {
                DefineName: "UPS_31_Q3PV_AA",
                StartAddr: 100,
                DeviceLength: 5,
                DeviceContent: "输入RS",
                FieldName: "InputRS",
                unit: "V"
            },
            {
                DefineName: "UPS_31_Q3PV_BB",
                StartAddr: 105,
                DeviceLength: 5,
                DeviceContent: "输入RT",
                FieldName: "InputRT",
                unit: "V"
            },
            {
                DefineName: "UPS_31_Q3PV_CC",
                StartAddr: 110,
                DeviceLength: 5,
                DeviceContent: "输入ST",
                FieldName: "InputST",
                unit: "V"
            },
            {
                DefineName: "UPS_TYPE33_Q3OV_RR",
                StartAddr: 115,
                DeviceLength: 5,
                DeviceContent: "输出R",
                FieldName: "OutputR",
                unit: "V"
            },
            {
                DefineName: "UPS_TYPE33_Q3OV_SS",
                StartAddr: 120,
                DeviceLength: 5,
                DeviceContent: "输出S",
                FieldName: "OutputS",
                unit: "V"
            },
            {
                DefineName: "UPS_TYPE33_Q3OV_TT",
                StartAddr: 125,
                DeviceLength: 5,
                DeviceContent: "输出T",
                FieldName: "OutputT",
                unit: "V"
            },
            {
                DefineName: "UPS_TYPE33_Q3OV_AA",
                StartAddr: 130,
                DeviceLength: 5,
                DeviceContent: "输出RS",
                FieldName: "OutputRS",
                unit: "V"
            },
            {
                DefineName: "UPS_TYPE33_Q3OV_BB",
                StartAddr: 135,
                DeviceLength: 5,
                DeviceContent: "输出RT",
                FieldName: "OutputRT",
                unit: "V"
            },
            {
                DefineName: "UPS_TYPE33_Q3OV_CC",
                StartAddr: 140,
                DeviceLength: 5,
                DeviceContent: "输出ST",
                FieldName: "OutputST",
                unit: "V"
            },
            {
                DefineName: "UPS_TYPE33_Q3OC_RR",
                StartAddr: 145,
                DeviceLength: 6,
                DeviceContent: "输出R相电流",
                FieldName: "OutputRElectricity",
                unit: "A"
            },
            {
                DefineName: "UPS_TYPE33_Q3OC_SS",
                StartAddr: 151,
                DeviceLength: 6,
                DeviceContent: "输出S相电流",
                FieldName: "OutputSElectricity",
                unit: "A"
            },
            {
                DefineName: "UPS_TYPE33_Q3OC_TT",
                StartAddr: 157,
                DeviceLength: 6,
                DeviceContent: "输出T相电流",
                FieldName: "OutputTElectricity",
                unit: "A"
            },
            {
                DefineName: "UPS_TYPE33_Q3LD_RR",
                StartAddr: 163,
                DeviceLength: 3,
                DeviceContent: "输出R相负载",
                FieldName: "OutputRLoad",
                unit: "%"
            },
            {
                DefineName: "UPS_TYPE33_Q3LD_SS",
                StartAddr: 166,
                DeviceLength: 3,
                DeviceContent: "输出S相负载",
                FieldName: "OutputSLoad",
                unit: "%"
            },
            {
                DefineName: "UPS_TYPE33_Q3LD_TT",
                StartAddr: 169,
                DeviceLength: 3,
                DeviceContent: "输出T相负载",
                FieldName: "OutputTLoad",
                unit: "%"
            },
            {
                DefineName: "UPS_TYPE33_Q3LD_AA",
                StartAddr: 172,
                DeviceLength: 3,
                DeviceContent: "输出总负载",
                FieldName: "OutputLoad",
                unit: "%"
            },
            {
                DefineName: "UPS_TYPE33_QTPR_RR",
                StartAddr: 175,
                DeviceLength: 5,
                DeviceContent: "温度查询",
                FieldName: "TQuery",
                unit: "C"
            },
            {
                DefineName: "UPS_TYPE33_QTPR_SS",
                StartAddr: 180,
                DeviceLength: 5,
                DeviceContent: "温度2查询",
                FieldName: "T2Query",
                unit: "C"
            },
            {
                DefineName: "UPS_TYPE33_QTPR_HH",
                StartAddr: 185,
                DeviceLength: 5,
                DeviceContent: "温度3查询",
                FieldName: "T3Query",
                unit: "C"
            },
            {
                DefineName: "UPS_TYPE33_QTPR_LL",
                StartAddr: 190,
                DeviceLength: 5,
                DeviceContent: "温度4查询",
                FieldName: "T4Query",
                unit: "C"
            },
            {
                DefineName: "UPS_QBV_ALL_CC",
                StartAddr: 195,
                DeviceLength: 3,
                DeviceContent: "电池剩余百分比",
                FieldName: "QBV_CC",
                unit: "%"
            },
            {
                DefineName: "UPS_RECEIVE_STATE",
                StartAddr: 200,
                DeviceLength: 3,
                DeviceContent: "设置返回状态",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QGS_B9TOB0",
                StartAddr: 232,
                DeviceLength: 12,
                DeviceContent: "QGS_B9TOB0",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_KK",
                StartAddr: 244,
                DeviceLength: 2,
                DeviceContent: "QFS_KK",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_PP",
                StartAddr: 246,
                DeviceLength: 5,
                DeviceContent: "QFS_PP",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_FF",
                StartAddr: 251,
                DeviceLength: 4,
                DeviceContent: "QFS_FF",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_OO",
                StartAddr: 255,
                DeviceLength: 5,
                DeviceContent: "QFS_OO",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_EE",
                StartAddr: 260,
                DeviceLength: 4,
                DeviceContent: "QFS_EE",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_LL",
                StartAddr: 264,
                DeviceLength: 3,
                DeviceContent: "QFS_LL",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_CC",
                StartAddr: 267,
                DeviceLength: 5,
                DeviceContent: "QFS_CC",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_HH",
                StartAddr: 272,
                DeviceLength: 5,
                DeviceContent: "QFS_HH",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_NN",
                StartAddr: 277,
                DeviceLength: 5,
                DeviceContent: "QFS_NN",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_BB",
                StartAddr: 282,
                DeviceLength: 5,
                DeviceContent: "QFS_BB",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_TT",
                StartAddr: 287,
                DeviceLength: 5,
                DeviceContent: "QFS_TT",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QFS_B7TOB0",
                StartAddr: 292,
                DeviceLength: 8,
                DeviceContent: "QFS_B7TOB0",
                FieldName: "",
                unit: ""
            },
            {
                DefineName: "UPS_QWS",
                StartAddr: 300,
                DeviceLength: 72,
                DeviceContent: "QWS",
                FieldName: "",
                unit: ""
            }
        ]
    }
}
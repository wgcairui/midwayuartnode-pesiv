const d = [
    {
        DefineName: "UPS_BRAND",
        StartAddr: 0,
        DeviceLength: 10,
        DeviceContent: "品牌",
        FieldName: "Brand"
    },
    {
        DefineName: "UPS_QPI",
        StartAddr: 10,
        DeviceLength: 4,
        DeviceContent: "型号",
        FieldName: "DevType"
    },
    {
        DefineName: "UPS_QMD_WW",
        StartAddr: 14,
        DeviceLength: 7,
        DeviceContent: "容量",
        FieldName: "Volume"
    },
    {
        DefineName: "UPS_QMD_KK",
        StartAddr: 21,
        DeviceLength: 3,
        DeviceContent: "功率因素",
        FieldName: "Power"
    },
    {
        DefineName: "UPS_QMD_PP",
        StartAddr: 24,
        DeviceLength: 3,
        DeviceContent: "相位",
        FieldName: "PhasePosition",
    },
    {
        DefineName: "UPS_QMD_MM",
        StartAddr: 27,
        DeviceLength: 3,
        DeviceContent: "额定输入电压",
        FieldName: "SpecifyInputVoltage"
    },
    {
        DefineName: "UPS_QMD_NN",
        StartAddr: 30,
        DeviceLength: 3,
        DeviceContent: "额定输出电压",
        FieldName: "SpecifyOutputVoltage"
    },
    {
        DefineName: "UPS_QMD_RR",
        StartAddr: 33,
        DeviceLength: 2,
        DeviceContent: "电池数量",
        FieldName: "BatteryNum"
    },
    {
        DefineName: "UPS_QMOD",
        StartAddr: 35,
        DeviceLength: 1,
        DeviceContent: "UPS状态",
        FieldName: "UpsState"
    },
    {
        DefineName: "UPS_QGS_MM",
        StartAddr: 36,
        DeviceLength: 5,
        DeviceContent: "输入电压",
        FieldName: "InputVoltage"
    },
    {
        DefineName: "UPS_QGS_HH",
        StartAddr: 41,
        DeviceLength: 4,
        DeviceContent: "输入频率",
        FieldName: "InputHz"
    },
    {
        DefineName: "UPS_QGS_LL",
        StartAddr: 45,
        DeviceLength: 5,
        DeviceContent: "输出电压",
        FieldName: "OutputVoltage"
    },
    {
        DefineName: "UPS_QGS_NN",
        StartAddr: 50,
        DeviceLength: 4,
        DeviceContent: "输出频率",
        FieldName: "OutputHz"
    },
    {
        DefineName: "UPS_QGS_DD",
        StartAddr: 54,
        DeviceLength: 5,
        DeviceContent: "输出电流",
        FieldName: "OutputElectricity"
    },
    {
        DefineName: "UPS_QGS_SS",
        StartAddr: 59,
        DeviceLength: 5,
        DeviceContent: "正电池电压",
        FieldName: "BatteryVoltagePlus"
    },
    {
        DefineName: "UPS_QGS_XX",
        StartAddr: 64,
        DeviceLength: 5,
        DeviceContent: "负电池电压",
        FieldName: "BatteryVoltageMinus"
    },
    {
        DefineName: "UPS_QGS_TT",
        StartAddr: 69,
        DeviceLength: 5,
        DeviceContent: "温度",
        FieldName: "Temperature"
    },
    {
        DefineName: "UPS_QBV_TT",
        StartAddr: 74,
        DeviceLength: 4,
        DeviceContent: "电池剩余",
        FieldName: "BatteryLevel"
    },
    {
        DefineName: "UPS_QRI_QQ",
        StartAddr: 78,
        DeviceLength: 3,
        DeviceContent: "额定电流",
        FieldName: "SpecifyElectricity"
    },
    {
        DefineName: "UPS_QRI_RR",
        StartAddr: 81,
        DeviceLength: 4,
        DeviceContent: "额定频率",
        FieldName: "SpecifyHz"
    },
    {
        DefineName: "UPS_31_Q3PV_RR",
        StartAddr: 85,
        DeviceLength: 5,
        DeviceContent: "输入R",
        FieldName: "InputR"
    },
    {
        DefineName: "UPS_31_Q3PV_SS",
        StartAddr: 90,
        DeviceLength: 5,
        DeviceContent: "输入S",
        FieldName: "InputS"
    },
    {
        DefineName: "UPS_31_Q3PV_TT",
        StartAddr: 95,
        DeviceLength: 5,
        DeviceContent: "输入T",
        FieldName: "InputT"
    },
    {
        DefineName: "UPS_31_Q3PV_AA",
        StartAddr: 100,
        DeviceLength: 5,
        DeviceContent: "输入RS",
        FieldName: "InputRS"
    },
    {
        DefineName: "UPS_31_Q3PV_BB",
        StartAddr: 105,
        DeviceLength: 5,
        DeviceContent: "输入RT",
        FieldName: "InputRT"
    },
    {
        DefineName: "UPS_31_Q3PV_CC",
        StartAddr: 110,
        DeviceLength: 5,
        DeviceContent: "输入ST",
        FieldName: "InputST"
    },
    {
        DefineName: "UPS_TYPE33_Q3OV_RR",
        StartAddr: 115,
        DeviceLength: 5,
        DeviceContent: "输出R",
        FieldName: "OutputR"
    },
    {
        DefineName: "UPS_TYPE33_Q3OV_SS",
        StartAddr: 120,
        DeviceLength: 5,
        DeviceContent: "输出S",
        FieldName: "OutputS"
    },
    {
        DefineName: "UPS_TYPE33_Q3OV_TT",
        StartAddr: 125,
        DeviceLength: 5,
        DeviceContent: "输出T",
        FieldName: "OutputT"
    },
    {
        DefineName: "UPS_TYPE33_Q3OV_AA",
        StartAddr: 130,
        DeviceLength: 5,
        DeviceContent: "输出RS",
        FieldName: "OutputRS"
    },
    {
        DefineName: "UPS_TYPE33_Q3OV_BB",
        StartAddr: 135,
        DeviceLength: 5,
        DeviceContent: "输出RT",
        FieldName: "OutputRT"
    },
    {
        DefineName: "UPS_TYPE33_Q3OV_CC",
        StartAddr: 140,
        DeviceLength: 5,
        DeviceContent: "输出ST",
        FieldName: "OutputST"
    },
    {
        DefineName: "UPS_TYPE33_Q3OC_RR",
        StartAddr: 145,
        DeviceLength: 6,
        DeviceContent: "输出R相电流",
        FieldName: "OutputRElectricity"
    },
    {
        DefineName: "UPS_TYPE33_Q3OC_SS",
        StartAddr: 151,
        DeviceLength: 6,
        DeviceContent: "输出S相电流",
        FieldName: "OutputSElectricity"
    },
    {
        DefineName: "UPS_TYPE33_Q3OC_TT",
        StartAddr: 157,
        DeviceLength: 6,
        DeviceContent: "输出T相电流",
        FieldName: "OutputTElectricity"
    },
    {
        DefineName: "UPS_TYPE33_Q3LD_RR",
        StartAddr: 163,
        DeviceLength: 3,
        DeviceContent: "输出R相负载",
        FieldName: "OutputRLoad"
    },
    {
        DefineName: "UPS_TYPE33_Q3LD_SS",
        StartAddr: 166,
        DeviceLength: 3,
        DeviceContent: "输出S相负载",
        FieldName: "OutputSLoad"
    },
    {
        DefineName: "UPS_TYPE33_Q3LD_TT",
        StartAddr: 169,
        DeviceLength: 3,
        DeviceContent: "输出T相负载",
        FieldName: "OutputTLoad",
    },
    {
        DefineName: "UPS_TYPE33_Q3LD_AA",
        StartAddr: 172,
        DeviceLength: 3,
        DeviceContent: "输出总负载",
        FieldName: "OutputLoad"
    },
    {
        DefineName: "UPS_TYPE33_QTPR_RR",
        StartAddr: 175,
        DeviceLength: 5,
        DeviceContent: "温度查询",
        FieldName: "TQuery"
    },
    {
        DefineName: "UPS_TYPE33_QTPR_SS",
        StartAddr: 180,
        DeviceLength: 5,
        DeviceContent: "温度2查询",
        FieldName: "T2Query"
    },
    {
        DefineName: "UPS_TYPE33_QTPR_HH",
        StartAddr: 185,
        DeviceLength: 5,
        DeviceContent: "温度3查询",
        FieldName: "T3Query"
    },
    {
        DefineName: "UPS_TYPE33_QTPR_LL",
        StartAddr: 190,
        DeviceLength: 5,
        DeviceContent: "温度4查询",
        FieldName: "T4Query"
    },
    {
        DefineName: "UPS_QBV_ALL_CC",
        StartAddr: 195,
        DeviceLength: 3,
        DeviceContent: "电池剩余百分比",
        FieldName: "QBV_CC"
    },
    {
        DefineName: "UPS_RECEIVE_STATE",
        StartAddr: 200,
        DeviceLength: 3,
        DeviceContent: "设置返回状态",
        FieldName: ""
    },
    {
        DefineName: "UPS_QGS_B9TOB0",
        StartAddr: 232,
        DeviceLength: 12,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_KK",
        StartAddr: 244,
        DeviceLength: 2,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_PP",
        StartAddr: 246,
        DeviceLength: 5,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_FF",
        StartAddr: 251,
        DeviceLength: 4,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_OO",
        StartAddr: 255,
        DeviceLength: 5,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_EE",
        StartAddr: 260,
        DeviceLength: 4,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_LL",
        StartAddr: 264,
        DeviceLength: 3,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_CC",
        StartAddr: 267,
        DeviceLength: 5,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_HH",
        StartAddr: 272,
        DeviceLength: 5,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_NN",
        StartAddr: 277,
        DeviceLength: 5,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_BB",
        StartAddr: 282,
        DeviceLength: 5,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_TT",
        StartAddr: 287,
        DeviceLength: 5,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QFS_B7TOB0",
        StartAddr: 292,
        DeviceLength: 8,
        DeviceContent: "",
        FieldName: ""
    },
    {
        DefineName: "UPS_QWS",
        StartAddr: 300,
        DeviceLength: 72,
        DeviceContent: "",
        FieldName: ""
    }
]

const utf8 = 'LADIS#####PI01###2000#801/123023006L236.350.0229.550.0##000082.0---.-022.7#44000850.0##############################################################################################################100##NAK####2#2#2\x00#################1110000000000114207.849.9014.450.0020022.4330.1314.8077.5024.8011011000000000000000000000000000000000000000000000000000000000000000000####################################000.0352.9353.6082.00601100############W2K12.0230.0072.0EpbroahczDvegfm#######################################26417053.047.0################################################################################################'



for (const obj of d) {
    obj.val = utf8.slice(obj.StartAddr, obj.StartAddr + obj.DeviceLength)
}


console.log(d);
import React, {Component} from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Image,
    FlatList,
    Navigator,
    Button,
    Alert,
    TouchableHighlight
} from 'react-native';
import {StackNavigator} from 'react-navigation';



class Home extends Component {
    constructor(props) {
        super(props);
        const {navigator} = props;

        this.state = {
            addres: '',
            cond: '',
            url: '',
            temp: '',
            maxTemp: '',
            minTemp: '',
            data: {},
            sel:'first'
        }

        let url = 'https://free-api.heweather.com/s6/weather/forecast';
        let params = {
            location: '北京',
            key: '26367355bd3c488d9efaf26949bf3231',
            lang: 'zh',
            unit: 'm'
        };
        if (params) {
            let paramsArray = [];
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        fetch(url, {
            method: 'GET',
        }).then((response) => response.json())
            .then((json) => {
                let obj = json.HeWeather6[0]['daily_forecast'][0];
                this.setState({
                    address: '北京',
                    url: 'https://cdn.heweather.com/cond_icon/' + obj.cond_code_d + '.png',
                    cond: obj.cond_txt_d,
                    temp: obj.cond_code_d,
                    maxTemp: obj.tmp_max,
                    minTemp: obj.tmp_min,
                    data: json
                });
            })
            .catch((error) => {
            })

    }

    render() {
        return (
            <View style={HomeStyle.bgColor}>
                <View style={HeadBarStyle.border}>
                    <View style={{ flexDirection: 'row',height:58}}>
                        <TouchableHighlight style={HeadBarStyle.headrBarViewDef} underlayColor="#ffffff" onPress={()=>{
                            let obj=this.state.data.HeWeather6[0]['daily_forecast'][0];
                            this.setState({
                                address: '北京',
                                url: 'https://cdn.heweather.com/cond_icon/' + obj.cond_code_d + '.png',
                                cond: obj.cond_txt_d,
                                temp: obj.cond_code_d,
                                maxTemp: obj.tmp_max,
                                minTemp: obj.tmp_min,
                                data:this.state.data
                            });
                         }}>
                            <Text style={HeadBarStyle.headrBarTextDef} underlayColor="#ffffff" onPress={()=>{

                         }}>今天</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={HeadBarStyle.headrBarViewDef} underlayColor="#ffffff" onPress={()=>{
                            let obj=this.state.data.HeWeather6[0]['daily_forecast'][1];
                            this.setState({
                                address: '北京',
                                url: 'https://cdn.heweather.com/cond_icon/' + obj.cond_code_d + '.png',
                                cond: obj.cond_txt_d,
                                temp: obj.cond_code_d,
                                maxTemp: obj.tmp_max,
                                minTemp: obj.tmp_min,
                                data:this.state.data
                            });
                         }}>
                            <Text style={HeadBarStyle.headrBarTextDef}>明天</Text>
                        </TouchableHighlight>

                        <TouchableHighlight style={HeadBarStyle.headrBarViewDef} underlayColor="#ffffff" onPress={()=>{
                            let obj=this.state.data.HeWeather6[0]['daily_forecast'][2];
                            this.setState({
                                address: '北京',
                                url: 'https://cdn.heweather.com/cond_icon/' + obj.cond_code_d + '.png',
                                cond: obj.cond_txt_d,
                                temp: obj.cond_code_d,
                                maxTemp: obj.tmp_max,
                                minTemp: obj.tmp_min,
                                data:this.state.data
                            });
                         }}>

                            <Text style={HeadBarStyle.headrBarTextDef}>后天</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View >
                    <View style={{flexDirection: 'row',height:100,position:'absolute',left:15,top:170}}>
                        <View>
                            <Text style={TemperatureBarStyle.wenduText}>{this.state.address}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',height:100,position:'absolute',left:15,top:215}}>
                        <View>
                            <Text style={TemperatureBarStyle.wenduText}>{this.state.cond}</Text>
                        </View>
                    </View>
                    <View
                        style={{flexDirection: 'row',height:100,justifyContent:'center',paddingTop:150}}>
                        <Image style={{height:100,width:100}}
                               source={{uri: this.state.url}}
                        />
                    </View>
                    <View style={{flexDirection: 'row',height:100,position:'absolute',right:0,top:170}}>
                        <Image style={{height:24,width:12}}
                               source={require('./src/assets/gaowendu.png')}
                        />
                        <View>
                            <Text style={TemperatureBarStyle.wenduText}>{this.state.maxTemp}<Text
                                style={TemperatureBarStyle.wenduText}>°C</Text></Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row',height:100,position:'absolute',right:0,top:215}}>
                        <Image style={{height:24,width:12}}
                               source={require('./src/assets/diwen.png')}
                        />
                        <View>
                            <Text style={TemperatureBarStyle.wenduText}>{this.state.minTemp}<Text
                                style={TemperatureBarStyle.wenduText}>°C</Text></Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const HomeStyle = StyleSheet.create({
    bgColor: {
        backgroundColor: '#ffffff',
        height: '100%'
    }
});

const HeadBarStyle = StyleSheet.create({
    headrBarViewDef: {
        width: '33.33%',
        height: 58,
        backgroundColor: '#F8F8F8',
        justifyContent: 'center'
    },
    headrBarTextDef: {
        fontSize: 12,
        color: '#979797',
        alignSelf: 'center'
    },
    headrBarViewSel: {
        width: '33.33%',
        height: 58,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    },
    headrBarTextSel: {
        fontSize: 12,
        color: '#3c5f81',
        alignSelf: 'center'
    },
    border: {
        borderBottomColor: '#F8F8F8',
        borderBottomWidth: 1,
    }
});

const TemperatureBarStyle = StyleSheet.create({
    barText: {
        fontSize: 24,
        color: '#3c5f81'
    },
    wenduText: {
        fontSize: 14,
        color: '#B0B0B0',
        paddingRight: 15,
        paddingLeft: 6,
        paddingTop: 8
    }
});


//路由
const router = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerTitle: '天气',
        },
        backgroundColor: 'red'
    },

});

export default router;




